"""Inventory-backed repository-tool configuration, validated before effects."""

import json
import os
import re
from pathlib import Path
from urllib.parse import urlsplit

INVENTORY = Path(__file__).resolve().parents[1] / "config/environment-inventory.json"


class ConfigurationError(ValueError):
    """Contains only variable names and fixed validation rules, never values."""


def validate(name, raw, spec, required):
    if raw is None or raw == "":
        if required:
            raise ConfigurationError(f"{name}: is required and not set")
        return spec.get("default")
    kind = spec["kind"]
    valid = isinstance(raw, str) and raw == raw.strip() and not any(ord(c) < 32 or ord(c) == 127 for c in raw)
    if valid and kind == "https-origin":
        try:
            parsed = urlsplit(raw)
            valid = (parsed.scheme == "https" and bool(parsed.hostname)
                     and parsed.username is None and parsed.password is None
                     and parsed.port is None and parsed.path in ("", "/")
                     and not parsed.query and not parsed.fragment
                     and re.fullmatch(r"[A-Za-z0-9.-]+", parsed.netloc) is not None)
        except ValueError:
            valid = False
    elif valid and kind == "email":
        valid = re.fullmatch(r"[^\s@:]+@[^\s@]+\.[^\s@]+", raw) is not None
    elif valid and kind == "token":
        valid = not any(c.isspace() for c in raw)
    elif kind not in ("https-origin", "email", "token"):
        raise ConfigurationError(f"{name}: unsupported validation rule")
    if not valid:
        raise ConfigurationError(f"{name}: must satisfy {kind} validation")
    return raw.rstrip("/") if kind == "https-origin" else raw


def load_tool_config(group, file_values, environment=None):
    """Explicit empty environment values win over file values and fail required checks."""
    if environment is None:
        environment = os.environ
    inventory = json.loads(INVENTORY.read_text(encoding="utf-8"))
    rows = [row for row in inventory["variables"] if row.get("group") == group]
    if not rows:
        raise ConfigurationError("Unknown tool configuration group")
    loaded, failures = {}, []
    for row in rows:
        name = row["name"]
        raw = environment.get(name, file_values.get(name))
        try:
            loaded[name] = validate(name, raw, row["validation"], row["required"])
        except ConfigurationError as error:
            failures.append(str(error))
    if failures:
        raise ConfigurationError("Invalid configuration:\n" + "\n".join(failures))
    return loaded
