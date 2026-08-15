# CoBudget repository working rules

These instructions apply throughout the repository unless a more specific
`AGENTS.md` adds compatible guidance for a subdirectory.

## Repository documents and Confluence synchronization

- Draft, revise, and review Confluence-backed project documentation in the
  local repository. Repository documents are the working source during an
  active document change.
- Treat Confluence copies as read-only while work is in progress. Synchronize a
  changed document to Confluence only after the corresponding repository change
  has been merged into `main`.
- Limit every change to the documents and requirements in the active task's
  stated scope. Do not update unrelated repository documents or external
  documents merely to improve consistency, wording, links, or formatting.
- Obtain the user's explicit consent before changing any document outside the
  active task's scope. Make an approved out-of-scope document change as a
  separate, focused branch and pull request; merge it independently before
  synchronizing its affected documents to Confluence.
- Reading Jira, Confluence, or other authoritative references for evidence is
  allowed. This does not by itself authorize editing those sources.
- If repository and Confluence content differ, preserve the repository version
  during active work and record the discrepancy for post-merge synchronization
  instead of editing Confluence early.

## Jira issue updates

- Keep Jira issue descriptions, acceptance criteria, subtasks, assignments,
  estimates, due dates, workflow status, and issue links in Jira. Do not create
  repository documents merely to stage or mirror proposed Jira changes unless
  the user explicitly requests a repository artifact.
- When the user authorizes a Jira change, apply it directly in Jira; it does not
  require a repository branch, commit, merge, or Confluence synchronization.
- Immediately before proposing or applying a Jira update, fetch the current
  issue and the relevant current subtasks, links, status, assignments, dates,
  and comments. Compare the intended change against that live state so stale
  conversation context, local drafts, or earlier reads do not overwrite newer
  information.
- Preserve current Jira content that remains valid. Reconcile additions and
  corrections with the existing ticket rather than replacing the ticket from
  memory. If current Jira state materially conflicts with the requested change,
  report the conflict and resolve it within the authorized task scope.
- Jira changes do not authorize early edits to Confluence. Any resulting
  Confluence-backed document change still follows the repository-first,
  merge-to-`main`, then synchronize workflow above.
