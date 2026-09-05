"""AST scanner for first-party Python environment access; JSON in/out, no credentials."""
import ast
import json
import sys


def scan(source, path, variables):
    failures, consumers = [], []
    try:
        tree = ast.parse(source)
    except SyntaxError:
        return [f"{path}: invalid Python syntax"], []
    parents = {child: node for node in ast.walk(tree) for child in ast.iter_child_nodes(node)}
    os_names = {"os"}
    tool_names = {"tool_config"}
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            for alias in node.names:
                if alias.name == "os":
                    os_names.add(alias.asname or "os")
                if alias.name == "tool_config":
                    tool_names.add(alias.asname or "tool_config")
        if isinstance(node, ast.ImportFrom):
            if node.module == "os" and any(a.name in ("environ", "environb", "getenv", "getenvb", "*") for a in node.names):
                failures.append(f"{path}:{node.lineno}: imported environment access bypasses load_tool_config")
            if node.module == "tool_config" and any(a.asname or a.name == "*" for a in node.names):
                failures.append(f"{path}:{node.lineno}: tool_config imports must use explicit original names")
    for node in ast.walk(tree):
        loader_reference = (isinstance(node, ast.Name) and node.id == "load_tool_config" and isinstance(node.ctx, ast.Load)
                            or isinstance(node, ast.Attribute) and node.attr == "load_tool_config")
        if loader_reference:
            parent = parents.get(node)
            if not isinstance(parent, ast.Call) or parent.func is not node:
                failures.append(f"{path}:{node.lineno}: tool loader references must be direct calls")
        if isinstance(node, ast.Attribute) and isinstance(node.value, ast.Name) and node.value.id in os_names:
            if node.attr in ("environ", "environb", "getenv", "getenvb"):
                parent = parents.get(node)
                # The sole dynamic reader is the inventory-driven loader.
                allowed = (path == "scripts/tool_config.py" and node.attr == "environ"
                           and isinstance(parent, ast.Assign)
                           and len(parent.targets) == 1 and isinstance(parent.targets[0], ast.Name)
                           and parent.targets[0].id == "environment")
                if not allowed:
                    names = [n.value for n in ast.walk(parents.get(parent, parent) or node)
                             if isinstance(n, ast.Constant) and isinstance(n.value, str)
                             and n.value.isidentifier() and n.value.isupper()]
                    label = ", ".join(names) or "dynamic/aliased environment"
                    failures.append(f"{path}:{node.lineno}: {label} bypasses load_tool_config")
        if isinstance(node, ast.Name) and node.id in os_names and isinstance(node.ctx, ast.Load):
            if not isinstance(parents.get(node), ast.Attribute):
                failures.append(f"{path}:{node.lineno}: aliased/reflective os access is unsupported")
        tool_call = isinstance(node, ast.Call) and (
            isinstance(node.func, ast.Name) and node.func.id == "load_tool_config" or
            isinstance(node.func, ast.Attribute) and node.func.attr == "load_tool_config"
            and isinstance(node.func.value, ast.Name) and node.func.value.id in tool_names)
        if tool_call:
            # Tests pass synthetic environments explicitly, so they do not read the host.
            if path == "scripts/test_tool_config.py" and (len(node.args) >= 3 or any(k.arg == "environment" for k in node.keywords)):
                continue
            if not node.args or not isinstance(node.args[0], ast.Constant) or not isinstance(node.args[0].value, str):
                failures.append(f"{path}:{node.lineno}: tool group must be a literal")
            else:
                group = node.args[0].value
                rows = [v for v in variables if v.get("group") == group]
                if not rows:
                    failures.append(f"{path}:{node.lineno}: unclassified tool group")
                for row in rows:
                    if path not in row["consumer"]:
                        failures.append(f"{path}:{node.lineno}: undeclared consumer of {row['name']}")
                    consumers.append([row["name"], path])
    return failures, consumers


if __name__ == "__main__":
    data = json.load(sys.stdin)
    failures, consumers = [], []
    for path, source in data["files"].items():
        errors, reads = scan(source, path, data["variables"])
        failures.extend(errors)
        consumers.extend(reads)
    print(json.dumps({"failures": failures, "consumers": consumers}))
