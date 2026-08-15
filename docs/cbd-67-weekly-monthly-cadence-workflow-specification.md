# CBD-67 — Weekly and Monthly Budget Cycle Workflow Specification

| Field | Value |
| --- | --- |
| Status | Approved |
| Document version | 1.3 |
| Owner | Alexander Wohlford |
| Reviewer | Alexander Wohlford — Product Owner approval |
| Jira | [CBD-67](https://cobudget.atlassian.net/browse/CBD-67) |
| Parent | [CBD-11](https://cobudget.atlassian.net/browse/CBD-11) |
| Epic | [CBD-1](https://cobudget.atlassian.net/browse/CBD-1) |
| Last updated | August 12, 2026 |

## 1. Purpose and outcome

### Purpose

This specification defines the complete user-visible behavior and governing rules for weekly and monthly budget cadences in CoBudget. It establishes how schedules are configured, validated, previewed, confirmed, activated, and changed; how period boundaries, proration, history, and audit records behave; and how exceptional calendar conditions are handled.

This specification is authoritative for product behavior. It serves as the single, reviewable source of truth for product decisions, interface behavior, data-model requirements, implementation acceptance, and automated testing. A separate technical specification will define architecture and implementation design in a future task.

### Intended outcome

When this specification is complete:

* Weekly and monthly budget-cycle behavior is deterministic for every supported calendar condition.
* Users can understand the periods a schedule will create before confirming it.
* Immediate and future schedule changes have predictable effects on active, transition, and future periods.
* Proration results can be independently calculated and verified.
* Completed periods and their governing schedule versions remain stable and auditable.
* Designers can derive the required interface states and messages.
* Engineers can identify the required domain rules and data without treating this document as the technical design.
* QA can derive deterministic scenarios and automated tests.
* Unresolved decisions are explicitly documented and linked to follow-up work rather than becoming implementation assumptions.

## 2. Scope

This specification focuses on user workflows, allowed actions, product-level system logic, calendar and state boundaries, and interface behavior for weekly and monthly budget cycles.

### In scope

* Initial weekly and monthly schedule creation as part of budget creation
* Atomic creation of the budget space, initial schedule version, and active current cycle
* Anchor selection and deterministic calendar-boundary generation
* Required inputs, defaults, validation messages, previews, and confirmation
* Behavior of the current active budget cycle
* Immediate and future schedule changes
* Pending-change visibility, editing, cancellation, and execution
* Transition periods and boundary-aligned changes
* Planned-allocation proration, currency precision, rounding, and allocation of rounding remainders
* Treatment and presentation of actual transactions and bills during schedule changes
* Authoritative budget-space time-zone and date semantics, including local-midnight and daylight-saving transitions
* The separation between cadence schedule changes and the required MVP budget-space time-zone settings workflow, including their conflict behavior
* Allowed and unavailable actions for each schedule lifecycle state
* Concurrent edits, stale previews, preview refresh, and confirmation validity
* Schedule-change execution failure, recovery, and the user-visible guarantee against partial outcomes
* Schedule replacement, removal, or disabling behavior
* Abandoned or incomplete setup and change workflows
* User-visible confirmation, status, warning, history, and audit behavior after execution
* Accessibility and unambiguous presentation of dates, amounts, changes, warnings, and confirmation choices
* Historical-period integrity and schedule-version references
* Product-facing interface states and deterministic examples
* The workflow actions that require authorization and the read-only or unavailable states shown when an action is not permitted

The broader role and permission model remains governed by [CBD-12](https://cobudget.atlassian.net/browse/CBD-12). This specification defines only the permissions-related behavior needed to make the weekly and monthly workflows complete.

### Out of scope

* Paycheck-based and custom cadence behavior
* Technical architecture and implementation design
* Database schemas, API contracts, infrastructure, and deployment design
* Implementation of the schedule engine or user interface
* Automatic schedule changes based on detected income or transactions
* Automatic changes to planned allocations when income is received
* Multiple simultaneous budget timelines within one budget space
* Country-specific calendar or holiday behavior unrelated to weekly and monthly calendar anchors
* Financial-profile, account-linking, overall financial-dashboard, and multi-budget account-scope workflows except for the entry conditions and dependencies they impose on schedule setup
* The detailed budget-space time-zone change workflow, which is required for the broader MVP but must be specified and delivered separately; this specification defines only its boundary with cadence schedule changes
* Balance rollover or carry-forward between budget cycles, including during schedule changes; remaining positive amounts and overspending stay in their historical cycle during the MVP

## 3. Terminology and invariants

| Term | Definition |
| --- | --- |
| Abandoned workflow | A schedule setup or change workflow that the user exits before confirmation. It creates no authoritative schedule change unless explicit draft retention is supported. |
| Accountability Partner | A formal budget-space role with comprehensive, financially read-only visibility into the budget’s financial and schedule information. The role may create personal firm-alert acknowledgements and attributed comments on supported readable targets but cannot modify financial data, schedules, permissions, memberships, connections, or configuration. |
| Affected financial item | A transaction, projected bill occurrence, or projected income occurrence already known when a schedule-change preview is generated whose proposed budget-period assignment differs from its assignment under the current schedule projection. Merely falling within the displayed preview dates does not make an item affected. |
| Anchor | The recurring calendar selection that determines where complete budget-cycle boundaries occur. A weekly anchor is the weekday on which each weekly budget cycle begins; a monthly anchor is a numbered day or explicit last-day rule. |
| Atomic execution | The user-visible guarantee that all effects of a schedule change complete together or remain unapplied; users must not observe a partially executed change. |
| Authoritative budget date | The single calendar date used to assign a transaction to a budget cycle. It is derived under the transaction-classification rules and is not recalculated from a timestamp during budget-cycle assignment. |
| Active budget cycle | The single budget cycle whose inclusive start and end dates contain the current budget-space date. |
| Authoritative creation acceptance | The point at which the product has successfully revalidated a confirmed budget-creation proposal against the current budget-space date and commits to creating its single atomic outcome. A later response delay does not change the accepted proposal. |
| Authoritative schedule state | The durable product state that determines which schedule configuration currently governs the budget, independently of any temporary interface workflow a user has open. |
| Budget account scope | The set of canonical linked accounts explicitly included in a budget space. An account may be in the scope of more than one budget without duplicating the underlying account or transaction. |
| Base planned allocation | The normal zero-or-positive category allocation for a complete weekly or monthly budget cycle. It is the input prorated when a short transition period is created or explicitly recalculated. |
| Budget cadence | The recurring rule that generates budget cycles and defines the anchor - for example, “weekly on Monday” or “monthly on the 15th” |
| Budget cycle | One bounded planning period with a start and end date |
| Budget schedule | The persisted configuration and its current or pending versions |
| Budget-specific financial-item assignment | The relationship that assigns one canonical transaction or projected occurrence to a period within one budget using that budget’s authoritative date and schedule; it never duplicates or rewrites the canonical financial item. |
| Budget-space date | The authoritative calendar date for a budget space, determined using that budget’s configured time zone. |
| Budget setup wizard | An optional post-creation workflow that guides the user through common budget configuration steps. Each step and the entire wizard can be skipped without affecting the created budget or schedule. |
| Budget-space time zone | The single supported named time zone configured for a budget space and used to determine its calendar date, local midnight, previews, and schedule-change execution. It defaults to the primary owner’s local time zone when available and to GMT when that time zone is missing or unsupported. It can be changed in that budget’s settings. |
| Budget-space time-zone change | A separately confirmed budget-settings change that replaces the supported named time zone used by a budget. It is not a cadence schedule change and does not create a schedule version. |
| Change preview | A non-authoritative projection of how a proposed schedule change would affect the old period, any transition period, the first full new period, allocations, bills, and transactions. |
| Compact immutable confirmation record | The durable, non-editable evidence of the schedule outcome reviewed and authorized at confirmation. It stores the material schedule, period, calculation, summary, actor, and timing facts without duplicating the rendered interface or full transaction and bill records. |
| Clamped monthly boundary | A generated monthly boundary that uses the month’s final valid calendar day because the saved numbered monthly anchor does not exist in that month. Clamping does not change the saved anchor selection. |
| Completed budget cycle | A budget cycle whose inclusive end date precedes the current budget-space date. Its schedule-derived boundaries and schedule-version reference are historical. |
| Creation request | A uniquely identifiable submission of one confirmed budget-creation proposal. Rechecking or retrying the same creation request must return or complete the same outcome rather than create another budget. |
| Effective date | The budget-space calendar date on which a confirmed schedule change becomes authoritative, effective at local midnight. |
| Estimated projected amount | A usable non-final amount for a projected bill or income occurrence. It is displayed in italics with a leading tilde, such as _\~$50.00_, and causes any aggregate containing it to be presented as approximate. |
| Indeterminate confirmation state | A temporary recovery state in which the product received a schedule-change action but cannot yet establish whether its authoritative commit succeeded or failed. Schedule modifications are read-only until the system resolves one definitive outcome. |
| Immediate schedule change | A confirmed schedule change whose effective date is the current budget-space date. It executes on confirmation and governs that entire calendar date without splitting the date between schedule versions. |
| No-change state | The neutral schedule-change workflow state in which the proposed cadence and anchor exactly match the authoritative current cadence and anchor. It produces no preview and cannot be confirmed. |
| Financial dashboard | A user-level view of linked accounts and the overall financial picture that exists independently of any budget and does not apply budget schedules, periods, or allocations. |
| Financial profile | The user-level context in which financial connections and canonical linked accounts are managed independently of budget spaces. |
| First full new period | The first complete budget cycle generated from the new cadence and anchor after any transition period. It begins on the new schedule’s next natural boundary. |
| Linked account | A canonical financial account available through a user’s financial profile. Linking an account does not add it to a budget; budget inclusion requires an explicit budget-account-scope assignment. |
| Local midnight | The start of a calendar date at 12:00 a.m. in the configured budget-space time zone. |
| Masked restricted section | One consolidated placeholder representing financial information the current Viewer is not authorized to see. It reveals no item descriptions, row count, monetary total, difference, or derived indicator. |
| Monthly anchor | The numbered day from 1 through 31 or explicit last-day rule on which each complete monthly budget cycle begins. |
| Natural boundary | A date generated by a budget cadence’s recurring anchor rule on which a complete budget period normally begins or ends. |
| Pending bank transaction | A known transaction reported by a linked financial source that has not yet posted finally. When it has an authoritative budget date, it participates in schedule-change impact comparison and is labeled Pending until its status resolves. |
| Period allocation | The planned amount assigned to one category in one authoritative budget period, derived initially from the applicable complete-period base allocation or transition proration and retained as that period’s historical planned amount. |
| Pending schedule change | A confirmed schedule change with a future effective date. Until that date, the existing schedule version remains authoritative, and the pending change remains visible, editable, and cancelable. |
| Pending-change revision | An unconfirmed edit to an existing pending schedule change. The original confirmed pending change remains authoritative unless and until the revision is explicitly confirmed. |
| Post-close financial adjustment | A change to a completed budget cycle’s actual amounts caused by a late, corrected, removed, or reclassified transaction. It updates historical financial reporting without reopening the cycle or changing later-period plans. |
| Projected bill occurrence | One expected instance generated from a recurring bill definition for a particular budget date and amount. Each occurrence is evaluated and displayed separately in a preview and is labeled as projected until it becomes an actual financial item. |
| Projected income occurrence | One expected instance generated from a recurring income definition for a particular budget date and amount. Each occurrence is evaluated and displayed separately in a preview, labeled as projected, and summarized independently from bills and transactions. |
| Proration basis period | The complete natural period under the proposed cadence and anchor that contains the short transition dates. Its calendar-day count is the denominator used to prorate base planned allocations. |
| Preview horizon | The finite date range evaluated by a schedule-change preview. It includes the old period being closed, any short transition, and the first three complete periods under the proposed schedule. |
| Projected period | A transient, non-authoritative period calculated for setup or change preview. It may be regenerated or discarded and never becomes historical merely because it was displayed. |
| Read-only state | An interface state in which schedule information remains visible but the current user cannot perform one or more modification actions. |
| Rounding remainder | The residual currency amount produced when prorated allocations are rounded to the supported currency precision and must be assigned using a deterministic rule. |
| Schedule change | A confirmed request to replace the authoritative schedule configuration on an effective date, either immediately or in the future. |
| Schedule lineage | The continuous ordered history of authoritative schedule versions belonging to one budget. Pending changes remain outside the lineage until successful execution creates a new version. |
| Schedule lifecycle state | The current product state of a budget schedule or schedule change, such as unconfigured, active, pending, executing, failed, canceled, or completed. The state determines which actions and interface behaviors are available. |
| Schedule workflow state | A temporary interface state such as viewing, editing, previewing, or reviewing confirmation that may coexist with an authoritative schedule state and never becomes authoritative without successful confirmation. |
| Schedule operation | A uniquely identified confirmation, revision, cancellation, or execution request with one durable succeeded-or-failed outcome used to correlate authoritative changes and audit evidence. |
| Schedule version | An immutable record of a specific budget-schedule configuration—including its cadence, anchor, and effective interval—used to determine which rules governed each budget period. |
| Scoped dependency | A dependency that blocks only the capabilities requiring its decisions rather than blocking the entire specification or every related workflow. |
| Setup preview | A non-authoritative projection of the current and future budget cycles that would be generated from a proposed initial schedule. |
| Stale preview | A preview calculated from schedule or budget data that has changed since the preview was generated and therefore cannot be used for confirmation without recalculation. |
| Transition period | A shortened or irregular budget period created when a schedule change takes effect between natural boundaries. It begins on the change's effective date and ends the day before the next natural boundary generated by the new cadence and anchor. |
| Transition allocation recalculation | An explicit action available while a transition period is active that replaces its planned category allocations using all current base planned allocations and the original transition proration rules. |
| Uncertain creation result | A state in which the interface did not receive a definitive creation response and must determine the authoritative outcome before permitting another creation attempt. |
| Unconfirmed schedule proposal | A temporary, non-authoritative configuration being edited and previewed within a workflow before confirmation. It is not shared or persisted after the workflow is abandoned unless draft retention is explicitly supported. |
| Viewer | A default-deny read-only budget-space role that sees only resources inherited through one CBD-72 visibility profile (Full budget, Planning, Category group, or Account group) and cannot modify the budget. |

### Core invariants

An invariant is a rule that must remain true in every valid workflow and system state, regardless of the cadence, dates, user path, or implementation. Write each invariant as a concise, unconditional statement that can be checked in examples, interface behavior, stored data, and automated tests. Put conditional calculations and step-by-step behavior in the applicable workflow section instead.

| ID | Invariant | Why it matters | How to verify |
| --- | --- | --- | --- |
| INV-01 | For any budget space and budget-space calendar date, exactly one schedule version is authoritative. | Prevents competing period boundaries and ambiguous classification of budgets, bills, or transactions. | Attempt to resolve the schedule for every date in a scenario; the result must contain exactly one authoritative version. |
| INV-02 | Budget cycles are contiguous and non-overlapping: the next cycle begins on the calendar day after the preceding cycle ends. | Prevents dates from being omitted or assigned to multiple cycles during setup or schedule changes. | Check every adjacent pair of cycles in the preview and history; there must be neither a gap nor an overlapping date. |
| INV-03 | A schedule change never rewrites the boundaries of a completed budget cycle. | Preserves stable, explainable, and auditable history. | After a change executes, compare completed cycles with their prior records; their start date, end date, and schedule-version reference must be unchanged. |
| INV-04 | Every budget-space calendar date belongs to exactly one budget cycle. | Ensures every date can be classified without ambiguity. | Resolve the budget cycle for every date in each boundary scenario; each date must return exactly one cycle. |
| INV-05 | Budget-cycle boundaries are date-based and inclusive: a cycle begins on its start date and ends on its end date. | Establishes consistent boundary and adjacency behavior. | Verify that the next cycle begins on the calendar day after the preceding cycle ends. |
| INV-06 | A transaction is assigned to a budget cycle solely from its authoritative budget date; transaction time and time zone are not used during period classification. | Prevents timestamp conversions from changing budget reporting. | Classify transactions with the same authoritative budget date but different times or source time zones; all must resolve to the same cycle. |
| INV-07 | Once a transaction’s authoritative budget date has been established, a time-zone conversion must not move it to another calendar date or budget cycle. | Preserves deterministic transaction classification. | Change the viewer or source time zone and confirm that the assigned cycle does not change. |
| INV-08 | “Today,” schedule effective dates, previews, and schedule-change execution use the configured budget-space time zone, with execution occurring at local midnight. | Gives all collaborators one authoritative calendar context. | Compare collaborators in different time zones; all must see the same budget-space date and schedule state. |
| INV-09 | Actual transactions and bills are never prorated when a schedule changes. | Preserves recorded financial activity while only planned allocations are adjusted. | Review every transition scenario and confirm that actual amounts remain unchanged. |
| INV-10 | A schedule change does not modify a transaction’s authoritative budget date. | Keeps transaction classification independent from schedule configuration changes. | Execute a schedule change and compare transaction budget dates before and after; they must be identical. |
| INV-11 | Every budget space has exactly one configured supported named time zone. It defaults to the primary owner’s local time zone when available and to GMT when that time zone is missing or unsupported; it can be changed as a setting for that budget. | Establishes a shared calendar and local-midnight reference for all collaborators. | Confirm that a new budget receives the correct default and that all schedule calculations use the budget-level setting rather than a viewer’s time zone. |
| INV-12 | An Accountability Partner has comprehensive, financially read-only visibility into the budget space’s financial and schedule information, excluding credentials and private security configuration; personal firm-alert acknowledgements and attributed comments are permitted non-financial interactions. | Ensures the formal support role has the complete context needed for accountability without financial control. | Verify every supported budget and financial view, denial of financial/administrative mutation, and successful personal acknowledgement/comment interactions without protected-state change. |
| INV-13 | A Viewer has no budget or schedule visibility without a CBD-72 profile and can see only the profile's inherited scope and fixed interpretation envelope. | Preserves logical least-privilege sharing without piecemeal item grants. | Create a Viewer membership without a profile and confirm no budget data is visible; then verify each supported profile/group combination and prohibit mixed profile types. |
| INV-14 | Accountability Partner acknowledgements and comments never modify financial data, schedule state, permissions, memberships, or configuration. | Allows supportive interaction without weakening the role’s read-only financial boundary. | Exercise every supported acknowledgement and comment action and confirm that only the attributed interaction record changes. |
| INV-15 | A budget space becomes authoritative only when its initial schedule version and active current budget cycle are created successfully as the same user-visible outcome. | Prevents empty or periodless budgets whose planning records have no defined time boundary. | Abandon or fail creation before confirmation and verify that no budget exists; confirm successfully and verify that the budget, schedule version, and active cycle all exist. |
| INV-16 | Linking a financial account does not create a budget or schedule, and adding a linked account to one or more budgets does not duplicate the canonical account or transaction. | Separates the user’s overall financial picture from budget-specific planning and prevents double-counting outside budget views. | Link an account without a budget, then add it to multiple budgets and verify one canonical account and transaction while each budget retains independent scoped classification. |
| INV-17 | One confirmed budget-creation proposal can produce at most one authoritative budget space, including across timeouts, status checks, retries, concurrent submissions, and recovery. | Prevents duplicate budgets when the outcome of a creation request is uncertain. | Interrupt or duplicate the same creation request at each stage and verify that every successful resolution identifies the same budget. |
| INV-18 | A clamped monthly boundary never changes the saved numbered monthly anchor; generation returns to that numbered date in the next month that contains it. | Preserves the user’s schedule intent while producing valid, deterministic boundaries for every calendar month. | Configure anchors of the 29th, 30th, and 31st across common years, leap years, and short months; verify valid clamped boundaries and automatic return to the saved date. |
| INV-19 | Authoritative creation acceptance either uses the exact current preview the user confirmed or creates no budget; a boundary change before acceptance can never silently substitute different period dates. | Ensures the initial schedule is one the user actually reviewed while allowing an accepted request to finish safely across a boundary. | Submit immediately around local midnight: verify that acceptance before the boundary creates the confirmed dates and first processing after the boundary creates nothing until the refreshed preview is confirmed. |
| INV-20 | At every natural boundary, the preceding active budget cycle becomes completed and the next budget cycle becomes active automatically, without a gap, overlap, manual close, confirmation, warning, or acknowledgement. | Keeps period state aligned with the authoritative budget-space date and prevents normal calendar progression from depending on user action. | Cross weekly, numbered monthly, last-day, clamped, leap-year, and daylight-saving boundaries; verify one completed prior cycle and one active next cycle without user input. |
| INV-21 | A post-close financial adjustment may update a completed cycle’s actual amounts but never changes its dates, planned allocations, schedule-version reference, completed status, or later-period allocations. | Keeps historical reporting accurate without causing retroactive changes to later-period plans or schedule history. | Add, correct, remove, and reclassify transactions after cycle completion; verify updated historical actuals and audit detail while every protected value and later-period allocation remains unchanged. |
| INV-22 | The active budget cycle is resolved dynamically from the authoritative budget-space date and schedule; it never depends on a user action or the successful completion of a midnight activation job. | Makes normal period progression simple and keeps calendar truth independent from background processing. | Open or query a budget before and after every supported boundary with boundary jobs delayed or unavailable; verify that the resolved active cycle follows the budget-space date. |
| INV-23 | An immediate schedule change applies to the entire current budget-space calendar date; one date can never be split between the old and new schedule versions. | Keeps schedule authority and transaction classification date-based even when confirmation occurs after local midnight. | Confirm immediate changes at multiple times during a budget-space date and verify that the old period ends yesterday and every transaction dated today resolves under the new schedule. |
| INV-24 | A budget-space time-zone change never creates a cadence schedule version, rewrites a completed cycle, or changes an existing transaction’s authoritative budget date. | Keeps schedule history and transaction classification stable while allowing the shared budget calendar setting to change through its own workflow. | Change the budget time zone and verify no new schedule version, unchanged completed-cycle dates and references, and unchanged authoritative transaction dates. |
| INV-25 | A schedule-change proposal whose cadence and anchor match the authoritative current schedule cannot produce a preview, confirmation, pending change, schedule version, or audit record. | Prevents meaningless schedule versions and makes the workflow’s required change explicit. | Open the workflow without edits, then change and restore the cadence and anchor; verify the no-change state and absence of every authoritative artifact. |
| INV-26 | A budget space can have at most one confirmed pending future schedule change. Starting the schedule-change workflow while one exists resolves to that pending change rather than creating a second proposal. | Prevents conflicting future schedule authority and gives every authorized change a single, understandable place to review, edit, or cancel. | Confirm a future change, reopen the workflow, and verify the existing pending summary appears and no second proposal or pending record can be created. |
| INV-27 | An unconfirmed pending-change revision cannot alter or remove the original confirmed pending change. Only explicit confirmation may atomically replace it or execute it immediately. | Preserves the user’s confirmed future intent when an edit is abandoned, interrupted, invalid, or fails. | Start editing a pending change, modify each input, then abandon or fail confirmation; verify the original pending details and execution remain unchanged. |
| INV-28 | Canceling a pending schedule change leaves the current authoritative schedule unchanged and creates an attributable audit event. | Ensures cancellation removes only future intent and cannot silently change active schedule authority. | Cancel a pending change and verify no replacement version or period is created, the current schedule is unchanged, and the cancellation audit record identifies the actor and canceled values. |
| INV-29 | When a schedule change takes effect on a date that is not a natural boundary under the new schedule, the transition period begins on that exact effective date and ends the day before the next new-schedule natural boundary. The product never backdates the new schedule to a prior boundary. | Honors the user-selected effective date without rewriting earlier transactions, bills, periods, or history. | Change from monthly-on-the-1st to weekly-on-Monday effective Wednesday, June 17; verify the old period ends June 16, the transition is June 17–21, and the first full weekly period begins June 22. |
| INV-30 | When a schedule change takes effect on a natural boundary under the new cadence and anchor, a full new period begins on that date with full base planned allocations; no transition period or proration is created. | Avoids artificial bridge periods when the selected effective date already aligns with the recurring new schedule. | Change to weekly-on-Monday effective on a Monday and verify the old period ends Sunday, a full Monday-to-Sunday period begins, and no transition or proration appears. |
| INV-31 | A confirmed future schedule change becomes authoritative when the budget-space calendar reaches its effective date at local midnight, regardless of whether a background process has completed. From that instant it cannot be edited or canceled as pending. | Makes execution deterministic and prevents infrastructure timing from changing the user-selected effective date. | Confirm a future change, cross local midnight in the budget time zone with background processing delayed, and verify the new schedule resolves as authoritative and pending modification actions are unavailable. |
| INV-32 | Recovery from an indeterminate schedule-change confirmation must resolve to exactly one authoritative outcome: committed or not committed. It cannot create duplicate versions, periods, audit events, or a second pending change. | Makes retries safe and prevents uncertainty from corrupting schedule authority. | Interrupt confirmation after submission at each persistence boundary; verify bounded recovery produces exactly one final outcome and no duplicate authoritative artifacts. |
| INV-33 | After a confirmed future change reaches its effective date, recovery cannot restore the old schedule merely because secondary processing is delayed or inconsistent. | Preserves the user-selected effective date and date-derived schedule authority during outages. | Delay or fail secondary processing across the effective-date boundary; verify the new schedule remains authoritative or the budget enters temporary read-only recovery without reverting. |
| INV-34 | Every transaction and bill count and total shown in a schedule-change preview must reconcile exactly to its expandable itemized details, and each item must show the same proposed period assignment used by the authoritative preview calculation. | Keeps concise impact summaries trustworthy and independently reviewable before confirmation. | Generate previews with zero, one, and many affected items; verify all counts and totals equal the details and each old/proposed period assignment matches the calculation. |
| INV-35 | A short-transition base allocation equals the full base allocation multiplied by transition calendar days and divided by calendar days in the complete new-schedule natural period containing those transition dates. | Applies one calendar-based rule consistently across weekly and variable-length monthly periods. | Verify weekly 5/7 and monthly June 17–30 14/30 examples, plus leap-year and non-first-day monthly anchors. |
| INV-36 | Rounded category allocations for a transition must sum exactly to the rounded overall prorated total, with any smallest-currency-unit discrepancy assigned deterministically by largest fractional remainder. | Prevents displayed category totals from disagreeing with the overall planned amount. | Create category sets that round above, below, and exactly to the target; verify the sum and deterministic tie handling. |
| INV-37 | The overall prorated transition total uses half-up midpoint rounding to the budget currency’s supported precision before largest-remainder allocation. | Makes midpoint behavior understandable, deterministic, and consistent across previews, confirmation, storage, and audit. | Verify values immediately below, exactly at, and immediately above a half-unit midpoint for currencies with zero, two, and three fractional digits. |
| INV-38 | A valid current preview is confirmed through one explicit contextual action—Apply schedule change for an immediate change or Schedule change for a future change—without a separate checkbox or typed acknowledgement. | Keeps confirmation deliberate without adding redundant friction or ambiguous acknowledgement state. | Verify each effective-date type shows only its contextual action and that the action cannot be invoked without a valid current preview. |
| INV-39 | Confirmation applies exactly the preview outcome presented to the user and is idempotent under repeated submission. | Prevents changed inputs, stale data, or duplicate requests from producing an unreviewed or duplicate schedule change. | Change authoritative inputs before confirmation and repeat the same confirmation request; verify refresh is required for changed data and only one authoritative result is created. |
| INV-40 | A transaction or bill is counted as affected in a schedule-change preview only when it is already known and its proposed period assignment differs from its current-schedule projection. Optional contextual items with unchanged assignments are excluded from affected counts and totals. | Keeps impact summaries focused on consequences actually caused by the proposal. | Preview known items inside and outside the affected timeline with changed and unchanged assignments; verify only changed assignments contribute to affected summaries. |
| INV-41 | Confirming a schedule change creates one compact immutable confirmation record, while later financial-data changes may refresh informational impact estimates without invalidating the confirmed schedule or altering that record. | Preserves evidence of what was authorized without freezing or duplicating mutable financial data. | Confirm a future change, add or correct allocations, transactions, and bills, and verify the record is unchanged, the current estimate refreshes, and no schedule reconfirmation is required. |
| INV-42 | A schedule-change preview displays the old period being closed, any short transition, and the first three complete new-schedule periods; proposed-period details and totals include only authorized known items dated through the visible horizon end date. | Gives users a consistent, bounded view across weekly and monthly changes without implying unlimited future prediction. | Preview boundary-aligned and mid-period changes in both directions; verify three full new periods, a visible cutoff date, complete authorized period totals, and exclusion of later-dated items. |
| INV-43 | Each unmatched projected occurrence of a recurring bill within the preview horizon is displayed separately in its proposed period; the recurring bill definition itself creates no additional preview item or amount. | Shows the date-specific financial picture without treating a recurring definition as another payment. | Generate zero, one, and multiple unmatched occurrences from one recurring bill and verify separate projected rows, correct period totals, and no extra item or amount for the definition. |
| INV-44 | Each unmatched projected occurrence of recurring income within the preview horizon is displayed separately in its proposed period, and projected income has its own period total apart from transactions, bills, and planned allocations. | Prevents expected inflows from being hidden or confused with outflows or posted activity. | Generate multiple unmatched income occurrences and verify separate projected rows, correct independent period totals, and no extra item or amount for the recurring definition. |
| INV-45 | Every usable estimated projected amount is italicized and prefixed with “\~”; any period-category total containing an estimate is also approximate, while occurrences with no usable amount remain visible but are excluded from monetary totals. | Prevents estimates and missing values from being presented as exact financial amounts. | Mix exact, estimated, and missing occurrence amounts; verify item formatting, approximate period totals, missing-value disclosures, and exclusion of missing values from monetary totals. |
| INV-46 | A known pending bank transaction with an authoritative budget date appears in its proposed period using its current known amount and a visible Pending status, and contributes to that period’s transaction total. | Includes currently known financial activity without presenting provisional status as final. | Mix posted and pending transactions across proposed periods; verify assignment, Pending labels, period transaction totals, and current-impact refresh after posting changes. |
| INV-47 | A preview, current-impact estimate, or compact confirmation record never exposes restricted financial items through details, counts, totals, or derived indicators; owners receive complete authorized visibility, Collaborators receive CBD-12 detail, Partners receive complete financially read-only visibility with separate personal interactions permitted, and Viewers receive only current-profile scope. | Preserves least-privilege Viewer access without misleading partial outputs or weakening Partner scope. | Compare every role and Viewer profile; verify complete authorized inputs, unavailable incompatible reports, omission of restricted details/aggregates, and an explanation rather than misleading zero. |
| INV-48 | Stale or temporarily unavailable external account synchronization does not block confirmation when the preview can be calculated completely and reliably from the authoritative financial data already stored for the budget; incomplete stored data or an incomplete or unreliable impact calculation does block confirmation. | Separates data freshness from calculation integrity so a connector delay does not unnecessarily prevent a schedule decision while an untrustworthy preview can never be confirmed. | Test current, stale, and unavailable synchronization states with complete stored data, then repeat with incomplete data and calculation failures; verify freshness notices and last-synchronized times for the former and blocked confirmation for the latter. |
| INV-49 | A posted or pending transaction reliably matched by the separate matching workflow replaces its projected bill or income occurrence in the preview; the projection is neither displayed nor included separately in any period total. | Prevents one financial event from appearing or being counted twice while leaving matching behavior to its owning workflow. | Test posted and pending reliable matches, removed matches, and unmatched projections; verify single-row presentation, transaction-based totals, and projection restoration after unmatching. |
| INV-50 | The preview shows only the proposed resulting financial picture, with all authorized known items and separate transaction, unmatched projected-bill, unmatched projected-income, and planned-allocation totals for each displayed period; it shows no old-schedule financial totals, aggregate affected total, or combined net-impact figure. | Lets users evaluate what the schedule will produce without misleading comparisons or implying that reassignment changes the budget’s net balance. | Preview changes with changed and unchanged items across roles; reconcile every proposed-period category total, verify permission filtering, and verify prohibited comparison and aggregate totals are absent. |
| INV-51 | Items within each proposed period are ordered chronologically by authoritative budget date, use normal product ordering for same-date ties, and otherwise retain their established business-as-usual presentation. | Keeps the preview predictable without creating a second item-display or matching workflow. | Compare preview items with their normal product views; verify date ordering, same-date behavior, fields, formatting, statuses, grouping, and details. |
| INV-52 | A pending future schedule change uses the latest authoritative base planned allocations when it executes, while its immutable confirmation record preserves the inputs and results originally confirmed. | Prevents an obsolete plan from creating the transition while preserving evidence of the decision originally authorized. | Confirm a future change, modify base allocations before execution, and verify the current-impact refresh, execution results, confirmation record, and execution audit. |
| INV-53 | While a transition period is active, its planned allocations cannot be edited directly; saving base-allocation changes requires an explicit, non-default choice to recalculate the transition or keep it unchanged. | Prevents accidental replacement of an active transition plan and distinguishes normal recurring-plan changes from transition-specific effects. | Test individual and batched edits, cancellation, both choices, keyboard access, and validation; verify no preselection and no partial save. |
| INV-54 | A transition allocation recalculation atomically recalculates the complete category set from all current zero-or-positive base planned allocations and changes no financial activity. | Preserves deterministic largest-remainder reconciliation and prevents proration from modifying actual or projected financial items. | Recalculate after category changes with existing spending; verify complete-set rounding, available amounts, unchanged transactions and occurrences, and rollback on failure. |
| INV-55 | Transition recalculation remains available through the transition’s final budget-space date and is rejected after the next local midnight if the period expires before confirmation. | Keeps historical periods immutable and makes the availability boundary deterministic in the budget’s time zone. | Open recalculation before local midnight and confirm on both sides of the boundary; verify authoritative revalidation, no silent save, and a refreshed future-only workflow after expiry. |
| INV-56 | Adding, archiving, or zeroing a category during an active transition uses the same explicit recalculation choice, preserves historical allocations and financial activity, and creates allocation audit evidence without creating a schedule version or rewriting the original confirmation record. | Applies one predictable rule to category lifecycle changes while preserving history and schedule evidence. | Exercise each category lifecycle change with both choices and all authorized and read-only roles; verify transition results, visibility, audit records, and unchanged schedule history. |
| INV-57 | Historical surplus, overspending, and post-close adjustments never change a later cycle during the MVP; an independent later base-allocation edit remains a normal audited allocation decision and is never calculated, suggested, linked, or labeled as rollover or carry-forward. | Preserves the no-rollover scope while allowing users to make ordinary future planning decisions. | Close periods with surplus and overspending, apply post-close adjustments, and independently edit later base allocations; verify historical-only changes, unchanged later periods before explicit edits, normal allocation audit, and absence of rollover behavior. |
| INV-58 | Final confirmation presents the proposed resulting period timeline with all authorized known items and separate period-category totals, and never shows old-schedule financial totals, an aggregate affected total, or a combined net-impact figure. | Keeps final authorization consistent with the approved preview model and prevents misleading financial comparisons. | Compare preview and final review across roles and schedule changes; reconcile proposed-period content and totals and verify prohibited aggregates are absent. |
| INV-59 | Confirming a future schedule change fixes its cadence, anchor, effective date, boundaries, and calculation behavior without freezing mutable financial data; the record preserves the reviewed picture and the interface states that period amounts may update before effect. | Preserves deliberate schedule authorization while allowing normal financial changes before execution. | Confirm a future change, modify financial inputs, and verify the immutable record, current-impact refresh, helper text, unchanged schedule decision, and latest-input execution. |
| INV-60 | A selected effective date that becomes past during final review is never shifted automatically and requires explicit reselection and a new preview; stale synchronization remains non-blocking only when stored data supports a complete reliable calculation and its notice remains visible. | Prevents silent date changes while preserving informed confirmation during connector delays. | Cross local midnight with final review open and test current, stale, unavailable, incomplete, and unreliable data states; verify reselection, preview refresh, notices, and correct confirmation availability. |
| INV-61 | A schedule version is created only when a configuration becomes authoritative; pending, revised, cancelled, and failed future configurations use a stable pending-change identity and immutable confirmed revisions instead. | Ensures every schedule version answers which rules actually governed the budget. | Exercise initial, immediate, future, edited, cancelled, failed, and executed changes; verify version creation points, pending revision history, and execution links. |
| INV-62 | A shortened old period retains the old schedule version, while a transition or boundary-aligned new period begins on the effective date under the new version, and completed boundaries, planned allocations, and version references never change. | Preserves historically correct period governance across schedule transitions. | Execute mid-period and boundary-aligned changes, then attempt later edits and post-close adjustments; verify version intervals and immutable historical planning facts. |
| INV-63 | Post-close financial adjustments may update a completed period’s authoritative actual and remaining amounts only through append-only before-and-after evidence and never reopen the period or change a later period. | Keeps financial reporting accurate without rewriting schedule or rollover history. | Apply late, corrected, removed, and reclassified transactions; verify latest actuals, adjustment evidence, completed state, and unchanged later periods. |
| INV-64 | Every schedule audit event uses the common identity, actor, UTC and budget-local timing, reference, before-and-after, lifecycle-outcome, and correlation fields, and retries cannot duplicate events. | Makes schedule decisions reconstructable across user actions, system execution, time zones, and recovery. | Validate every event type, correlated atomic sequences, retries, uncertain outcomes, and system actors against the required envelope. |
| INV-65 | User authorization and resulting lifecycle transitions are separate correlated events: future confirmation produces Change confirmed plus Change scheduled, while immediate confirmation produces Change confirmed plus Change executed. | Distinguishes the decision from its committed system result and clarifies recovery. | Confirm immediate and future changes, retry delivery, and verify exactly one correctly linked event of each required type. |
| INV-66 | Schedule versions and schedule-change activity are presented separately but cross-linked, with complete financially read-only history for Accountability Partners and provisioned, non-leaking history for Viewers; Partner personal acknowledgements and attributed comments remain separate interaction records. | Keeps authoritative governance distinct from proposed activity while enforcing role intent. | Traverse period, version, pending revision, confirmation, and execution links under every role; verify ordering, financial mutation denial, permitted interactions, and absence of restricted aggregate leakage. |
| INV-67 | Schedule history remains available and interpretable for the life of an active or archived budget; archival storage cannot change meaning, authorized accessibility, references, ordering, or integrity, while permanent deletion and legally required retention remain governed separately. | Supports decades-long budgets without making this workflow specification a universal legal-retention policy. | Archive and restore long-lived histories across schema and storage migrations; verify normalized interpretation, links, permissions, exportability, and separate deletion-policy handling. |
| INV-68 | Authoritative schedule state and temporary schedule workflow state are independent; no unconfirmed editing, preview, or review state can replace authoritative state before successful confirmation. | Allows concurrent workflows without confusing a proposal with the schedule that governs the budget. | Open concurrent setup, change, revision, preview, and review states across roles; verify one authoritative state and no premature durable effects. |
| INV-69 | A persisted budget always has an authoritative schedule; pre-creation unconfigured state creates no budget, while a persisted budget missing its schedule enters read-only integrity recovery. | Enforces the requirement that budget meaning depends on a schedule. | Cancel and fail creation at every step, then simulate a missing persisted schedule; verify atomic absence or complete creation and recovery behavior. |
| INV-70 | A no-change proposal produces no preview or confirmation, and cancelling, abandoning, failing validation, or recalculating a stale preview never changes authoritative state or creates durable records. | Prevents meaningless schedule changes and workflow artifacts from entering history. | Restore edited values, abandon each workflow state, and inject validation and preview failures; verify unavailable confirmation and zero durable effects. |
| INV-71 | An active schedule and its pending future change are displayed separately, and an unconfirmed revision cannot replace the confirmed pending revision or allow a second independent pending change. | Keeps current authority and future intent understandable and enforces the MVP single-pending constraint. | View, edit, abandon, confirm, and race pending changes across roles; verify separation, revision authority, and conflict explanations. |
| INV-72 | Schedule execution is atomic, idempotent, self-recovering, and automatically resolves its durable request outcome to Succeeded or Failed; worker Processing responses and elapsed time are never authoritative outcomes. | Eliminates indefinite ambiguous processing and removes the need for users or support to determine whether a commit occurred. | Crash before and after commit, lose responses, retry requests, and interrupt secondary work; verify one complete outcome, automatic lookup, and no duplicates or partial state. |
| INV-73 | A definitive failed execution proves the prior schedule remains complete and authoritative, preserves immutable failure history, and requires a newly previewed and confirmed immediate proposal before another attempt. | Avoids replaying an outdated or permanently invalid request while restoring normal access safely. | Trigger transient and definitive failures around midnight; verify automatic retry, clean rollback, failed history, role views, and new-proposal requirements. |
| INV-74 | Permission-restricted financial information appears as one consolidated masked section that reveals no item or row count, amount, difference, or derived indicator and is never confused with a true empty or unavailable state. | Makes restricted access understandable without leaking hidden financial information. | Compare full, partial, and absent Viewer scopes with true-zero and service-failure cases; verify masking, message, aggregate protection, and Accountability Partner access. |
| INV-75 | Time zone remains a separate budget setting, and concurrent schedule, pending-revision, time-zone, or permission changes invalidate incompatible workflows and require current authority and permissions before confirmation. | Prevents stale or unauthorized decisions without treating time zone as a schedule version field. | Change each authoritative input from another session while editing, previewing, and confirming; verify stale states, masking refresh, preserved newer records, and required restart or preview. |
| INV-76 | Each budget has one continuous schedule lineage, and only a configuration that became authoritative can join it as a schedule version and become the budget’s current-version reference. | Keeps historical governance continuous and excludes proposals from authoritative version history. | Exercise every change lifecycle and verify one ordered lineage, atomic current-reference updates, and no pending or failed versions. |
| INV-77 | Authoritative periods are created as they become current, while future preview periods and caches remain disposable derived data; schedule changes close or create periods atomically and never delete completed periods. | Avoids stale authoritative future records and preserves immutable history. | Project long horizons, confirm future changes, cross normal and changed boundaries, and invalidate caches; verify authoritative creation timing and no completed-period deletion. |
| INV-78 | Weekly and monthly base allocations are separate cadence contexts, and a cadence change requires explicit target-cadence review without silent four-week conversion. | Prevents mathematically misleading allocation conversion across variable month lengths. | Change in both directions with new and previously used target-cadence values; verify required review, suggestion labels, confirmation, and execution inputs. |
| INV-79 | Base planned allocations and period allocations are distinct; every period allocation retains its category, period, origin, currency, and calculation history, and completed period allocations never change when the base plan evolves. | Supports evolving plans and stable historical planned amounts. | Modify base allocations before, during, and after complete and transition periods; verify initialization, explicit recalculation, and immutable completed allocations. |
| INV-80 | Pending changes have stable identities and immutable confirmed revisions, while unconfirmed revisions and previews are transient; confirmation preserves material reviewed facts without retaining a full interactive preview as history. | Separates durable future intent from disposable workflow calculations. | Edit, abandon, stale, confirm, cancel, and execute pending changes; verify revision ordering, preview disposal, compact evidence, and execution links. |
| INV-81 | A canonical financial item is never duplicated by budget inclusion; each budget uses its own authoritative assignment and audited reassignment relationship. | Allows one account or transaction to participate in budgets with different schedules without corrupting canonical financial data. | Assign one transaction across multiple budgets, change schedules and dates independently, and verify canonical identity, period links, and post-close adjustments. |
| INV-82 | Recurring definitions and projected occurrences are distinct, and a reliable external match relationship makes the canonical transaction replace the occurrence in displays and totals without deleting either identity. | Prevents duplicate financial presentation while keeping matching behavior independently evolvable. | Generate multiple occurrences, match and unmatch posted and pending transactions, and verify definition counts, occurrence identity, display replacement, and restored projections. |
| INV-83 | Every authoritative schedule operation has a stable identity and exactly one durable Succeeded or Failed outcome linked to its evidence, domain results, and audit events. | Provides the logical foundation for idempotency and deterministic self-recovery without prescribing infrastructure. | Lose responses and retry confirmation, revision, cancellation, and execution; verify one outcome and complete non-duplicated links. |
| INV-84 | Category identities are stable, budget-scoped, and never reused; renaming and archiving preserve history, and deterministic rounding never depends on mutable labels or order. | Keeps allocation history and reconciliation reproducible over decades. | Rename, archive, recreate names, reorder, and tie fractional remainders; verify stable references and identical allocation outcomes. |
| INV-85 | A budget uses one authoritative currency context for CBD-67, and every historical monetary or calculation record remains interpretable under its original currency, precision, and rule version. | Prevents historical amounts from being silently reinterpreted and keeps multi-currency outside the cadence workflow. | Verify history and audit across precision and rule migrations and reject mixed-currency or currency-change behavior within this scope. |
| INV-86 | Every CBD-67 acceptance criterion and every product invariant has traceable automated verification, and a failed required check blocks release of the affected workflow. | Prevents required behavior from being treated as optional and keeps verification evidence reviewable. | Trace each criterion and invariant to scenario and test IDs; introduce a failure and verify the affected workflow cannot pass its release gate. |
| INV-87 | Calendar, proration, rounding, reconciliation, preview, and history verification is deterministic under explicitly controlled budget date, named time zone, local-midnight boundary, currency precision, and rule version. | Ensures the same business inputs produce the same verifiable results regardless of machine clock, machine time zone, or execution environment. | Run fixed reference fixtures and generated boundary cases across environments and verify identical periods, allocations, totals, and durable records. |
| INV-88 | Automated verification covers every authorized role and workflow state, including accessible interaction, permission masking, mid-workflow permission changes, and the absence of restricted-data leakage; targeted human accessibility evaluation supplements automation. | Protects both authorization and usability as first-class product behavior. | Exercise the role-state matrix with accessibility checks and verify visible content, actions, focus, announcements, masking, and restricted aggregate handling. |
| INV-89 | Verification of authoritative schedule operations includes concurrency, duplicate delivery, lost responses, interruption, retry, and recovery, and proves exactly one complete durable outcome with no partial or duplicate domain effects. | Makes the product's definitive Succeeded-or-Failed guarantee testable under realistic failure conditions. | Inject failures before and after commit across confirmation, revision, cancellation, and execution; verify one outcome, complete links, prior-state preservation on failure, and no duplicates. |

## 4. Roles and permissions

[CBD-12](https://cobudget.atlassian.net/browse/CBD-12) governs role definitions, membership, consent, invitation, revocation, and the broader permission model. This section defines how those roles interact with weekly and monthly schedule workflows.

### Viewer and Accountability Partner distinction

A Viewer is a default-deny, least-privilege role. Viewer access is limited to one CBD-72 visibility profile and its inherited groups, descendants, and safe interpretation envelope. Independent per-item grants and mixed Account-group/Category-group scopes are not supported.

An Accountability Partner is a formal support role. Accepting the role grants comprehensive, financially read-only visibility into the budget space so the Accountability Partner can understand the full financial picture. This includes schedules and cycle history, confirmed pending changes, categories and allocations, balances, transactions, bills, goals, reports, and relevant audit history. The Partner may create personal firm-alert acknowledgements and attributed comments on supported readable targets; those interactions cannot change financial, schedule, permission, membership, connection, or configuration state.

Comprehensive read-only access does not include financial-connection credentials, authentication information, private security configuration, money movement, purchase approval, transaction blocking, unrestricted export, membership or permission administration, or any ability to create, change, archive, or remove financial or budget records.

An Accountability Partner may acknowledge alerts and add comments where those interactions are explicitly supported. These interactions must be attributed and audited and must never modify financial data, schedule state, permissions, or configuration.

Assignment requires clear disclosure, explicit owner confirmation, and acceptance by the Accountability Partner. Revocation removes access immediately. If narrower or resource-specific visibility is desired, the person must be assigned the Viewer role instead.

### Schedule-workflow permission matrix

| Action | Primary Owner | Co-owner | Collaborator | Viewer | Accountability Partner |
| --- | --- | --- | --- | --- | --- |
| View active schedule and budget cycles | Yes | Yes | Yes | Only when current profile includes schedule scope | Yes |
| View confirmed pending changes | Yes | Yes | Yes | Only when current profile includes schedule scope | Yes |
| View complete schedule history | Yes | Yes | Yes | Only within current profile scope | Yes |
| View detailed schedule audit history | Yes | Yes | As permitted by CBD-12 | Only within current profile scope | Yes, excluding private security or credential information |
| Create the initial schedule | Yes | Yes | Yes | No | No |
| Configure and preview a schedule change | Yes | Yes | Yes | No | No |
| Confirm a schedule change | Yes | Yes | Yes | No | No |
| Edit or cancel a confirmed pending change | Yes | Yes | Yes | No | No |
| Change the budget-space time zone | Yes | Yes | No | No | No |
| Acknowledge supported firm alerts | Yes | Yes | Yes | Only when the current profile makes the firm alert eligible | Yes |
| Add supported comments | Yes | Yes | Yes | No | Yes |
| Modify any budget, schedule, financial record, permission, or configuration | As permitted by CBD-12 | As permitted by CBD-12 | As permitted by CBD-12 | No | No |

### Proposal and confirmation lifecycle

An unconfirmed schedule proposal exists only while an authorized user is configuring and previewing an initial schedule or schedule change. It is temporary, non-authoritative, and not visible to other collaborators. Leaving the workflow discards it unless draft retention is explicitly introduced later.

Confirmation is the single action that commits the proposal. After confirmation:

* A change effective today proceeds to execution under the schedule-change rules.
* A future-dated change becomes a persistent confirmed pending change.
* The pending change is visible according to the permission matrix and remains editable or cancelable by an authorized schedule editor until execution.
* Creation, editing, cancellation, confirmation, and execution are audited.

The permission matrix above is authoritative for cadence workflows: Primary Owners, Co-owners, and Collaborators are authorized schedule editors and may create, configure, preview, confirm, edit, cancel, and retry schedule changes. Viewer remains read-only. Accountability Partner remains financially read-only while personal firm-alert acknowledgements and attributed comments remain separately permitted. The MVP does not include a separate owner-approval step. A possible multi-person approval workflow is recorded as [FF-001 in the CoBudget Future Feature Register](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/950274).

### Authorization changes during a workflow

Authorization is evaluated when the workflow opens and checked again at confirmation. If the user loses the required permission before confirmation, confirmation is blocked and the authoritative schedule remains unchanged.

A confirmed pending change belongs to the budget space rather than to the continuing access of the person who confirmed it. Removing or changing that person’s membership does not silently cancel the pending change; an authorized user must cancel it explicitly.

## 5. Weekly schedule setup workflow

### 5.1 Entry conditions

The initial weekly schedule setup workflow is a required part of creating a weekly budget. It is available when all of the following are true:

* The user is creating a new budget and is authorized to create and own it.
* A budget name and budget-space time zone have been entered.
* No authoritative budget space, budget schedule, or budget cycle has yet been created from the proposal.
* The cadence selection is weekly.

A user may already have a financial profile and linked accounts before entering this workflow. Neither a financial profile nor a linked account requires a budget schedule. Linked accounts remain outside the proposed budget until the budget has been created successfully and the user explicitly adds them to its budget account scope.

Schedule confirmation is a required creation gate. Before confirmation:

* The proposed budget is temporary and non-authoritative.
* No budget membership, category, planned allocation, bill, goal, manual transaction, account-to-budget assignment, or other period-dependent budget record can be created.
* No linked-account transaction is classified into the proposed budget.
* Leaving the workflow discards the proposed budget and schedule; draft retention is not supported.
* The user may return to the financial dashboard without creating a budget.

Opening the workflow creates an unconfirmed schedule proposal only. The budget space, initial schedule version, and complete current anchored budget cycle are created together only after a valid preview is confirmed. Successful confirmation unlocks account selection and the remaining budget-setup workflows.

If confirmation fails, no part of the budget creation becomes authoritative and the user remains in the proposal with a recoverable error. If another request or session creates the budget from the same proposal first, the open preview becomes stale and cannot be confirmed again.

Initial schedule setup is unavailable for an existing budget. An authorized user must use the schedule-change workflow in Section 8 instead.

The detailed financial-profile, account-linking, financial-dashboard, multi-budget account-scope, and broader onboarding behaviors are governed by [CBD-82](https://cobudget.atlassian.net/browse/CBD-82), [CBD-83](https://cobudget.atlassian.net/browse/CBD-83), [CBD-84](https://cobudget.atlassian.net/browse/CBD-84), and [CBD-85](https://cobudget.atlassian.net/browse/CBD-85).

### 5.2 Required inputs and defaults

The weekly schedule setup workflow requests only inputs that identify the proposed budget or affect period generation.

| Input | Required? | Default | Behavior |
| --- | --- | --- | --- |
| Budget name | Yes | None | Collected before schedule configuration and shown for context. It does not affect period generation. |
| Budget-space time zone | Yes | Primary owner’s supported local time zone; otherwise GMT | Determines the budget-space date, local midnight, and all dates shown in the preview. It remains visible and can be changed from this step. |
| Cadence | Yes | None | Must be set to **Weekly** to enter this workflow. |
| Weekly anchor | Yes | Monday | May be changed to any weekday from Monday through Sunday. The anchor is the first day of each weekly budget cycle. |

The product derives the following values; they are not user inputs:

* **Budget-space today:** The current calendar date in the selected budget-space time zone.
* **Current-period start:** The selected anchor weekday occurring on or most recently before the budget-space date.
* **Current-period end:** The calendar day before the next occurrence of the selected anchor.
* **Period length:** Seven inclusive calendar days.
* **Initial effective date:** The start date of the complete current anchored period, even when that date precedes the budget’s creation date.
* **Next boundary:** The next occurrence of the selected anchor after the current-period start.

The workflow does not request a separate schedule name, user-selected effective date, period end date, duration, planned allocation, account selection, or transaction or bill setting.

Changing the weekly anchor or budget-space time zone recalculates the setup preview immediately. The changed value remains part of the unconfirmed proposal and does not create or modify an authoritative budget. Because a time-zone change can alter the budget-space date and complete current period, confirmation is unavailable until the recalculated preview is current.

For example, when the budget-space date is Wednesday, August 12, 2026:

| Weekly anchor | Complete current anchored period |
| --- | --- |
| Monday | August 10–16, 2026 |
| Wednesday | August 12–18, 2026 |
| Friday | August 7–13, 2026 |

### 5.3 Validation rules and messages

The Monday default is a complete, valid weekly-anchor selection as soon as the workflow opens. The user is not required to open, change, or reselect the anchor control. Clearly displaying **Weekly**, **Monday**, and the resulting period dates in the preview, followed by the user’s confirmation, constitutes acceptance of the default.

The same validation rules apply whether Monday remains selected by default or the user explicitly selects any weekday. No warning or additional acknowledgement is shown solely because the user retained the default.

Budget names are user-facing labels and are not required to be unique within a financial profile or across shared budgets. Duplicate names do not produce an error or warning and do not affect budget identity. The product trims leading and trailing whitespace for validation and persistence; the name must contain at least one non-whitespace character and no more than 100 user-perceived characters. Internal identifiers, rather than names, distinguish budget spaces.

Budget names may contain international characters, spaces, punctuation, and emoji. Control characters and unsafe invisible formatting characters are not accepted. The interface shows a character counter as the limit approaches. Input beyond the limit remains visible for correction and is never silently truncated. The technical specification will define the database type, Unicode-counting implementation, normalization, and enforcement mechanism.

The budget-space time zone is selected from a searchable list of supported named time zones; free-text entry and fixed UTC-offset choices are not available. The list presents recognizable region or city labels and the current UTC offset. When the primary owner’s local time zone is missing or unsupported, GMT is selected as the visibly identified fallback.

A system-selected GMT fallback is not accepted implicitly. Before confirmation, the user must either choose **Use GMT** or select another supported named time zone. The interface explains why GMT was selected and confirmation remains blocked until this one-time verification is complete. Explicitly choosing GMT from the list also satisfies the verification requirement.

Any time-zone change invalidates the current preview and confirmation remains unavailable until recalculation succeeds. The technical specification will define the supported time-zone data source and identifiers.

An open setup preview is also revalidated at local midnight in the selected budget-space time zone. Confirmation is temporarily unavailable while the preview recalculates using the new budget-space date. If the complete current period is unchanged, the refreshed preview is restored without interrupting the user. If local midnight begins a new anchored week, the interface identifies that the current period changed and presents the new dates for review; no separate acknowledgement is required beyond confirming the refreshed preview.

| Condition | Message | UI location | Blocking? |
| --- | --- | --- | --- |
| Budget name is empty or contains only whitespace | Enter a budget name. | Budget name field | Yes |
| Budget name exceeds 100 user-perceived characters | Budget names must be 100 characters or fewer. | Budget name field and character counter | Yes |
| Budget name contains a control character or unsafe invisible formatting character | Remove unsupported invisible or control characters. | Budget name field | Yes |
| GMT was selected automatically because the owner’s time zone was missing or unsupported | We couldn’t determine your local time zone. GMT has been selected. Confirm GMT or choose another time zone. | Budget-space time-zone field and confirmation area | Yes, until verified |
| Previously selected time zone is no longer supported | Select a supported time zone to determine your budget dates. | Budget-space time-zone field | Yes |
| Preview recalculation after a time-zone change is incomplete or failed | Your budget dates could not be updated. Try again before creating the budget. | Preview status and confirmation area | Yes |
| Budget-space date changes at local midnight but the complete current period is unchanged | No error; refresh the budget-space date and preview. | Preview | Temporarily, during recalculation |
| Local midnight begins a new anchored week while setup is open | A new budget week has started. Review the updated period dates before creating your budget. | Preview status and confirmation area | Yes, until the refreshed preview is available |

### 5.4 Preview

The setup preview shows the complete current anchored period and the next three complete weekly periods using the selected budget-space time zone.

The preview identifies:

* Proposed budget name
* Budget-space time zone and budget-space date
* Weekly cadence and selected anchor
* The current period’s inclusive start and end dates and seven-day length
* The inclusive start and end dates and seven-day length for each of the next three periods
* The next natural boundary
* A clear indication when the current period begins before the proposed budget’s creation date

All four displayed periods are contiguous and non-overlapping. Each subsequent period begins on the selected anchor and on the calendar day after the preceding period ends.

The preview reflects all information already associated with the proposed budget at the time it is generated and does not use accounts or transactions that remain outside its scope. Under the MVP schedule-first creation flow, account assignment and other period-dependent records are unavailable until after confirmation, so an initial setup preview will normally contain schedule data only.

Whether transactions predating account addition enter a budget is decided by the user in the account-addition workflow governed by [CBD-84](https://cobudget.atlassian.net/browse/CBD-84). Schedule setup does not make that choice and does not automatically include transactions from linked accounts in the user’s financial profile.

#### Conceptual visual reference

The following wireframe illustrates the approved information hierarchy. It is a non-binding design reference; the behavioral requirements in this specification remain authoritative.

```plaintext
┌───────────────────────────────────────────────────────────────────────────────┐
│ CoBudget                                      Create budget · Schedule │
├───────────────────────────────────────────────────────────────────────────────┤
│ Preview your budget schedule                                           │
│ Review the complete current week and the next three weeks.             │
│                                                                        │
│ Week starts on                         Budget time zone                │
│ [ Monday                         ▼ ]    [ America/New_York (UTC−04) ▼] │
│                                                                        │
│ ┌─────────────────────────────────────────────────────────────────────┐      │
│ │ YOUR FIRST BUDGET WEEK                         Today · Aug 12 │      │
│ │ August 10–16, 2026                                            │      │
│ │                                                               │      │
│ │  Mon 10   Tue 11  [Wed 12]  Thu 13  Fri 14  Sat 15  Sun 16    │      │
│ │  elapsed  elapsed    today    remaining days                  │      │
│ │                                                               │      │
│ │ Today is August 12. 2 days elapsed · 5 days remaining.        │      │
│ └─────────────────────────────────────────────────────────────────────┘      │
│                                                                        │
│ Next three weeks                                                       │
│ Week 2                                             Aug 17–23           │
│ Week 3                                             Aug 24–30           │
│ Week 4                                             Aug 31–Sep 6        │
│                                                                        │
│ Dates use your budget time zone.                    [ Create budget ]  │
└───────────────────────────────────────────────────────────────────────────────┘
```

The implemented interface may adapt this layout for screen size and accessibility, but it must preserve the same visible schedule inputs, current-period emphasis, Today marker, elapsed and remaining days, next-three-period preview, time-zone context, and confirmation action.

### 5.5 Confirmation and resulting state

The setup preview is the review step. Selecting **Create budget** submits the proposal directly; no second confirmation dialog repeats the preview.

The action is available only when:

* All required inputs are valid.
* Any system-selected GMT fallback has been explicitly verified.
* The preview is current and was calculated for the current budget-space date.
* The user remains authenticated and authorized to create the budget.
* No creation request for the same proposal is already executing.

While creation is executing, the interface displays an in-progress state, prevents changes to the proposal, and prevents duplicate submission.

Successful confirmation creates the following as one atomic, user-visible outcome:

* The budget space
* The primary-owner membership
* The initial immutable weekly schedule version
* The complete current anchored weekly budget cycle
* The future period definitions or boundaries required to support the displayed preview and continued schedule generation
* The required budget-creation and schedule-creation audit records

The created schedule is immediately authoritative. Its cadence, anchor, budget-space time zone, current-period dates, and next boundary match the confirmed preview.

After successful creation, the product launches an optional budget setup wizard. The wizard may include adding accounts to the budget’s scope, creating categories, defining spending targets, adding bills, and adding income schedules. Every step provides a **Skip** action that advances to the next step, and the wizard provides a **Skip setup** action that exits directly to the created budget.

Skipping an individual step or the entire wizard does not undo, deactivate, or change the created budget, schedule version, or active period. Detailed step ordering, progress persistence, resume and re-entry behavior, completion state, and step-specific validation are outside this specification and are governed by [CBD-85](https://cobudget.atlassian.net/browse/CBD-85).

### 5.6 Alternate and failure paths

#### Recoverable creation failure

If budget creation fails before the complete atomic outcome becomes authoritative, the user remains in the active setup workflow. The product preserves the budget name, time zone, cadence, weekly anchor, and any completed GMT verification for the duration of that active workflow session.

The last preview is marked stale after a failed creation attempt and must be recalculated before retry. The user can retry after recovery or leave the workflow. Leaving discards the proposal because persistent draft retention is not supported.

#### Validation failure

Validation occurs before submission whenever the condition can be detected locally and is repeated authoritatively during confirmation. A validation failure does not clear valid fields or create any portion of the budget.

When one or more fields fail validation, the interface:

* Presents a concise error summary identifying every field that requires attention.
* Moves focus to the error summary or first invalid field using an accessible focus order.
* Visually identifies each invalid field without relying on color alone.
* Associates each invalid field with an inline message that states what is wrong and how to correct it.
* Preserves all valid values while the user corrects the invalid values.
* Keeps **Create budget** unavailable until every blocking error is resolved and the preview is current.
* Announces validation changes to assistive technology.

A validation message must describe the violated rule rather than use a generic message such as “Invalid input.” Field-level copy defined in Section 5.3 is used when applicable.

#### Boundary change during submission

Authoritative creation acceptance revalidates the confirmed preview against the current budget-space date.

* If the creation request receives authoritative acceptance before local midnight changes the current budget cycle, creation completes from the exact confirmed preview even when processing or the response finishes after the boundary.
* If the request is first processed after local midnight has changed the current budget cycle, the proposal fails revalidation and no part of the budget is created.
* The interface refreshes the preview using the new current period and displays: **“A new budget period started before your budget was created. Review the updated dates and try again.”**
* The user must review the refreshed dates and select **Create budget** again.
* This outcome is a stale-preview validation result, not an uncertain creation result. The product does not reconcile it as though creation may have succeeded.

#### Uncertain creation result

If the interface loses the response to **Create budget** or otherwise cannot determine whether the request succeeded, it enters an uncertain-result state. It must not report a definitive failure or enable a new creation attempt until it has checked the authoritative outcome of the same creation request.

The initial message is:

> We’re confirming whether your budget was created. Don’t close this page.

The product may report the request as **Processing** only for a bounded interval. Processing has an expiration or equivalent recovery trigger; it cannot remain valid indefinitely. The interface reduces the frequency of checks over time and, after the normal interactive wait has elapsed, tells the user that they may safely leave while reconciliation continues.

When the user leaves, the financial dashboard represents the unresolved outcome as **Finishing setup**. The user is not required to keep the creation page open.

Resolution follows these rules:

* If the complete atomic creation outcome exists, the request becomes **Succeeded** and every subsequent check or retry identifies the same created budget.
* If no creation outcome exists and failure is authoritative, the request becomes **Failed**, the proposal is restored when available, and a safe retry uses the same creation request.
* If Processing expires, automatic reconciliation determines whether the complete outcome exists or no outcome exists.
* If an unexpected partial or internally inconsistent state is detected, the request becomes **Recovery required**. Duplicate creation remains blocked while automated repair or operational escalation resolves it.
* A retry, concurrent submission, status check, expired-processing recovery, or reopened session must never create a second budget from the same confirmed proposal.

When successful resolution occurs, the product opens or links to the created budget and launches or offers the optional setup wizard. When definitive failure occurs, the product explains that no budget was created and offers retry. When recovery remains necessary, the product provides a durable status and support or retry guidance without implying that the user must continue polling.

The detailed request identifier, idempotency mechanism, processing lease or expiration, status endpoint, polling intervals, persistence model, transaction boundaries, reconciliation job, operational alerts, and retention policy belong in the future technical specification.

## 6. Monthly schedule setup workflow

Unless this section defines a monthly-specific difference, the schedule-first creation, validation, confirmation, atomicity, retry, uncertain-result, recovery, optional setup-wizard, accessibility, and account-scope rules in Section 5 also apply to monthly setup.

### 6.1 Entry conditions

The initial monthly schedule setup workflow is a required part of creating a monthly budget. It is available when all of the following are true:

* The user is creating a new budget and is authorized to create and own it.
* A valid budget name and budget-space time zone have been entered.
* No authoritative budget space, budget schedule, or budget cycle has yet been created from the proposal.
* The cadence selection is monthly.

A user may already have a financial profile and linked accounts. Those accounts remain outside the proposed budget until successful creation and explicit assignment to its budget account scope.

Before confirmation, the proposed budget is temporary and non-authoritative. Memberships, accounts, categories, planned allocations, spending targets, bills, goals, income schedules, transactions, and other period-dependent records cannot be added. Leaving discards the proposal because draft retention is not supported.

Successful confirmation atomically creates the budget, primary-owner membership, initial monthly schedule version, and complete current anchored monthly cycle, then launches the optional setup wizard defined in Section 5.5.

### 6.2 Required inputs and defaults

| Input | Required? | Default | Behavior |
| --- | --- | --- | --- |
| Budget name | Yes | None | Uses the naming and validation rules in Sections 5.2–5.3. |
| Budget-space time zone | Yes | Primary owner’s supported local time zone; otherwise verified GMT | Uses the list-only selection, verification, and preview-refresh rules in Sections 5.2–5.3. |
| Cadence | Yes | None | Must be set to **Monthly** to enter this workflow. |
| Monthly anchor | Yes | 1st day of the month | Selects a numbered day from the 1st through 31st or the explicit **Last day** rule. |

The product derives the budget-space date, complete current-period start and end, variable period length, initial effective date, next natural boundary, and next three complete monthly periods. These values are not user inputs.

The workflow does not request a separate schedule name, user-selected effective date, period end date, duration, planned allocation, account selection, or transaction, bill, or income-schedule setting.

Changing the monthly anchor or budget-space time zone immediately invalidates and recalculates the setup preview. Confirmation remains unavailable until the refreshed preview is current.

The 1st-day default is a complete, valid monthly-anchor selection as soon as the workflow opens. The user is not required to open, change, or reselect the anchor control. Clearly displaying **Monthly**, **1st**, and the resulting period dates in the preview, followed by confirmation, constitutes acceptance of the default.

### 6.3 Numbered anchors and explicit last-day option

A monthly anchor identifies the first day of each complete monthly budget cycle. Each cycle ends on the calendar day before the next generated monthly anchor.

The user can select one of 32 persistent rules:

* A numbered anchor from the 1st through the 31st
* The explicit **Last day** anchor

A numbered anchor retains its selected number even when a particular month does not contain that date. Using a different generated boundary in a short month does not change the persisted anchor.

The **Last day** rule is stored and displayed as a configuration value distinct from the 28th, 29th, 30th, and 31st because it expresses the user’s intent to use the final calendar day rather than a numbered date.

Under the supported Gregorian calendar, **31st** with short-month clamping and **Last day** currently generate the same boundary dates. The product does not imply that their generated dates differ and does not warn against either choice. It preserves and displays the selected rule in previews, confirmation, schedule versions, history, and audit records.

The anchor control provides concise clarification:

* **31st:** Uses the 31st when it exists; otherwise uses that month’s final valid day.
* **Last day:** Always uses the final calendar day of the month.

Examples:

| Selected anchor | Generated starts | Example periods |
| --- | --- | --- |
| 1st | January 1, February 1, March 1 | January 1–31; February 1–27 or 28; March 1–31 |
| 15th | January 15, February 15, March 15 | January 15–February 14; February 15–March 14 |
| 31st | January 31, February’s final valid day, March 31 | January 31–the day before February’s generated start; February’s generated start–March 30 |
| Last day | January 31, February’s actual last day, March 31 | Each period begins on that month’s actual last day and ends the day before the next month’s last day |

### 6.4 Short-month, February, and leap-year behavior

For a numbered monthly anchor of the 29th, 30th, or 31st, a month that does not contain the selected date uses that month’s final valid calendar day as the generated boundary. This is **short-month clamping**.

* Clamping changes only the generated boundary for the affected month. It does not change the saved monthly-anchor selection.
* When a later month contains the selected date, generation automatically returns to that numbered date.
* February uses February 28 in a common year and February 29 in a leap year.
* A 29th anchor clamps only for February in common years.
* A 30th anchor clamps for February.
* A 31st anchor clamps for February, April, June, September, and November.
* Periods remain contiguous: a period starts on its generated boundary and ends on the calendar day immediately before the next generated boundary.
* Short-month clamping is expected schedule behavior. It is not an error or warning and never requires acknowledgement.
* When the user selects the 29th, 30th, or 31st, the selector displays persistent helper text: **“If a month does not contain this date, that period starts on the month’s final day.”**
* When an affected month appears in the preview, the generated date receives a contextual explanation. For example: **“February starts on February 28 because February does not have a 31st. Your schedule returns to the 31st in March.”** This explanation is informational, not a warning, and requires no acknowledgement.
* The **Last day** rule always generates the month’s actual final calendar day. Because this is the rule’s direct meaning rather than a fallback, the interface does not describe it as clamping or show a clamping explanation; the preview still shows the generated date.

### 6.5 Validation rules and messages

The cadence-neutral budget-name, budget-space time-zone, stale-preview, authorization, and accessible field-validation rules defined in Section 5 apply unchanged to monthly setup.

The **1st** default is a complete, valid monthly-anchor selection as soon as the workflow opens. The user is not required to open, change, or reselect the anchor control. Clearly displaying **Monthly**, **1st**, and the resulting period dates in the preview, followed by the user’s confirmation, constitutes acceptance of the default.

Every numbered date from the 1st through the 31st and the explicit **Last day** option is a valid selection. The 29th, 30th, and 31st remain valid even when a visible or future month lacks that numbered date; the clamping rules in Section 6.4 produce a valid boundary instead of a validation error.

Short-month helper text and contextual clamping explanations are informational. They are not warnings, do not block confirmation, and never require acknowledgement.

Changing the monthly anchor or budget-space time zone invalidates the current preview. Confirmation remains unavailable until recalculation succeeds and the preview reflects the current inputs and budget-space date.

An open monthly setup preview is revalidated at local midnight in the selected budget-space time zone. Confirmation is temporarily unavailable while the preview recalculates. If the current anchored period is unchanged, the date and preview refresh without a message or acknowledgement. If local midnight begins a new monthly budget period, the interface identifies that the period changed and presents the new dates for review; no separate acknowledgement is required beyond confirming the refreshed preview.

Every validation error associated with a specific input highlights that field and explains the violation in text. An error summary may supplement these field-level messages but does not replace them. Confirmation is unavailable whenever any blocking condition exists.

| Condition | Message | UI location | Blocking? |
| --- | --- | --- | --- |
| Budget name is empty, too long, or contains unsupported characters | Use the applicable budget-name message defined in Section 5.3. | Budget name field | Yes |
| No valid monthly anchor is available | Select when each monthly period should start. | Monthly-anchor field | Yes |
| Monthly anchor is the 29th, 30th, or 31st | If a month does not contain this date, that period starts on the month’s final day. | Beneath monthly-anchor field | No |
| A visible preview boundary is clamped | Explain the generated date and when the schedule returns to the saved numbered anchor; for example: February starts on February 28 because February does not have a 31st. Your schedule returns to the 31st in March. | Affected preview period | No |
| GMT was selected automatically because the owner’s time zone was missing or unsupported | We couldn’t determine your local time zone. GMT has been selected. Confirm GMT or choose another time zone. | Budget-space time-zone field and confirmation area | Yes, until verified |
| Previously selected time zone is no longer supported | Select a supported time zone to determine your budget dates. | Budget-space time-zone field | Yes |
| Preview recalculation is incomplete or failed | Your budget dates could not be updated. Try again before creating the budget. | Preview status and confirmation area | Yes |
| Budget-space date changes at local midnight but the current monthly period is unchanged | No message; refresh the budget-space date and preview. | Preview | Temporarily, during recalculation |
| Local midnight begins a new monthly budget period while setup is open | A new budget period has started. Review the updated period dates before creating your budget. | Preview status and confirmation area | Yes, until the refreshed preview is available |

### 6.6 Preview

The monthly schedule preview is a functional reference for the information and interactions the product must provide. Its visual layout, component styling, spacing, and final information architecture remain subject to a separate design task.

Before confirmation, the schedule step must show:

* The selected **Monthly** cadence.
* The selected monthly-anchor rule, including the default **1st** or any user-selected numbered date or **Last day**.
* The persistent short-month helper text when the selected anchor is the 29th, 30th, or 31st.
* A list-based **Budget time zone** selector that uses supported named time zones rather than free text or UTC offsets.
* The selected budget time zone and helper text explaining that period boundaries occur at local midnight in that budget time zone.
* The complete current anchored period and at least the next three generated periods.
* Each period’s start date, end date, and inclusive number of calendar days.
* A clear label distinguishing the current period from each future period.
* An informational explanation beside any visible clamped monthly boundary, without warning styling or acknowledgement.
* Navigation back to earlier setup inputs and the action that submits the confirmed budget-creation proposal.

Illustrative functional wireframe:

| Schedule input | Example value |
| --- | --- |
| Budget cadence | Monthly |
| Monthly period starts | 31st |
| Short-month helper | If a month does not contain this date, that period starts on the month’s final day. |
| Budget time zone | America/New_York |
| Time-zone helper | Period boundaries occur at local midnight in this budget time zone. |

| Preview label | Generated period | Inclusive length | Context |
| --- | --- | --- | --- |
| Current period | Jan 31–Feb 27 | 28 days | — |
| Next period | Feb 28–Mar 30 | 31 days | February starts on February 28 because February does not have a 31st. The schedule returns to the 31st in March. |
| Following period | Mar 31–Apr 29 | 30 days | — |
| Following period | Apr 30–May 30 | 31 days | — |

This wireframe approves the functional content only. It does not approve the final interface design.

### 6.7 Confirmation and resulting state

The monthly setup preview is the review step. Selecting **Create budget** submits the proposal directly; no second confirmation dialog repeats the preview.

The action is available only when:

* All required inputs are valid.
* Any system-selected GMT fallback has been explicitly verified.
* The preview is current and was calculated for the current budget-space date and current proposal inputs.
* The user remains authenticated and authorized to create the budget.
* No creation request for the same proposal is already executing.

While creation is executing, the interface displays an in-progress state, prevents changes to the proposal, and prevents duplicate submission.

Successful confirmation creates the following as one atomic, user-visible outcome:

* The budget space
* The primary-owner membership
* The initial immutable monthly schedule version
* The complete current anchored monthly budget cycle
* The future period definitions or boundaries required to support the displayed preview and continued schedule generation
* The required budget-creation and schedule-creation audit records

The created schedule is immediately authoritative. Its monthly cadence, saved anchor rule, budget-space time zone, current-period dates, and next boundary match the confirmed preview. The saved rule preserves the user’s intent, including the distinction between a numbered **31st** anchor and **Last day**, even when their generated dates coincide.

When the complete current anchored period began before the budget’s creation date, the preview and resulting active-period header clearly show the actual period dates. This is expected behavior and does not produce a warning, acknowledgement, or post-creation banner.

After successful creation, the product launches the same optional budget setup wizard defined in Section 5.5. Skipping an individual step or the entire wizard does not undo, deactivate, or change the created budget, monthly schedule version, or active period.

### 6.8 Alternate and failure paths

The recoverable-failure, validation-failure, uncertain-result, bounded-processing, reconciliation, idempotency, and recovery rules in Section 5.6 apply unchanged to monthly budget creation. Monthly-specific state preserved during the active workflow includes the saved monthly-anchor selection and its distinction between a numbered anchor and **Last day**.

After any recoverable creation failure, the monthly preview is stale and must be recalculated before retry. Recalculation applies the current budget-space date, the selected budget-space time zone, the saved monthly-anchor rule, and all applicable short-month or leap-year behavior.

The boundary-change-during-submission rule in Section 5.6 also applies:

* If authoritative creation acceptance occurs before a monthly boundary, creation completes using the exact preview the user confirmed even when processing or the response continues past local midnight.
* If the request is first processed after local midnight has begun a new monthly budget period, no budget is created from the stale preview.
* The interface generates the new current monthly period and future periods, then displays: **“A new budget period started before your budget was created. Review the updated dates and try again.”**
* The user reviews the refreshed preview and selects **Create budget** again.
* No warning or acknowledgement is required beyond the new confirmation action.

Abandoning monthly setup before submission creates nothing. Leaving after a definitive recoverable failure discards the unconfirmed proposal because persistent draft retention is not supported. Leaving during an uncertain result follows the durable **Finishing setup** behavior in Section 5.6 and does not cancel reconciliation.

## 7. Active-period behavior

### 7.1 Current-period determination

For the current budget-space date, exactly one budget cycle is the **active budget cycle**. It is the cycle whose inclusive start and end dates contain that date.

Initial weekly and monthly onboarding opens the complete current anchored period created during budget confirmation, including when its start date precedes the budget’s creation date. There is no partial onboarding period solely because the budget was created after the natural boundary.

The active cycle is determined from:

* The authoritative budget-space date
* The budget’s configured supported named time zone
* The authoritative schedule version for that date
* The cadence and saved anchor rule in that schedule version
* The applicable weekly, monthly, short-month, and leap-year boundary rules

A viewer’s device date, device time zone, physical location, or moment of opening the page cannot select a different active cycle. All collaborators with access to the same budget see the same current period.

### 7.2 Active-period presentation and authority

The active-period view clearly identifies:

* Its status as **Current period**
* Inclusive start and end dates
* The budget-space date
* Weekly or monthly cadence
* The saved anchor rule
* The budget-space time zone
* The next natural boundary
* The authoritative schedule version or a user-understandable link to its schedule history
* Any confirmed pending schedule change that can affect the current or a future cycle, subject to the viewer's role and current profile scope

The authoritative schedule version governs the active cycle unless and until a confirmed schedule change takes effect under Section 8. An unconfirmed proposal cannot change the active period, its displayed dates, financial calculations, or schedule history.

A period whose start date precedes budget creation is presented as the normal current period. Its dates remain visible, but it does not receive warning styling or require acknowledgement.

### 7.3 Automatic natural-boundary transition

At local midnight at the next natural boundary in the configured budget-space time zone:

* The prior active cycle becomes a **completed budget cycle**.
* The next contiguous cycle becomes the single active cycle.
* The next cycle begins on the calendar day after the completed cycle ends.
* No date is omitted or assigned to both cycles.
* The transition occurs automatically; no user manually closes the period, confirms the transition, or acknowledges it.
* No warning, modal, or blocking banner is shown solely because a normal boundary occurred.
* The next time a user views or refreshes the budget, the interface shows the newly active cycle.
* Weekly boundaries, numbered monthly boundaries, **Last day** boundaries, clamped monthly boundaries, February, and leap-year boundaries follow the same lifecycle behavior.

The budget-space date determines the correct active cycle even if background processing or the interface refresh is delayed. Recovery must converge to one completed prior cycle and one active next cycle and must never expose two active cycles or require user action to advance the calendar.

### 7.4 Completed-period behavior

When the budget-space date advances beyond a cycle’s inclusive end date, that cycle is completed. Completion fixes its schedule-derived and planning context:

* Inclusive start and end dates
* Cadence and saved anchor rule
* Governing schedule-version reference
* Planned category allocations, including any proration and rounding results already applied
* Completed status
* Remaining amount retained in the completed cycle’s historical reporting
* Audit records describing creation, transition, and completion

A normal schedule change, future boundary, time-zone display, viewer location, or later schedule version cannot rewrite these values.

Completed cycles remain available in history to every role entitled to see them. The view distinguishes planned amounts, current historical actual amounts, and the remaining amount calculated from those current actuals. During the MVP, no positive or negative remaining amount transfers into a later cycle.

The word **completed** does not mean that legitimate financial data is discarded or frozen forever. Actual amounts may change only through the post-close financial-adjustment rules in Section 7.5.

### 7.5 Late and corrected transactions

A transaction whose authoritative budget date belongs to a completed cycle remains assigned to that cycle even when it is received, synchronized, entered, corrected, removed, or reclassified after the cycle completed.

A **post-close financial adjustment** may therefore update:

* The transaction set shown in the completed cycle
* Category and total actual amounts
* The completed cycle’s currently calculated remaining amounts
* Historical reports derived from those actual amounts

The adjustment does not:

* Reopen the completed cycle
* Change its start or end date
* Change its cadence, anchor, or schedule-version reference
* Change its planned allocations
* Modify planned allocations or remaining amounts in a later cycle
* Reclassify other transactions solely because the historical totals changed

The product records sufficient audit or history information to identify that the completed cycle changed after close, including the affected transaction and when the historical calculation changed. The completed-period view shows **current historical actuals and remaining amount**, including post-close financial adjustments. Those changes are informational and do not trigger automatic financial changes in later periods.

These rules apply equally to imported, synchronized, manually entered, deleted, corrected, and reclassified transactions, subject to the product rules governing those transaction actions.

### 7.6 Boundary-processing failure and recovery

Normal active-period progression is a dynamic date-and-schedule calculation, not a background activation workflow. When the budget is opened or its current period is requested, the product resolves the active cycle from the authoritative budget-space date and schedule version. A delayed or missed midnight job cannot leave the preceding cycle logically current.

Background work may persist period records, snapshots, audit entries, derived financial values, or other supporting artifacts. Failure of that work is not a normal intermediate period state and does not change calendar truth.

If required persisted information is temporarily unavailable or internally inconsistent such that the product cannot safely establish the complete financial state associated with the dynamically resolved cycle:

* The product treats the condition as an exceptional outage or data-integrity recovery state.
* The interface shows the dynamically correct current period dates whenever they can be calculated safely.
* Budget and historical information that can be established safely remains visible.
* Budget-modifying actions are temporarily unavailable.
* The interface displays: **“We’re updating this budget period. You can view your budget, but changes are temporarily unavailable.”**
* The interface does not ask the user to close, advance, retry, confirm, or acknowledge the period transition.
* Canonical financial-account synchronization may continue, but budget-cycle classification and budget-specific effects wait until the single correct period state can be established.
* Recovery is idempotent and cannot create duplicate, missing, or overlapping cycle records.
* Recovery is bounded and escalates automatically when normal repair does not complete; the product cannot remain indefinitely in an unqualified **Processing** state.
* When repair completes, the budget resumes normal access using the dynamically correct active cycle without user confirmation.

The detailed derivation strategy, persistence model, job design, repair mechanism, timeout, escalation, monitoring, and operational response belong in the future technical specification. This product specification requires only that ordinary boundary progression remain dynamic and that exceptional integrity failures fail safely into temporary read-only access.

## 8. Schedule-change workflow

### 8.1 Entry conditions and required inputs

#### Budget-space time-zone boundary

The budget-space time zone is displayed as read-only context throughout the schedule-change workflow. It is not a schedule-change input. Changing only the time zone does not constitute a cadence schedule change because it does not replace the weekly or monthly cadence or anchor.

A budget-space time-zone change belongs to a separate Owner/Co-owner budget-settings workflow that is required for the broader MVP but is outside the detailed workflow scope of this specification. That workflow must:

* Use a supported named time-zone selection rather than free text or a fixed UTC offset.
* Preview the current and proposed time zones, budget-space dates, active periods, next boundaries, and any change to real-world execution timing.
* Require explicit confirmation and create an attributable budget-settings audit record.
* Apply without creating a new cadence schedule version.
* Preserve completed-cycle dates and schedule-version references.
* Preserve every existing transaction’s authoritative budget date.
* Recalculate open previews and current date-dependent interface state under the newly confirmed time zone.

For the MVP, a confirmed pending future schedule change blocks a budget-space time-zone change. The settings workflow explains: **“Cancel the pending schedule change before changing this budget’s time zone.”** After cancellation and the time-zone change, the user may create a new schedule-change proposal under the new calendar context.

Conversely, the schedule-change workflow does not offer a shortcut that edits the time zone. It may link an authorized Owner or Co-owner to the separate setting when no future change is pending.

#### Existing pending future change

A budget space can have at most one confirmed pending future schedule change in the MVP. If one exists when a user enters the schedule-change workflow, the product opens the existing pending-change summary rather than a blank schedule-change proposal.

* The summary identifies the current authoritative schedule, the pending cadence and anchor, the exact effective date, and the resulting transition or first full period.
* An authorized schedule editor can choose **Edit pending change** or **Cancel pending change**.
* A user with read-only access can review the pending-change details but cannot edit or cancel them.
* The workflow does not create or allow a second proposal while the confirmed pending change exists.
* The interface explains: **“This budget already has a scheduled change. Edit or cancel it before creating another change.”**
* An authorized user may edit the effective date to the current budget-space date. After a refreshed preview and explicit confirmation, the change follows the immediate-change behavior in Section 8.3 and no longer remains pending.

The confirmation, replacement, cancellation, and audit behavior for an edited pending change is defined in Section 8.5.

#### No-change state

The workflow opens with the authoritative current cadence and anchor selected or displayed for comparison. This initial condition is a neutral **no-change state**, not an error.

While the proposed cadence and anchor exactly match the authoritative current schedule:

* No schedule-change preview is generated or displayed.
* The confirmation action is functionally unavailable.
* The final design may hide the action or display it as disabled, provided it cannot be invoked and its unavailable state is accessible.
* The interface displays: **“Choose a different cadence or anchor to preview and confirm a schedule change.”**
* No unconfirmed preview, confirmed pending change, schedule version, or audit record is created.

Once the user selects a different cadence or anchor, the workflow validates the remaining required inputs and generates the applicable preview.

If the user later restores the cadence and anchor to their authoritative current values:

* Any prior preview is removed rather than retained as stale change information.
* Confirmation becomes unavailable again.
* The interface displays: **“Your selected cadence and anchor match the current schedule. Choose a different cadence or anchor to continue.”**
* The proposal returns to the neutral no-change state and cannot be submitted.

The no-change explanation is informational. It is not a warning or validation error and requires no acknowledgement.

#### Required effective-date input

After the user selects a cadence or anchor that differs from the authoritative current schedule, the workflow requires the exact budget-space calendar date on which the change should take effect.

* The effective-date field has no default value.
* The user selects one exact date from a calendar or equivalent accessible date control.
* The current budget-space date is the earliest selectable date.
* Past budget-space dates are unavailable in the control and rejected if otherwise submitted.
* Selecting the current budget-space date creates an immediate schedule change under Section 8.3.
* Selecting any later date creates a future scheduled change under Section 8.4.
* The current budget-space date is visibly identified so the user can understand which selection produces an immediate change.
* Until a valid date is selected, no change preview is generated and confirmation is unavailable.
* The interface displays: **“Select the date this schedule change should take effect.”**

The interface does not ask the user to choose between abstract **Today** and **Future** modes. Immediate versus future behavior is derived from the exact selected date.

### 8.2 Effective-date validation

The effective date is selected and validated as a budget-space calendar date in the configured budget-space time zone. It is required and has no default.

* The earliest allowed effective date is the current budget-space date.
* Selecting the current budget-space date creates an **immediate schedule change**.
* Selecting a later date creates a future scheduled change under Section 8.4.
* A date earlier than the current budget-space date is unavailable for selection and is rejected if otherwise submitted.
* The past-date message is: **“Choose today or a future date.”**
* A viewer’s device date or time zone cannot change which dates are valid.
* Changing the budget-space time zone, new cadence, new anchor, or effective date makes the current change preview stale and requires recalculation.
* The effective date and preview are revalidated authoritatively at confirmation.

If local midnight occurs while the workflow is open and the selected date has become past, confirmation is unavailable. The product refreshes the budget-space date and displays: **“The selected effective date has passed. Choose today or a future date and review the updated preview.”** No schedule change occurs until the user confirms a valid refreshed proposal.

### 8.3 Immediate change

An immediate schedule change has an effective date equal to the current budget-space date. Confirmation executes it immediately; the product does not wait until the next local midnight.

“Effective at local midnight” defines the beginning of the effective calendar date. When the user confirms later during that date:

* The old schedule remains authoritative through the previous budget-space date.
* The old active period closes through the previous budget-space date.
* The new schedule becomes authoritative for the entire current budget-space date.
* The new full or transition period begins on the current budget-space date.
* Transactions and bills whose authoritative budget date is today are evaluated under the new schedule and period boundaries, including activity received before confirmation.
* Transactions and bills dated before today remain governed by the old schedule and are never moved merely because confirmation occurred today.
* The calendar date is never split between the old and new schedule versions.
* No pending future change remains after successful execution.

Before confirmation, the preview identifies the old-period closure, today’s new or transition period, the first full period on the new schedule, affected transactions and bills and any proration. Confirmation follows the requirements in Section 12.

If today is a natural boundary under the new cadence and anchor, Section 8.7 applies and a full new period begins without transition proration. Otherwise Section 8.6 creates the defined mid-period transition.

### 8.4 Future scheduled change

A future scheduled change has an exact effective date later than the current budget-space date. Confirmation creates one visible pending schedule change; it does not immediately replace the authoritative current schedule.

* The current schedule remains authoritative until the pending change executes on its confirmed effective date.
* The pending record preserves the confirmed cadence, anchor, effective date, preview outcome, actor, and confirmation timestamp needed to explain what is scheduled.
* The pending summary remains available from the budget schedule interface to every role with permission to view it.
* Only one confirmed pending future schedule change may exist for a budget space.
* A user cannot create a second schedule-change proposal while that pending change exists; entry follows Section 8.1.
* If an authorized user revises the pending effective date to the current budget-space date and confirms the refreshed proposal, the change executes immediately under Section 8.3.
* Future execution and local-midnight behavior are governed by Sections 8.8 and 8.9.

### 8.5 Pending-change visibility, editing, and cancellation

When a confirmed pending future schedule change exists, the schedule-change entry point opens its summary.

* Primary Owners, Co-owners, and Collaborators can access **Edit pending change** and **Cancel pending change**.
* Accountability Partners and Viewers whose current profile includes pending schedule information can view the summary without modification actions.
* Other Viewers receive only schedule information inherited through their current profile.
* No role can create a concurrent second proposal.
* Choosing **Edit pending change** begins an unconfirmed revision of the existing pending change and requires a refreshed preview before it can take effect.
* Changing the proposed effective date to the current budget-space date converts the revision into an immediate-change proposal; it becomes immediate only after the refreshed preview is explicitly confirmed.

#### Editing a pending change

Choosing **Edit pending change** creates a non-authoritative pending-change revision based on the existing confirmed pending change.

* The original confirmed pending change remains authoritative while the revision is open.
* Changing the cadence, anchor, or effective date invalidates any prior preview and requires a complete refreshed preview.
* The revision cannot replace the confirmed pending change without explicit confirmation.
* Leaving, abandoning, timing out, or encountering validation or processing failure during the revision leaves the original pending change unchanged and still scheduled.
* An abandoned or unconfirmed revision does not create a schedule version or audit event.
* On successful confirmation, the product atomically replaces the original pending configuration with the revised confirmed configuration and retains the before-and-after values in history.
* The confirmed revision remains the single pending schedule change; it does not create a concurrent second pending record.
* A confirmed revision creates an attributable **Pending change edited** audit event.
* If the revised effective date is the current budget-space date, successful confirmation executes the change immediately under Section 8.3, removes the pending state, and records both the confirmed edit and resulting execution as required by Section 13.
* If confirmation fails or returns an unresolved processing state, the original pending change remains authoritative unless and until the product can establish that the revised change committed successfully. Section 8.9 governs recovery.

#### Canceling a pending change

Choosing **Cancel pending change** requires a separate explicit confirmation that identifies the pending cadence, anchor, and effective date being removed.

* Cancellation removes only the confirmed future change.
* The current schedule remains authoritative and is not modified, versioned, closed, or regenerated.
* No replacement schedule or period is created.
* Successful cancellation creates an attributable **Pending change canceled** audit event containing the canceled values.
* After cancellation succeeds, the schedule-change entry point can open a new blank proposal.
* Leaving or dismissing the cancellation confirmation makes no change.
* If cancellation cannot be confirmed as successful, the pending change remains visible and authoritative until recovery establishes the committed state. Section 8.9 governs recovery.

### 8.6 Mid-period transition

A mid-period transition occurs when the confirmed effective date is not a natural boundary under the new cadence and anchor.

* The old schedule remains authoritative through the budget-space date immediately before the effective date.
* The old active period closes at the end of that prior date, even if this shortens the period that the old schedule originally projected.
* A short transition period begins on the exact confirmed effective date.
* The transition period ends on the calendar date immediately before the next natural boundary generated by the new cadence and anchor.
* The first full period under the new schedule begins on that next natural boundary.
* The system never moves the effective date backward to the previous new-schedule natural boundary.
* Transactions and bills dated before the effective date remain in the old period.
* Transactions and bills dated on or after the effective date are assigned using the transition and new-schedule boundaries.
* Actual transactions and bills are not prorated.
* The transition period receives only its prorated base planned allocations under Section 10.
* Positive remaining amounts and overspending from the shortened old period remain in its historical reporting and do not carry forward under the MVP rules in Section 11.

#### Required preview treatment

Before confirmation, the change preview must make the short transition period conspicuous and understandable. It must show:

* The shortened old period and its revised closing date.
* A clearly labeled **Short transition period**, including its start date, end date, and number of calendar days.
* A plain-language explanation that the short period is necessary because the selected effective date does not fall on the new schedule’s natural boundary.
* The transition period’s prorated base planned allocations and enough information to understand that they are not full-period allocations.
* The first full period under the new schedule, including its start and end dates.
* Which dates place transactions and bills in the old, transition, and first full new periods.
* A statement that the system will not move activity from dates before the selected effective date into the new schedule.

The preview must be recalculated if the cadence, anchor, effective date, budget-space time zone, or relevant budget data changes. Confirmation is unavailable while the preview is stale or cannot be calculated.

#### Example: monthly on the 1st to weekly on Monday

Assume the current schedule is monthly beginning on the 1st. On Wednesday, June 17, the user confirms an immediate change to a weekly schedule beginning every Monday.

| Dates | Result |
| --- | --- |
| June 1–16 | The existing monthly period is shortened and closes on June 16. |
| June 17–21 | A five-day short transition period begins on the exact effective date. |
| June 22–28 | The first full Monday-to-Sunday weekly period begins. |
| June 29–July 5 | The next normal weekly period follows. |

Transactions and bills dated June 16 or earlier remain in the shortened monthly period. Activity dated June 17 through June 21 belongs to the transition period, including June 17 activity received before confirmation. Activity dated June 22 belongs to the first full weekly period. The product does not backdate the weekly schedule to Monday, June 15.

### 8.7 Boundary-aligned transition

A boundary-aligned change occurs when the confirmed effective date is a natural boundary generated by the new cadence and anchor.

* The old schedule remains authoritative through the budget-space date immediately before the effective date.
* The old active period closes at the end of that prior date.
* A full period under the new schedule begins on the exact effective date.
* No transition period is created.
* No transition proration is calculated or displayed.
* The new period receives its full base planned allocations.
* Transactions and bills dated before the effective date remain in the closed old period.
* Transactions and bills dated on or after the effective date are assigned under the new full-period boundaries.
* Positive remaining amounts and overspending from the closed old period remain in historical reporting and do not carry forward under the MVP rules in Section 11.

Before confirmation, the preview must:

* Identify the old period and its closing date.
* Identify the first full new period and its complete date range.
* State: **“This change begins on a natural schedule boundary, so no short transition period or proration is needed.”**
* Show full base planned allocations for the first new period.
* Explain which date separates old-schedule activity from new-schedule activity.
* Omit transition-period rows, transition proration, and transition warnings because no transition exists.

For example, if a budget changes to weekly-on-Monday with an effective date that is Monday, June 22, the old schedule remains authoritative through Sunday, June 21. A full weekly period runs June 22–28. There is no short transition period between the schedules.

### 8.8 Execution at local midnight

A confirmed future schedule change becomes due when the configured budget-space calendar reaches the beginning of its exact effective date. Local midnight is determined by the budget space’s supported named time zone, including the time-zone rules applicable on that date.

Execution is date-driven, atomic, idempotent, and self-recovering:

* The old schedule remains authoritative through the immediately preceding budget-space date.
* At or after local midnight, one authoritative operation either commits the complete new schedule outcome or commits none of it.
* A successful outcome creates the new schedule version, closes the old version and period correctly, creates the transition or boundary-aligned period and allocations, records audit evidence, and ends the pending state together.
* Every transaction and bill with an authoritative budget date governed by the successfully executed change uses the new schedule boundaries.
* **Edit pending change** and **Cancel pending change** become unavailable when execution begins, including in already-open interfaces.
* No user session, page refresh, or additional confirmation is required.
* A stable request identity and idempotent recovery prevent duplicate schedule versions, periods, pending outcomes, confirmation records, and audit events.
* Secondary projections, caches, notifications, and reporting artifacts may reconcile after the authoritative commit but cannot determine or partially alter its outcome.

The durable authoritative outcome, rather than a worker’s **Processing** response, is the source of truth. If execution is interrupted before commit, the complete operation remains unapplied and automatic recovery retries safely. If commit succeeded but a response was lost, recovery finds and returns the existing successful outcome. The detailed transaction, locking, lease, retry, constraint, and monitoring design belongs to the future technical specification.

### 8.9 Failure and recovery behavior

Failure handling preserves one determinable schedule state and never asks the user to guess whether an action succeeded.

#### Validation and pre-submission failures

* A validation, stale-preview, authorization, or connectivity failure established before authoritative submission creates no schedule change.
* The existing active schedule and any existing confirmed pending change remain unchanged.
* The interface highlights the applicable field or condition, explains why submission cannot proceed, and retains valid user inputs where safe.
* The user may correct the proposal and submit it again after a current preview is available.

#### Durable outcome recovery

If the product loses the response to a confirmation, revision, cancellation, or execution operation, it resolves the stable request identity against the durable authoritative outcome.

* Schedule modification actions are temporarily unavailable while that lookup or automatic recovery is underway.
* The user is not asked to resubmit, contact support, or decide whether the action succeeded.
* Recovery operations are idempotent and cannot create duplicate domain or audit records.
* Recovery automatically resolves to exactly one business outcome: **Succeeded** or **Failed**.
* **Succeeded** displays the committed active or pending state and linked history.
* **Failed** confirms that the attempted authoritative changes were not committed and displays the unchanged prior authoritative state.
* A service that cannot currently reach the authoritative store shows a general temporary service-unavailable state and checks again automatically; it is not presented as an indefinitely processing schedule change.

#### Future execution failure

Transient infrastructure failures are retried automatically and are not definitive execution failures. A change is **Failed** only after the system can prove that the complete atomic outcome was not committed and the prior schedule remains authoritative.

After a definitive future execution failure:

* Normal budget access returns once integrity of the unchanged prior state is established.
* The failed pending record and audit evidence remain immutable.
* The product shows a safe failure explanation and audit reference.
* Primary Owners, Co-owners, and Collaborators may choose **Review and try again**, which creates a new immediate-change proposal prefilled from the failed change.
* The new proposal requires a current preview and explicit confirmation because its original effective date may be past and financial inputs may have changed.
* Accountability Partners see the complete failure history as financially read-only and retain permitted personal interactions; Viewers see only current-profile information.
* A permanently invalid request is never replayed automatically.

Contradictory or partial authoritative records violate atomic execution and constitute a data-integrity outage. Affected modifications remain read-only while automated repair restores one valid outcome. Operational escalation occurs automatically; the user is not responsible for recovery. Detailed service objectives and incident procedures belong to the future technical specification.

### 8.10 Cadence-neutral boundary adapter

CBD-67 governs the shared schedule-change lifecycle for every supported cadence. A cadence-specific specification may add a new schedule type only by supplying this deterministic adapter contract:

* Stable proposed cadence type and rule identity.
* Human-readable rule summary for preview, confirmation, history, and audit.
* The complete recurrence inputs and versioned calendar provenance required to reproduce boundaries.
* A function that, for any supported budget-space date, returns the natural boundary immediately before or on that date and the next natural boundary after it.
* The first three complete periods after any transition, with inclusive start and end dates.
* Validation proving that generated periods are chronological, contiguous, non-overlapping, and open-ended.
* The proposed cadence's explicitly reviewed full-period spending targets by stable category identity.

Paycheck cadence supplies boundaries from its confirmed recurring anchor schedule after business-day adjustment. One-time income-occurrence exceptions are excluded. Fixed-length custom cadence supplies boundaries from its confirmed start boundary plus integer multiples of its fixed calendar-day length.

The adapter never decides effective-date eligibility, pending-change lifecycle, transition creation, proration, no-carry-forward, permissions, confirmation, execution, history, or audit. CBD-67 remains authoritative for those behaviors.

A schedule change cannot be previewed or confirmed if the adapter cannot return complete deterministic boundaries across the preview horizon or if the proposed full-period spending targets have not been explicitly reviewed.

**Decision PD-67-09 / CBD-68 PD-68-15:** A cadence extension integrates through this boundary-and-target adapter. Existing weekly and monthly behavior is unchanged. Approved by Alexander Wohlford on August 12, 2026.

## 9. Change preview requirements

A schedule-change preview is a non-authoritative projection of the result that would be created if the currently displayed proposal were confirmed. It must let the user understand the schedule, period, allocation, transaction, and bill consequences without requiring confirmation or leaving the workflow.

### 9.1 Preview context and schedule comparison

The preview must display:

* The current authoritative cadence and cadence-specific rule summary.
* The proposed cadence and cadence-specific rule summary, including anchor or fixed-length origin where applicable.
* The configured budget-space time zone used to interpret the effective date.
* The exact effective date and whether it will execute immediately or remain pending.
* The date and time at which the preview was generated, expressed in the budget-space time zone.
* The old active period and its resulting closing date.
* The first date governed by the proposed schedule.
* Whether the change is boundary-aligned or creates a short transition.
* The first full period under the proposed schedule.
* A plain-language statement that dates before the effective date are not moved into the new schedule.

### 9.2 Period timeline

The preview presents the affected periods in chronological order:

* The old period, including its original projected dates when useful for comparison and its proposed closing date.
* The short transition period when applicable, clearly labeled with its start date, end date, calendar-day count, and reason.
* The first full new period, including its start date, end date, and full-period status.
* The first three complete periods under the proposed schedule, even when a short transition is also present.

For a boundary-aligned change, the preview explicitly states that no transition period or proration is needed and omits empty transition rows. For a mid-period change, it follows the conspicuous short-transition treatment in Section 8.6.

The preview visibly identifies the final included date. That date is the end of the third complete new-schedule period and defines the preview horizon for proposed-period item details and totals.

### 9.3 Planned-allocation impact

Before the preview is confirmable, the user must explicitly review the proposed full-period spending target for every active category. The product may prefill values for convenience, but it must not silently treat an amount from the old cadence as the intended amount for a differently sized new cadence. Prefill provenance is displayed, and the user may edit the proposed full-period targets before regenerating the preview.

The reviewed proposed-cadence targets become the base planned allocations used for the first full new period and for any transition proration. Changing one makes the preview stale.

The preview must distinguish short-transition allocations from full-period allocations and show:

* Each affected category’s base planned allocation.
* The applicable period length and proration basis.
* The calculated prorated amount for the short transition, when applicable.
* The full base planned amount for the first full new period.
* Rounding results and any allocated rounding remainder under Section 10.
* Category-level totals and overall totals that reconcile exactly to the displayed details.
* A statement that no positive or negative balance carries forward under the MVP rules in Section 11.

### 9.4 Proposed-period financial picture

The preview shows the financial picture that would result from the proposed schedule. It does not show financial totals calculated under the current schedule and does not present a single affected-item total or combined net-impact figure.

The shortened old period is displayed to explain its original dates, proposed closing date, and relationship to the effective date. It does **not** display itemized financial details or monetary totals. This avoids presenting old-schedule financial information as part of the proposed financial picture.

For every displayed transition or new-schedule period through the preview horizon, the preview includes all authorized known items assigned to that period and presents separate totals for:

* Posted and eligible pending transactions.
* Unmatched projected bill occurrences.
* Unmatched projected income occurrences.
* Planned allocations, including any applicable short-transition proration.

These categories are not combined into one net figure. The period totals come from the same authoritative preview calculation used for confirmation and cover the complete authorized item set rather than only items whose period assignment changes. Permission filtering follows Section 9.5, so restricted items never appear in details or period totals.

An **affected financial item** remains an item whose proposed budget-period assignment differs from the assignment produced by the current schedule projection. Affected status may be identified in itemized details to explain the change, including the item’s current projected period and proposed period, but the preview does not aggregate affected counts or affected monetary totals.

Transaction treatment follows these rules:

* A posted transaction is assigned using its authoritative budget date and displayed using the product’s normal transaction presentation.
* A pending bank transaction is included after it has an authoritative budget date, uses its current known amount, and is labeled **Pending** under the normal product behavior.
* If a pending transaction’s amount, authoritative budget date, or posting status changes, an unconfirmed preview becomes stale; after future-change confirmation, the informational current-impact estimate refreshes without invalidating the pending schedule.
* A transaction that the separate transaction-matching workflow has reliably matched to a projected bill or income occurrence replaces that projection in the preview, whether the transaction is posted or pending.
* The matched projection is not displayed and contributes no separate item or amount to any period total. The transaction’s date, amount, and status are used instead.
* If the reliable match is removed and the projection remains applicable within the preview horizon, the projection becomes visible again and the preview recalculates.
* CBD-67 does not define matching controls. MVP one-to-one income matching, suggestions, correction, permissions, audit, and Late/Missing/Skip behavior are governed by CBD-68 PD-68-06 and PD-68-07. Projected-bill matching, pending-transaction interaction, complex reconciliation cardinality, and advanced confidence remain FF-004. A matched transaction uses its normal business-as-usual presentation; the schedule preview adds no matching-specific label or interaction.

For recurring bills and income, the preview evaluates projected occurrences rather than counting the recurring definition itself:

* Each unmatched occurrence within the preview horizon appears as a separate item in its proposed period.
* Each occurrence has its own projected budget date and amount and is labeled **Projected** until replaced by an actual matched transaction.
* The source recurring definition may be available through normal product behavior but does not create an additional preview item or amount.
* Editing the recurring definition after a future schedule change is confirmed refreshes the informational current-impact estimate without invalidating the pending schedule.

Projected amount presentation follows these rules for both bills and income:

* An exact usable amount uses normal currency formatting.
* A usable estimated amount is italicized and prefixed with a tilde—for example, _\~$50.00_.
* If a period-category total includes one or more estimated amounts, that total is also italicized and prefixed with a tilde.
* An occurrence with no usable exact or estimated amount remains visible and displays **Amount not set**, but is excluded from the monetary total.
* The applicable period discloses missing values separately—for example, **4 projected bills · _\~$150.00_ · 1 amount not set**.
* A missing or estimated occurrence amount does not block schedule confirmation.
* Adding or changing an amount after confirmation refreshes the informational current-impact estimate without invalidating the pending schedule.

Within each proposed period, items are ordered chronologically by authoritative budget date. Items sharing a date use the product’s normal ordering. Transactions, bills, and income otherwise retain their established business-as-usual fields, formatting, status labels, grouping, and detail behavior; the preview adds only the proposed-period grouping and schedule-impact explanation.

Actual transaction amounts and projected bill or income occurrence amounts are never prorated. The preview may assign an item to a different proposed period when the effective schedule boundaries require it, but it cannot change the item’s authoritative budget date.

### 9.5 Interaction and accessibility

* Summary information is visible without expanding itemized details.
* Expanding or collapsing details does not change the proposal or preview calculation.
* The itemized view supports keyboard and assistive-technology access and does not depend on color alone to communicate changed assignments.
* Large item sets may use pagination or progressive loading, but the summary totals cover the complete authorized item set within the preview horizon rather than only affected items or the loaded page.
* The product clearly distinguishes informational explanations, validation errors, and service-impact states.
* Confirmation is unavailable until a complete, current preview has been calculated.

#### Permission-filtered visibility

* Primary Owners, Co-owners, and Collaborators receive the complete authorized preview and itemized financial-impact details and may confirm when otherwise authorized.
* Accountability Partners receive the same complete financial and schedule picture in financially read-only form and cannot confirm or modify the proposal; personal acknowledgements and attributed comments remain separately permitted.
* Viewers receive only schedule and financial information inherited through their current CBD-72 profile.
* A Viewer with schedule access but without access to transactions, bills, income, or another financial resource may see the permitted timeline but not restricted descriptions, details, counts, totals, or derived indicators.
* Restricted items are excluded from every aggregate presented to that Viewer; the interface never reveals hidden information indirectly through counts, totals, differences, or approximate values.
* When financial-impact information is unavailable because of permissions, the interface states: **Some financial impact details are not available with your current access.**
* Permission-restricted information is not represented as zero affected items. The product distinguishes unavailable information from a true authorized calculation of zero.
* A permission change refreshes the visible preview without changing the proposal or schedule.

### 9.6 Staleness and confirmation integrity

The preview becomes stale when the cadence, anchor, effective date, budget-space time zone, relevant planned allocations, affected transaction or bill data, or any other calculation input changes.

Account-synchronization freshness is distinct from preview integrity:

* If an external account is stale or temporarily unavailable but the product has a complete authoritative stored dataset and can calculate the preview completely and reliably, confirmation remains available.
* The preview identifies affected stale or unavailable account connections, displays their last successful synchronization time when known, and explains that newer external activity may not yet be represented.
* A synchronization warning is informational and does not require acknowledgement.
* If the stored budget data required by the preview is incomplete, internally inconsistent, or cannot support a complete and reliable impact calculation, confirmation is unavailable.
* Newly synchronized transactions received after a future schedule change is confirmed do not invalidate that schedule; they refresh the current-impact estimate under Section 9.7.
* A stale preview cannot be confirmed.
* The product removes or clearly marks stale results while recalculating.
* Confirmation revalidates the proposal and preview inputs authoritatively.
* If authoritative data changed after preview generation, confirmation is unavailable until the product presents a refreshed preview.
* Successful confirmation creates the compact immutable confirmation record defined in Section 9.7.
* Generating, expanding, abandoning, or refreshing a preview creates no schedule version, confirmation record, or audit event by itself.

### 9.7 Confirmed record and current impact

Successful confirmation creates one **compact immutable confirmation record** containing the material facts the authorized user reviewed:

* Current and proposed cadence and anchor.
* Exact effective date and budget-space time zone.
* Old-period closure, transition-period, and first-full-period boundaries.
* Proration inputs, calculation-rule version, reconciled category results, and totals presented at confirmation.
* The separate transaction, projected-bill, projected-income, and planned-allocation totals for each proposed period presented at confirmation, including pending-transaction and missing-amount disclosures.
* References to reassigned financial items where needed to explain or audit the result, without duplicating their complete records.
* Preview generation timestamp, confirmation timestamp, and confirming actor.

The record is not a screenshot, rendered copy of the interface, or duplicate store of full transaction and bill details. Later corrections, removals, or additions to financial data do not rewrite the record; those items continue to use their normal authoritative records and audit histories.

For a confirmed future schedule change:

* Preview staleness no longer applies after confirmation.
* Transactions received, bill or income occurrences projected, and planned allocations changed after confirmation do not invalidate the pending schedule or require schedule reconfirmation.
* The pending-change summary may calculate a refreshed **Current impact estimate** using the latest known financial data.
* The current impact estimate is clearly labeled as informational and distinguished from the amounts known at confirmation.
* Refreshing that estimate does not replace the compact immutable confirmation record or create a schedule version or audit event.
* At execution, all then-current financial data is treated using its authoritative budget dates, the confirmed schedule boundaries, and the applicable calculation rules.
* Only an authorized change to the pending cadence, anchor, or effective date creates a pending-change revision that requires a new preview and explicit confirmation under Section 8.5.

The compact immutable confirmation record remains complete and authoritative as stored, but every presentation and current-impact estimate is filtered using current permissions. Owners may view the complete record, Collaborators receive CBD-12 detail, and Partners receive it as financially read-only while retaining separate personal interactions. Viewers see only current-profile information; restricted references, counts, totals, and derived indicators are withheld, and output requiring incomplete inputs is unavailable.

### 9.8 Preview-horizon example

Assume an immediate change on Wednesday, June 17 from monthly-on-the-1st to weekly-on-Monday.

| Timeline row | Dates | Treatment |
| --- | --- | --- |
| Shortened old monthly period | June 1–16 | Closes the day before the effective date. |
| Short transition period | June 17–21 | Receives five days of prorated weekly base allocations. |
| First full weekly period | June 22–28 | Receives full weekly base allocations. |
| Second full weekly period | June 29–July 5 | Receives full weekly base allocations. |
| Third full weekly period | July 6–12 | Receives full weekly base allocations. |

The preview states: **“Period totals include authorized known items dated through July 12. Items dated after July 12 will follow the new weekly schedule but are not included in this preview.”**

Each displayed period shows all authorized known items assigned to it, with separate transaction, unmatched projected-bill, unmatched projected-income, and planned-allocation totals. No old-schedule financial totals, combined net-impact figure, or aggregate affected total is shown.

For a boundary-aligned change, the short-transition row is omitted. The old period and first three complete new-schedule periods remain visible, and the third full period’s end date remains the horizon cutoff.

## 10. Proration rules

Proration applies only to base planned allocations for a short transition period. It does not prorate actual financial activity or apply to a boundary-aligned full period.

### 10.1 Formula

For each affected category:

`exact transition allocation = base planned allocation × transition calendar days ÷ proration-basis-period calendar days`

The **proration basis period** is the complete natural period returned by the proposed cadence adapter that contains the transition dates. It begins at the new schedule’s natural boundary immediately before or on the effective date and ends the day before the next natural boundary. Its base planned allocation is the explicitly reviewed full-period target for the proposed cadence, not an automatically frequency-converted amount from the old cadence. The effective date itself is not moved backward; the earlier portion is used only to establish the denominator.

Calendar days are inclusive:

* Transition calendar days include every date from the effective date through the day before the next new-schedule natural boundary.
* Basis-period calendar days include every date in the complete natural period.
* Weekly schedules always use seven basis days.
* Monthly schedules use the actual number of calendar days between their applicable natural boundaries, so the denominator may vary with month length, leap years, and anchor rules.
* Paycheck schedules use the actual number of calendar days between the applicable adjusted recurring anchor boundaries.
* Fixed-length custom schedules use the confirmed fixed calendar-day length.
* Time-zone offsets and daylight-saving changes do not add or remove a calendar day from either count.

Examples:

* Weekly-on-Monday effective Wednesday with a Wednesday–Sunday transition: `base weekly allocation × 5 ÷ 7`.
* Monthly-on-the-1st effective June 17 with a June 17–30 transition: `base monthly allocation × 14 ÷ 30`.

Calculations retain precision beyond the supported currency unit until the reconciliation step. The exact overall transition total uses **half-up midpoint rounding** to the budget currency’s supported precision. When the discarded digits are exactly half of the smallest supported currency unit, the retained magnitude increases by one unit; for example, USD 10.005 becomes USD 10.01. The same rule applies consistently in previews, confirmation, authoritative storage, history, audit, and recalculation.

### 10.2 Category allocations and largest-remainder reconciliation

The product calculates an exact unrounded transition amount for every category with a base planned allocation.

1. Calculate each category’s exact transition allocation using Section 10.1.
2. Sum those exact category amounts to obtain the exact overall transition total.
3. Round the overall total once to the budget currency’s supported precision using half-up midpoint rounding.
4. Express each exact category amount in smallest currency units and initially assign only its whole-unit portion.
5. Compare the sum of initially assigned category units with the rounded overall target.
6. Assign the remaining smallest currency units one at a time to categories in descending order of fractional remainder until the category sum equals the target.
7. If fractional remainders are equal, use a stable category identifier as the final deterministic tie-breaker; display order, category name, or calculation timing cannot affect the result.

The final displayed and stored category allocations must sum exactly to the rounded overall transition total. The preview shows the final reconciled currency amounts rather than presenting unrounded values as spendable allocations. Sufficient calculation inputs are retained for audit and reproducibility.

A category with a zero base allocation receives zero. The formula cannot create an allocation for a category that has no base planned amount.

### 10.3 Transactions and bills

Actual transactions and bills are never prorated.

* Their amounts remain unchanged.
* Their authoritative budget dates remain unchanged.
* They are assigned to the old, transition, or new full period according to their date and the confirmed schedule boundaries.
* A recurring bill or income schedule may project an occurrence into a different proposed period, but the occurrence amount is not multiplied by the transition fraction.
* Any future product rule for splitting or estimating scheduled financial items requires separate specification and cannot be inferred from planned-allocation proration.

### 10.4 Boundary-aligned changes

When the effective date is a natural boundary under the proposed cadence and anchor:

* No transition period exists.
* No proration formula or rounding reconciliation runs.
* The first new period receives full base planned allocations.
* The preview explains that no proration is needed and does not display zero-valued transition calculations.

### 10.5 Pending changes, execution inputs, and integrity

Changing any allocation, cadence, anchor, effective date, budget-space time zone, currency precision, or other proration input before confirmation makes the preview stale. Confirmation requires a refreshed calculation.

For a pending future schedule change:

* The compact immutable confirmation record preserves the allocation inputs and results presented when the schedule change was confirmed.
* Later base planned allocation changes do not invalidate the pending schedule or require schedule reconfirmation.
* The pending-change view refreshes its informational current-impact estimate using the latest authoritative base planned allocations.
* At execution, the product authoritatively revalidates the schedule and uses the latest authoritative base planned allocations, currency precision, boundaries, and calculation rules applicable to that execution.
* The created transition allocations may therefore differ from the original confirmation record; the execution audit records the authoritative inputs and results actually used.

For an immediate schedule change, the latest inputs are authoritatively revalidated at confirmation acceptance and used atomically to create the transition period. Preview, confirmation, execution, storage, and audit must use the same defined formula, precision, rounding, and reconciliation behavior for a given input set.

### 10.6 Base-allocation changes during an active transition

Once a schedule change has activated, users cannot directly edit the transition period’s planned allocations. They edit the normal full-period spending targets for the active cadence through the existing target workflow.

When one or more base planned allocations are saved while the transition period is active, an authorized user must explicitly choose one of these options:

* **Recalculate transition allocations** — replace the complete transition allocation set using all current base planned allocations and the formula and reconciliation rules in Sections 10.1 and 10.2.
* **Keep current transition allocations** — save the base planned allocation changes for later full periods without changing the active transition allocations.

Neither option is selected by default. Cancelling the choice saves neither the proposed base changes nor any transition change. Batched base-allocation edits produce one choice at save rather than one prompt per category.

Before the user confirms recalculation, the product shows:

* The affected active transition period.
* Every category’s current transition allocation and proposed recalculated allocation.
* The resulting available amount after existing spending.
* The current and recalculated transition totals.
* An explanation that complete-set reconciliation may change an otherwise untouched category by the smallest supported currency unit.

If **Recalculate transition allocations** is selected:

* The product recalculates every category, not only categories whose base allocation changed.
* Base-allocation changes and the complete transition recalculation succeed atomically or remain unapplied.
* A validation or calculation failure saves neither result, identifies the cause and applicable fields, and permits retry.
* Recalculation changes only planned category allocations. It never changes transaction, bill, or income amounts, dates, assignments, statuses, or spending totals.
* Existing financial activity remains assigned normally and is reflected in each category’s resulting available amount.

If **Keep current transition allocations** is selected, the base planned allocations are saved and the transition allocations remain exactly as they were.

The same choice applies when a category is added, archived, or given a zero base allocation during an active transition:

* Recalculation adds a new category’s prorated allocation or reduces an archived or zero-base category’s transition allocation to zero, then reconciles the complete set.
* Keeping the transition unchanged gives a new category no planned allocation in that transition and preserves any existing transition allocation for an archived or zero-base category.
* Archiving or removing a base allocation never erases the category’s historical allocations or assigned financial activity, and the category remains visible wherever required to explain the active or historical period.

Base planned allocations may be zero or positive during the MVP. Negative base planned allocations are invalid and do not enter proration or reconciliation.

### 10.7 Active window, concurrency, permissions, and audit

The recalculation choice is available through the transition period’s inclusive end date, determined by the budget-space date and configured budget-space time zone. It becomes unavailable at local midnight immediately after the transition ends.

The product revalidates that the transition is still active when the user confirms. If the period ended while the choice or preview was open:

* The historical transition is not recalculated.
* The product does not silently save the base changes under different behavior.
* It explains that the transition ended, refreshes the workflow, and lets the user explicitly save the base changes for future full periods only.

Only a role already authorized to change base planned allocations can make the choice or recalculate the transition. Accountability Partners remain financially read-only with personal acknowledgements and attributed comments separately permitted, Viewers remain limited to current-profile information, and the MVP introduces no separate transition-recalculation permission.

An accepted transition recalculation creates an allocation-change audit record containing the actor, timestamp, transition period, previous and recalculated allocations, base-allocation inputs, proration and rounding rule version, and explicit recalculation choice. It does not create a schedule version or rewrite the original schedule-change confirmation record.

Choosing **Keep current transition allocations** records the base-allocation changes through the normal allocation audit behavior and records that the authorized user intentionally left the active transition unchanged.

## 11. MVP balance disposition and deferred rollover

Balance rollover and carry-forward are outside the Private MVP and are tracked in the future-feature register.

For every normal boundary and schedule change during the MVP:

* Positive remaining amounts stay in the completed or closed cycle’s historical reporting.
* Overspending stays in the completed or closed cycle’s historical reporting.
* No positive or negative amount is transferred automatically or through a rollover or carry-forward action into a transition or later cycle.
* A transition period begins with only its prorated base planned allocations.
* A boundary-aligned full period begins with only its base planned allocations.
* The schedule-change workflow does not request a rollover choice.
* Previews and confirmations do not show a rollover estimate, category match, or carry-forward result.
* Post-close financial adjustments update only the historical cycle’s actuals, remaining amount, and adjustment history; they never alter a later cycle’s allocations or balance.

An authorized user may independently edit a later cycle’s base planned allocations after observing a historical surplus or overspend. That edit remains a normal allocation decision: the product does not calculate, suggest, automatically populate, link, or label the amount as rollover or carry-forward, and normal allocation audit behavior applies.

The product may show an informational notice that post-close activity changed historical reporting. Such a notice is not required, cannot change a later cycle, cannot suggest a compensating allocation or rollover action, and does not require acknowledgement.

Future rollover support requires a separate specification covering normal boundaries, schedule changes, category mapping, provenance, corrections, audit, and historical reconciliation.

## 12. Confirmation requirements

Confirmation is a final review state reached only after the product has generated a complete, current schedule-change preview. It allows an authorized schedule editor—Primary Owner, Co-owner, or Collaborator—to deliberately authorize the displayed schedule decision. For a future change, confirmation fixes the cadence, anchor, effective date, transition boundaries, and applicable calculation behavior without freezing mutable financial data.

### 12.1 Required review content

The final review must show, without requiring the user to return to an earlier step:

* The current authoritative cadence and cadence-specific rule summary.
* The proposed cadence and cadence-specific rule summary.
* The configured budget-space time zone.
* The exact effective date.
* Whether the change will apply immediately or remain pending until a future date.
* The old period and its resulting closing date.
* The short transition period and prorated allocation total, when applicable.
* The first full new period and its full base planned allocation total.
* The boundary-aligned explanation when no transition or proration is required.
* The proposed resulting period timeline and the separate transaction, unmatched projected-bill, unmatched projected-income, and planned-allocation totals for every displayed period.
* All authorized known items included in those proposed periods, with access to the expandable period details and normal product presentation defined in Section 9.
* No old-schedule financial totals, aggregate affected total, or combined net-impact figure.
* A statement that actual transaction and bill amounts and authoritative budget dates are not changed by proration.
* A statement that positive remaining amounts and overspending do not carry forward under the MVP rules in Section 11.

The values and impact displayed here must come from the same current preview calculation being reviewed. For a future change, the final review also shows: **Period amounts may update before this schedule change takes effect.** The compact immutable confirmation record preserves the financial picture reviewed at confirmation, while later authoritative financial changes may refresh the current-impact estimate and execution uses the latest applicable inputs under Sections 9.7 and 10.5.

### 12.2 Contextual confirmation action

The final action label depends on the exact effective date:

* **Apply schedule change** when the effective date is the current budget-space date.
* **Schedule change** when the effective date is later than the current budget-space date.

The final review does not require a separate checkbox, typed phrase, warning acknowledgement, or second confirmation dialog. Activating the applicable contextual action is the explicit confirmation.

The action is functionally unavailable when:

* The user lacks permission.
* The proposal is in the no-change state.
* A required input is missing or invalid.
* The preview is incomplete, stale, or recalculating.
* A conflicting pending change or recovery state prevents submission.
* The selected date became past while the review was open.

If the selected effective date becomes past while the final review is open, the product does not shift it automatically. It stops confirmation, explains that the date has passed, returns the user to effective-date selection, and requires an explicit valid date and a newly generated preview.

The interface explains the applicable reason and does not rely on disabled styling alone.

### 12.3 Authoritative revalidation

Immediately before committing, the product revalidates:

* The actor’s current permission.
* The current budget-space date and time zone.
* The current authoritative schedule and pending-change state.
* The proposed cadence, cadence-specific rule inputs, reviewed full-period targets, and exact effective date.
* Every schedule boundary and proration input.
* Relevant planned allocations, posted and pending transactions, projected bills, and projected income.
* The integrity and freshness of the preview being confirmed.

Account-synchronization freshness is revalidated separately from preview integrity. If synchronization is stale but the authoritative stored dataset remains complete and supports a reliable preview, the final review retains the informational freshness notice and last successful synchronization time when known; confirmation remains available and no acknowledgement is required. Incomplete stored data or an incomplete or unreliable calculation blocks confirmation.

If any authoritative input changed, the product does not commit the change. It generates or requires a refreshed preview and explains that the schedule impact must be reviewed again.

### 12.4 Commit behavior

Confirmation is atomic and idempotent.

For an immediate change:

* Successful confirmation creates the new schedule version and makes it authoritative for the entire current budget-space date under Section 8.3.
* It closes the old period through the previous date and creates the applicable transition or boundary-aligned period.
* No pending future change remains.

For a future change:

* Successful confirmation creates the single confirmed pending schedule change defined in Section 8.4.
* It also creates the compact immutable confirmation record defined in Section 9.7, preserving the schedule and financial picture reviewed at confirmation.
* The current schedule remains authoritative until the selected effective date.
* No future period becomes active merely because the change was scheduled.

Repeated activation, retry, or delivery of the same confirmation cannot create duplicate schedule versions, periods, pending records, or audit events. If the commit outcome cannot be established, Section 8.9 applies.

### 12.5 Navigation and success states

* **Back** returns to the editable proposal and invalidates the current final-review state if an input changes.
* **Cancel** or leaving the workflow creates no schedule change and preserves the current authoritative state.
* After an immediate success, the product shows the new active schedule, active transition or full period, and effective date.
* After a future success, the product shows the pending-change summary, exact effective date, and permitted edit or cancel actions.
* Success messaging distinguishes **“Schedule change applied”** from **“Schedule change scheduled.”**
* The success state provides access to relevant schedule history and audit information according to the user’s role.

## 13. History, schedule versions, and audit

### 13.1 Schedule-version creation and effective intervals

A schedule version represents only a schedule configuration that became authoritative and governed the budget. It is not created for a merely proposed, pending, revised, cancelled, or failed future configuration.

* Initial schedule confirmation creates the first schedule version.
* A successful immediate schedule change creates a new schedule version when the confirmation commits.
* Confirming a future change creates a stable pending-change record, its initial immutable confirmed revision, and a compact immutable confirmation record, but no schedule version.
* Confirming an edit to a pending change creates a new immutable pending-change revision, not a schedule version.
* Cancelling a pending change creates no schedule version.
* Successful future execution creates the new schedule version from the exact confirmed pending revision that executed.
* A budget time-zone-only change creates no schedule version.

Each version has an inclusive effective start date and either an inclusive effective end date or an open-ended current interval. When a new version becomes authoritative, the prior version ends on the preceding budget-space date.

For a mid-period change:

* The shortened old period retains the old schedule-version reference.
* The transition period begins on the effective date and references the new schedule version.
* Every subsequent complete period generated by that schedule references the new version.

For a boundary-aligned change, the first complete new period begins on the effective date and references the new version.

Every resulting schedule version links to the action that created it. A version created by future execution references the stable pending-change ID, exact confirmed revision, confirmation record, and execution audit event.

### 13.2 Historical-period integrity

When a period becomes completed:

* Its inclusive start and end dates are immutable.
* Its governing schedule-version reference is immutable.
* Its final planned category allocations are immutable.
* Its completed lifecycle state is not reversed by later financial activity.

Actual amounts remain derived from authoritative financial items and may change through a late, corrected, removed, or reclassified transaction. A post-close financial adjustment:

* Updates the completed period’s latest authoritative actual and remaining amounts.
* Does not reopen the period or change its boundaries, planned allocations, or schedule version.
* Does not change a later period under the MVP no-rollover rules.
* Creates append-only adjustment evidence containing before-and-after values, actor or external source, authoritative UTC timestamp, budget-local timestamp and time zone, and the applicable reason or source classification.

Historical reporting shows the latest authoritative actual amounts and preserves the adjustment history without requiring a duplicate close-time snapshot of every transaction.

### 13.3 Common audit-event envelope

Every schedule-related audit event contains:

* A unique event ID and budget-space ID.
* Event type and resulting lifecycle state or definitive outcome.
* Actor identity, or **System** for automatic execution.
* Authoritative UTC timestamp.
* Budget-local date and time plus the named time-zone identifier used.
* Applicable schedule-version, pending-change, confirmed-revision, compact-confirmation-record, period, and settings references.
* Request or correlation ID used for idempotency, recovery, and linking one user decision to its resulting lifecycle event.
* Relevant before-and-after values without duplicating full financial records.

Events produced by one atomic action share a correlation ID. Repeated delivery or retry of the same action cannot create duplicate audit events.

### 13.4 Required events and event-specific data

| Event | Actor | Required event-specific data |
| --- | --- | --- |
| Schedule created | Confirming authorized schedule editor | Initial schedule version; cadence; anchor; budget-space time zone; initial active-period boundaries; weekly or monthly classification; creation request/correlation ID; confirmation timestamp; resulting active state. No before-schedule value exists. |
| Change confirmed | Confirming authorized schedule editor | Current authoritative version; proposed cadence and anchor; exact effective date and time zone; immediate or future classification; confirmation-record reference; preview generation timestamp; proposed old-period closure, transition, and first-full-period boundaries; confirmed proration inputs and results; correlation to the resulting scheduled or executed event. |
| Change scheduled | System | Pending-change ID; initial confirmed revision; effective date; proposed cadence and anchor; unchanged current authoritative version; pending lifecycle state; confirmation-record reference; correlation to Change confirmed. No future schedule version exists. |
| Pending change edited | Authorized schedule editor who confirmed the revision | Pending-change ID; prior and new immutable confirmed revisions; before-and-after cadence, anchor, effective date, and preview/confirmation references; whether the revision remains future or executes immediately. |
| Pending change cancelled | Authorized schedule editor who explicitly confirmed cancellation | Pending-change ID and cancelled confirmed revision; cadence; anchor; effective date; confirmation-record reference; cancelled lifecycle state; unchanged current authoritative version. No cancellation reason is requested or stored for the MVP. |
| Change executed | System | Pending-change ID and exact confirmed revision when applicable; old and new schedule versions; authoritative execution inputs; created or closed period boundaries; proration inputs and final results; resulting active state. |
| Change execution failed | System | Pending-change ID and confirmed revision; safe failure category; definitive failed state; unchanged authoritative schedule version; recovery correlation. Temporary retries and indeterminate attempts are operational recovery data rather than separate user-facing audit events. |
| Budget time zone changed | Authorized settings actor | Previous and new named time zones; resulting budget-space date; related pending-change reference when applicable. This is a settings event and creates no schedule version. |
| Transition allocations recalculated | Actor authorized to change base planned allocations | Transition period and governing schedule version; previous and recalculated allocations; base-allocation inputs; proration and rounding rule version; explicit recalculation choice. |
| Transition allocations kept unchanged | Actor authorized to change base planned allocations | Transition period and governing schedule version; saved base-allocation changes; explicit choice to preserve current transition allocations. |
| Post-close financial adjustment | Authorized actor or identified external source | Completed period and governing version; affected financial reference; before-and-after actual and remaining amounts; adjustment source classification. |

Schedule creation and its matching audit evidence commit atomically. A future confirmation creates linked **Change confirmed** and **Change scheduled** events. An immediate confirmation creates linked **Change confirmed** and **Change executed** events. Only a successfully confirmed pending revision creates **Pending change edited**; opening, previewing, or abandoning the edit workflow creates no event.

Successful future execution creates one idempotent **Change executed** event only after the atomic outcome succeeds. Temporary retries or an indeterminate confirmation state do not create duplicate user-facing history. A definitive failed lifecycle outcome creates one **Change execution failed** event.

### 13.5 History presentation and permissions

History distinguishes:

* **Schedule versions** — only configurations that became authoritative, ordered by effective date with their effective intervals.
* **Schedule-change activity** — confirmations, future scheduling, pending revisions, cancellations, execution, and definitive failure events.

A completed period links directly to the schedule version that governed it. An executed pending change links both ways between its final confirmed revision and the resulting schedule version.

Primary Owners and Co-owners receive complete authorized history. Collaborators receive the schedule history and financial detail permitted by CBD-12. Accountability Partners receive the complete history as financially read-only and retain separate personal acknowledgement/comment interactions. Viewers receive only history inherited through the current profile; restricted details, counts, summaries, and derived indicators cannot reveal hidden information.

### 13.6 Immutability and corrections

Schedule versions, confirmed pending revisions, compact confirmation records, and audit events are immutable and append-only through product workflows.

* Existing records cannot be edited or deleted to correct history.
* A correction creates a new linked correction or domain event describing the changed authoritative fact.
* A schedule configuration change creates a new version only when it becomes authoritative.
* A post-close financial adjustment updates current historical reporting through its own before-and-after event.
* History never silently rewrites an actor, timestamp, boundary, version reference, confirmed decision, or prior event.

### 13.7 Retention and long-lived budgets

Schedule versions, period history, confirmed pending revisions, compact confirmation records, and audit events remain available for the life of the budget, including while it is archived. A budget may remain in use for decades.

Older history may move to lower-cost archival storage, but archival must not change its meaning, user-authorized accessibility, referential links, ordering, or integrity. The product must preserve sufficient normalized values and rule-version references to interpret history without depending on an obsolete external provider response.

Archiving a budget does not delete or rewrite its history. Permanent budget or account deletion, anonymization, backup expiration, user export, litigation holds, and legally required retention are governed by a separate data-retention specification and applicable law.

## 14. Interface-state implications

Interface behavior is determined by two independent dimensions:

* The **authoritative schedule state**, which identifies the durable schedule configuration and pending or recovery condition that governs the budget.
* The **schedule workflow state**, which identifies what the current user is viewing, editing, previewing, or confirming.

A temporary workflow never replaces authoritative state until its confirmation succeeds. Multiple users may have different workflow states while the budget retains one authoritative schedule state.

### 14.1 Authoritative schedule states

| State | User-visible content | Role-appropriate actions | Exceptional behavior |
| --- | --- | --- | --- |
| Pre-creation unconfigured | Schedule inputs required to create the budget; no budget ID, period, or schedule version yet | Continue setup, preview, Back, or Cancel | Cancelling or abandoning creates no budget. |
| Active | Current cadence and anchor; active-period dates and status; next natural boundary; budget time zone; transition status when applicable; history access | Primary Owners, Co-owners, and Collaborators may start a schedule change; Accountability Partners have complete financially read-only access with personal acknowledgements/comments separately permitted; Viewers receive current-profile access | If the active period cannot be established reliably, retain safe visible information and enter read-only integrity recovery. |
| Active with pending future change | Complete current authoritative schedule plus a visually separate pending summary with cadence, anchor, effective date, time zone, transition outcome, current-impact estimate, and confirmed revision | Primary Owners, Co-owners, and Collaborators may edit or cancel the pending change; other independent schedule changes are unavailable; read-only roles follow their permissions | The current schedule remains authoritative until successful execution. |
| Executing | **Applying schedule change**, effective date, and last safely established schedule information | Viewing remains available where consistent; modification actions are temporarily unavailable; no second Apply or manual retry action exists | The durable request outcome resolves automatically to Succeeded or Failed; a worker Processing status is never authoritative. |
| Failed execution | Unchanged prior authoritative schedule; failed change summary; safe explanation and audit reference | Primary Owners, Co-owners, and Collaborators may choose **Review and try again**; read-only roles see permitted history | Retry opens a new immediate proposal and requires a current preview and confirmation. |
| Integrity recovery or service unavailable | Last safe schedule information plus a clear explanation of temporarily unavailable actions | Safe read-only viewing and automatic refresh where possible | Never masquerades as an empty budget or indefinite schedule processing state. |

An existing persisted budget without an authoritative schedule is not a normal empty state. It is a data-integrity recovery state, and affected budget modifications remain read-only until the invariant is restored.

### 14.2 Schedule workflow states

| Workflow state | Required behavior |
| --- | --- |
| Viewing | Show the applicable authoritative schedule state and only role-authorized actions. |
| Editing initial setup | Collect the schedule and required budget creation inputs; no authoritative budget exists yet. |
| Previewing initial setup | Show the non-authoritative setup preview from Sections 5–6 and keep creation unavailable until it is complete and current. |
| Editing schedule change | Keep the authoritative schedule visibly distinct from the unconfirmed proposal and label the proposal as not applied. |
| No change | When proposed cadence and anchor equal the current schedule, generate no preview, keep confirmation unavailable, and explain that no schedule settings changed. Restoring edited values to current values returns here and removes the prior preview. |
| Preview loading or recalculating | Preserve valid proposal inputs, mark or remove stale results, and keep confirmation unavailable. |
| Preview current | Show the complete permission-filtered proposed-period preview from Section 9 and permit final review when all validation succeeds. |
| Reviewing confirmation | Show Section 12 content and the contextual confirmation action; Back and Cancel preserve authoritative state. |
| Editing pending revision | Keep the existing confirmed pending revision authoritative until the new revision is confirmed. |
| Cancelling pending change | Require the explicit cancellation confirmation defined in Sections 8 and 13; no reason field is shown. |

Back, Cancel, workflow abandonment, validation failure, preview failure, and stale-preview recalculation create no schedule version, pending record, confirmation record, or audit event. The authoritative schedule and confirmed pending revision remain unchanged.

### 14.3 Active-state content and settings boundaries

A normal active view shows:

* Current cadence and anchor.
* Active-period inclusive dates and lifecycle status.
* Next natural boundary.
* Current transition status when applicable.
* The configured budget-space time zone as read-only schedule context.
* Access to the governing schedule version and schedule-change activity according to role.

The budget time zone is an overall budget setting, not a schedule field. It is selected as a required input during initial budget creation and can later be changed only through the separate budget-settings workflow. A time-zone change creates no schedule version. If another session changes it while a schedule workflow is open, the preview becomes stale and must be regenerated.

The schedule no-change comparison evaluates cadence and anchor. An effective date controls timing but cannot turn an otherwise identical cadence and anchor into a schedule change.

### 14.4 Pending and concurrent workflow behavior

The current authoritative schedule and a confirmed future change are never blended into one unlabeled configuration. The pending summary is visually separate and does not imply that future periods are already active.

Only one pending future change is supported during the MVP. Starting another independent change is unavailable with an explanation. Editing produces an unconfirmed revision; abandoning it preserves the existing confirmed revision.

If another authorized schedule editor changes the authoritative schedule or pending revision while a workflow is open:

* The product detects the version or confirmed-revision mismatch.
* The open preview and final review become stale and cannot be confirmed.
* The interface explains that the schedule changed elsewhere and refreshes the newest authoritative state.
* Entered values may remain only as non-authoritative comparison input when safely compatible.
* A new preview is required, and the newer confirmed change is never overwritten automatically.

### 14.5 Execution outcomes and failure recovery

Schedule execution provides a product-level guarantee of one complete outcome. The interface does not ask the user to interpret a timeout, retry an unknown commit, or contact support to establish whether execution succeeded.

* **Succeeded** refreshes to the new active schedule, created period, and linked history.
* **Failed** refreshes to the proven unchanged prior schedule and the recovery actions in Section 8.9.
* **Service unavailable** means the authoritative store cannot currently be reached; the product checks again automatically and does not label the schedule outcome as indefinitely Processing.

The future technical specification must define the atomic transaction, stable request identity, locking, uniqueness, idempotency, automatic retry, and recovery mechanisms that satisfy this user-visible guarantee.

### 14.6 Empty, restricted, and unavailable information

The interface must distinguish:

* **True empty** — the authorized calculation completed and no known transaction, projected bill, or projected income is assigned to the period. Valid zero totals may be shown.
* **Permission-restricted** — financial information exists or may exist but the current Viewer lacks access.
* **Unavailable or incomplete** — the product cannot reliably retrieve or calculate required information.

Permission-restricted content appears as one **masked restricted section** rather than individual masked rows:

* Show **Restricted** or an equivalent masked treatment.
* Reveal no description, row count, item count, monetary total, difference, approximate value, or derived indicator.
* Do not let the number of placeholders reveal the number of hidden items.
* If access is partial, show authorized items normally plus one consolidated masked block for everything else.
* State: **Some financial impact details are not available with your current access.**
* Accountability Partners continue to receive the complete financially read-only view and retain permitted personal acknowledgements and attributed comments.

Unavailable or incomplete required data is not displayed as empty or restricted and blocks confirmation. The interface explains the calculation or service state.

### 14.7 Validation, retry, permission, and accessibility behavior

For validation errors:

* Preserve entered proposal values.
* Highlight every invalid field and explain the correction required.
* Provide an accessible error summary that links or moves focus to each field.
* Keep preview and confirmation unavailable until validation succeeds.

A temporary preview-calculation failure retains the valid proposal and provides **Try again**. Retry recalculates only the preview and never implies that the schedule changed.

Permissions are revalidated before preview generation and confirmation. If the user loses edit permission while a workflow is open:

* End the modification workflow and show current authoritative state read-only.
* Do not preserve or publish the proposal as a draft.
* Create no durable schedule or audit record.
* Refresh financial visibility using the new permissions and masking rules.
* If permission returns later, require a new workflow from current authoritative data.

State, error, masked, loading, success, and recovery communication cannot rely on color alone and must expose meaningful text and status to assistive technology.

## 15. Data-model implications

This section defines the conceptual domain records, meanings, relationships, lifecycle, and invariants required by the product behavior. It does not prescribe database tables, column types, indexes, partitioning, API payloads, transaction syntax, job infrastructure, or a storage vendor. Those decisions belong to the future technical specification.

### 15.1 Core schedule and period model

Each budget has one continuous **schedule lineage** and one current authoritative schedule-version reference.

| Logical record | Product meaning and essential information |
| --- | --- |
| Budget space | Stable budget identity; current authoritative schedule-version reference; current named time-zone setting; one authoritative currency and supported precision context; role and account-scope relationships. |
| Schedule version | Immutable authoritative cadence, anchor, inclusive effective start date, inclusive effective end date or open current interval, budget reference, and originating confirmation or execution references. Only a configuration that became authoritative receives a version. |
| Budget period | One authoritative inclusive date interval linked to exactly one budget and schedule version; lifecycle state; complete, shortened-old, or transition classification; origin; final period-allocation references; and transition calculation context when applicable. |
| Projected period | Transient preview-only dates and calculations. It is disposable derived data and is not authoritative history. |
| Pending schedule change | Stable identity belonging to one budget; lifecycle state; and current confirmed-revision reference. It remains outside the authoritative schedule lineage until successful execution. |
| Confirmed pending revision | Immutable proposed cadence, anchor, effective date, time-zone context, confirmation-record reference, prior-revision relationship, and status within one pending change. |
| Compact confirmation record | Immutable material facts reviewed and authorized for an immediate change, initial future change, or confirmed pending revision, as defined in Section 9.7. |
| Schedule operation | Stable request identity; operation type; target budget or pending change; lifecycle status; one durable Succeeded or Failed outcome; and links to confirmation, versions, periods, and audit events. |
| Audit event | Append-only event using the common envelope and event-specific fields in Section 13. |

A pending, revised, cancelled, or definitively failed future configuration never receives a schedule version. Successful future execution atomically adds the resulting version to the budget’s lineage and updates the current-version reference.

### 15.2 Authoritative period creation and projection

Authoritative periods are created as they become current:

* Initial budget creation creates the complete current anchored period.
* At a normal boundary, the next complete period becomes authoritative and the prior period becomes completed.
* Confirming a future change creates no authoritative future periods.
* Setup and schedule previews calculate projected periods without making them authoritative.
* At schedule execution, the product atomically closes or shortens the active old period and creates the transition or boundary-aligned new period.
* A shortened old period retains its old version; the transition or boundary-aligned new period references the new version.
* Completed periods are never deleted or rewritten by a later schedule change.

An implementation may precompute or cache projected future periods, but they remain disposable derived data. They may be invalidated and regenerated without audit and cannot be referenced as completed history.

### 15.3 Category, base-allocation, and period-allocation model

Each category has a stable, non-reusable budget-scoped identity.

* Renaming does not change identity.
* Archiving preserves historical references.
* Reusing an archived name creates no identity reuse.
* Largest-remainder ties use the stable identity rather than name, display order, or timing.
* Category merging and remapping are outside this specification.

A **base planned allocation** and a **period allocation** are distinct:

* A base planned allocation expresses the category’s normal zero-or-positive plan for one complete cadence period.
* Weekly and monthly base planned allocations are distinct cadence contexts.
* A period allocation is the planned amount actually assigned to one authoritative period.
* A complete period initially receives the applicable target-cadence base amount.
* A transition period receives the prorated and reconciled amount.
* Each period allocation references its category, period, originating base-allocation context, currency context, and calculation or manual-change history.
* Changing a base allocation never silently rewrites a completed period allocation.
* Active-transition changes follow the explicit recalculation behavior in Section 10.

When cadence changes between weekly and monthly, the workflow requires the user to review and confirm every category’s target-cadence base allocation. The product never silently multiplies weekly amounts by four or divides monthly amounts by four. A previously used target-cadence amount may be offered only as an editable, clearly dated suggestion. Confirmed target-cadence amounts become normal base allocations when execution succeeds and provide the transition proration inputs.

### 15.4 Pending revisions, previews, and confirmation evidence

A pending schedule change has one stable identity and an ordered sequence of immutable confirmed revisions.

* Editing begins with temporary unconfirmed workflow data.
* Abandoning an unconfirmed revision creates no authoritative domain or audit record.
* Successful revision confirmation creates a new immutable revision and compact confirmation record and advances the pending change’s current-revision reference.
* Prior confirmed revisions remain unchanged.
* Cancellation changes lifecycle state while preserving all revisions and confirmation evidence.
* Execution links the final confirmed revision to the resulting schedule version.

A preview is a transient display of proposed resulting budget periods, not a separate pending budget or permanent history record. While usable, it may retain a stable calculation identity, proposal and current-authority references, calculation-input integrity token, generation timestamp, time-zone context, horizon, projected periods and totals, calculation-rule versions, data-freshness context, permission context, and current or stale status.

A preview may expire or be replaced when inputs change. Successful confirmation copies only the material reviewed facts into the compact immutable confirmation record.

### 15.5 Financial items and budget-specific assignment

A canonical linked transaction exists once in the user’s financial profile. Each budget that includes it has its own budget-specific financial-item assignment linking:

* The budget and canonical transaction.
* The authoritative budget date used by that budget.
* The applicable authoritative period.
* Assignment and audited reassignment history.

The same canonical transaction may be assigned to different periods in different budgets because their schedules and time zones differ. A schedule change modifies only the applicable budget assignment or its proposal; it never duplicates or rewrites the canonical transaction. A corrected authoritative date may create an audited reassignment and post-close adjustment.

Recurring bill and income definitions are separate from projected occurrences:

* A recurring definition describes the repeating rule.
* Each occurrence represents one expected event with its source definition, budget, projected authoritative date, proposed or authoritative period, and exact, estimated, or unset amount state.
* The definition itself is not a financial occurrence.
* A match relationship may link an occurrence to a canonical posted or pending transaction.
* When the separate matching workflow reports a reliable match, the transaction replaces the projection in preview display and totals without deleting the relationship.
* Removing a match permits a still-applicable projection to reappear.

CBD-68 supplies the resolved MVP income rules consumed here. The unresolved remainder—projected-bill matching, pending-transaction interaction, split/combined/partial or grouped reconciliation, advanced confidence, and additional occurrence-resolution behavior—is deferred as **FF-004 Advanced projection matching and occurrence resolution**.

### 15.6 Schedule operations and deterministic outcomes

Every confirmation, pending revision, cancellation, and execution uses a stable schedule-operation identity with one durable business outcome.

The logical operation links the initiating actor or System, target budget and pending record, confirmation evidence, resulting versions or periods, and correlated audit events. It exists to satisfy the product guarantees of idempotency, deterministic recovery, and no duplicate or partial authoritative outcome without prescribing transaction, locking, retry, or storage mechanics.

### 15.7 Time-zone and currency context

The budget has one current supported named time-zone setting.

* Time-zone changes use immutable settings-audit events.
* Schedule versions do not own or duplicate the setting and are not created when it changes.
* Confirmation records, schedule operations, and execution audit events retain the named time-zone context used.
* Existing authoritative period dates never shift because the time zone later changes.
* New workflows use the then-current budget time zone.

CBD-67 supports one authoritative currency and supported precision context per budget. Period allocations, proration results, confirmation records, and audit monetary values retain the applicable currency code and precision or a stable reference to that context. Calculation records retain the applicable rounding and reconciliation-rule version.

Multi-currency budgeting, exchange-rate behavior, mixed-currency totals, and changing a budget’s currency are outside scope and recorded in the future-feature register. Historical amounts can never be reinterpreted silently under another currency.

### 15.8 Technical-design handoff

The future technical specification must map these logical records and invariants to a physical design and define transaction boundaries, constraints, indexes, concurrency control, data migration, archival, encryption, APIs, job execution, observability, and recovery. Physical denormalization or caching is permitted only when it preserves the authoritative meanings and relationships defined here.

## 16. Automated-test implications

### 16.1 Verification contract

This section defines the product-level verification contract for CBD-67. It does not prescribe a programming language, testing framework, system architecture, or the implementation layer at which an individual check must run.

* Every invariant in Section 3 must have automated verification.
* Every CBD-67 acceptance criterion must map to one or more automated scenarios.
* Scenario-catalog examples must identify the acceptance criteria and invariants they verify.
* Verification must assert business outcomes and durable records, not only screenshots, rendered text, or transient UI state.
* A failed required check blocks release of the affected workflow until the requirement passes or the product specification is deliberately revised.

The [Acceptance Criteria Traceability and Review Record](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/720897) is the authoritative matrix linking acceptance criteria, specification sections, scenario IDs, and verification evidence. Test identifiers may be added to that matrix or to directly linked implementation evidence.

### 16.2 Deterministic calendar verification

Calendar tests must control the budget date, named time zone, local-midnight boundary, and corresponding UTC instant. They must never rely on the executing machine's current clock or local time zone.

Example-based coverage must include:

* all seven weekly anchor days;
* monthly anchors from day 1 through day 31 and the explicit Last day option;
* short months, leap years, numbered-day clamping, and return to the numbered anchor;
* dates exactly on and immediately around natural boundaries;
* immediate and future changes initiated mid-period;
* daylight-saving transitions and named time zones with differing offsets; and
* effective-date and active-period behavior at local midnight.

Generated calendar checks must supplement the examples and prove, over a broad date range, that:

* every budget date belongs to exactly one applicable period;
* authoritative periods have no gaps or overlaps;
* adjacent period boundaries are consistent;
* clamped dates are always valid;
* numbered anchors resume when a later month contains that date;
* Last day remains anchored to the actual last day; and
* completed period boundaries do not change.

### 16.3 Proration, rounding, and reconciliation

Automated verification must cover:

* weekly proration using included days divided by seven;
* monthly proration using the actual number of days in the applicable month;
* leap-year, clamp, natural-boundary, and shortened-transition cases;
* no proration when the effective date is already a natural boundary;
* zero and positive allocation inputs and rejection of disallowed negative inputs;
* currency-aware half-up rounding below, exactly at, and above a midpoint;
* largest-remainder reconciliation, including ties resolved by stable category identity rather than label or display order;
* currencies with differing decimal precision in the calculation rules, while retaining the single-currency-per-budget MVP boundary;
* exact agreement between reconciled allocations and the required transition total; and
* the active-transition choices to keep or recalculate transition allocations, atomic failure behavior, and removal of that choice after the transition expires at local midnight.

### 16.4 Roles, permissions, masking, and accessibility

The automated role-state matrix must cover every role plus Viewers with Full-budget, Planning, Category-group, Account-group, and no-profile states. It must verify inherited content, unavailable incompatible outputs, read-only behavior, profile changes during open work, and masking without count, amount, or aggregate leakage.

Automated accessibility checks must verify:

* programmatic labels and error associations;
* error-summary focus and navigation to invalid fields;
* keyboard access to actions and expandable details;
* accessible announcements for loading, stale, success, failure, and recovery states;
* an accessible explanation for unavailable actions;
* meaningful masked sections that do not reveal restricted information; and
* no reliance on color alone to convey meaning.

Automated accessibility checks supplement rather than replace later keyboard and assistive-technology acceptance testing.

### 16.5 Concurrency, interruption, and recovery

Verification must exercise:

* two authorized users acting on the same schedule version;
* concurrent edits or confirmations of a pending change;
* an effective date arriving while edit or cancellation work is open;
* duplicate request delivery;
* loss of a response before or after commit;
* interruption before or after commit;
* an automatic retry using the same schedule-operation identity; and
* concurrent permission or budget-time-zone changes that invalidate open work.

Every case must prove exactly one durable Succeeded or Failed outcome; no duplicate schedule versions, periods, allocations, confirmations, or audit events; no partial application; preservation of the prior authoritative schedule after definitive failure; and deterministic recovery without requiring the user to contact support.

### 16.6 Preview, confirmation, and financial presentation

Preview verification must reconcile the displayed result with the authoritative result produced by confirmation. It must cover:

* closure of the old schedule, any transition period, the first three complete new periods, and the stated preview horizon;
* all authorized financial items and category-separated totals for each shown period;
* posted and pending transactions;
* replacement of a reliably matched projection by its transaction exactly once;
* italicized estimated amounts marked with a tilde and appropriately approximate totals;
* exclusion of items without a usable visible amount from totals;
* omission of old-period financial totals, a total-affected amount, and a net-change total;
* alignment among preview facts, the confirmation record, schedule history, and audit evidence; and
* later financial-data changes affecting current views without rewriting the compact immutable confirmation record.

Permission-restricted content must appear only as the approved consolidated masked block.

### 16.7 History and domain integrity

Automated verification must prove that:

* only authoritative schedules receive schedule-version numbers;
* pending changes have stable identities but no schedule version;
* confirmed and executed changes reference the correct old and new versions;
* completed dates, plans, schedule references, and compact confirmation evidence remain immutable;
* legitimate post-close adjustments are appended and audited rather than rewriting history;
* schedule history and budget-settings history remain separate and cross-linked when relevant;
* a canonical transaction remains distinct from its budget-specific assignments;
* category identity remains stable through rename, archive, reorder, and same-name recreation;
* archived history remains permission-aware and interpretable over the budget's lifetime; and
* original currency context, decimal precision, named time-zone context, and applicable rule version remain interpretable.

### 16.8 Stable reference fixtures and generated coverage

The test suite must maintain a small set of stable, human-reviewable reference fixtures with known expected results. Each fixture must define its financial inputs, controlled date and time-zone context, expected schedule periods, transition calculation, displayed preview totals, and resulting durable confirmation evidence.

The June 17 immediate monthly-to-weekly change example described in Section 8 must be represented as a reference fixture. Fixed fixtures provide reproducible regression evidence; generated tests provide broader calendar and allocation coverage. Both must produce reproducible results across supported environments.

### 16.9 MVP scope-boundary verification

Automated checks must confirm that the CBD-67 MVP does not expose or invoke:

* balance rollover or carry-forward behavior;
* multi-currency budget behavior or currency changes;
* an Owner-approval workflow for schedule changes;
* schedule-version assignment to an unconfirmed pending change; or
* budget-time-zone editing inside schedule-creation or schedule-change workflows.

These checks protect the approved MVP boundary while the excluded capabilities remain in the future-feature register or separate specifications.

## 17. Dependencies, risks, and assumptions

### 17.1 Dependency principle

Dependencies are scoped. An unresolved dependency blocks only the behavior that requires it, unless that behavior is inseparable from the user-visible workflow being released. Account-independent cadence calculations and schedule-change logic may proceed independently from account integration and onboarding work.

### 17.2 Dependencies and related work

| Item | Classification | Affected capability | Required relationship |
| --- | --- | --- | --- |
| [CBD-12](https://cobudget.atlassian.net/browse/CBD-12) role and permission model | Foundational dependency | All role-specific access, modification, masking, and history behavior | CBD-67 consumes authoritative role and provisioning decisions without redefining the broader permission model. |
| [CBD-82](https://cobudget.atlassian.net/browse/CBD-82) financial profile and linked-account ownership | Scoped foundational dependency | Account-backed previews and workflows using linked financial data | CBD-82 owns canonical accounts, connection authority, ownership, privacy, unlinking, and profile-level lifecycle. |
| [CBD-84](https://cobudget.atlassian.net/browse/CBD-84) multi-budget linked-account scope | Scoped integration dependency | Adding accounts to budgets and including their transactions in budget views and previews | CBD-84 decides whether and when an account or transaction belongs to a budget; CBD-67 decides how authorized budget data appears within cadence workflows. |
| [CBD-85](https://cobudget.atlassian.net/browse/CBD-85) schedule-first onboarding | Scoped integration dependency | Integrated budget-creation and onboarding experience | CBD-67 owns schedule selection, validation, preview, and initial-cycle behavior; CBD-85 owns the surrounding creation and onboarding journey. |
| [CBD-83](https://cobudget.atlassian.net/browse/CBD-83) account-level financial dashboard | Related downstream work | Non-budget aggregate financial presentation | It does not block CBD-67. It must consume canonical financial data without double-counting transactions assigned to multiple budgets. |
| Budget-time-zone change workflow | Future related work | Changes to an existing budget's authoritative time zone | The unresolved effective-date behavior remains in Section 18 and cannot be silently assumed during implementation. |
| Projection matching behavior | CBD-68 governing MVP income behavior plus narrowed future work | CBD-68 defines one-to-one income matching and Late/Missing/Skip; FF-004 covers bill, pending, complex-cardinality, and advanced behavior | CBD-67 consumes a reliable match result but does not redefine matching rules. |

CBD-67 and CBD-85 must preserve the same non-negotiable outcome: no persistent budget may exist without an authoritative initial schedule. A delay or unresolved decision in one linked item does not authorize CBD-67 to invent substitute ownership, membership, permission, or onboarding behavior.

### 17.3 Risk register

| ID | Risk | Impact | Mitigation |
| --- | --- | --- | --- |
| R-01 | Calendar-boundary misclassification | Transactions, periods, or changes could be assigned to the wrong cycle around local midnight, daylight-saving changes, leap years, or monthly clamping. | Use one named budget time zone, date-based classification, immutable completed boundaries, deterministic calendar tests, and read-only integrity recovery. |
| R-02 | Incorrect transition proration or rounding | Allocation totals may not reconcile or may distribute remainders inconsistently. | Apply the explicit weekly and monthly formulas, currency-aware half-up rounding, stable-identity largest-remainder reconciliation, fixed fixtures, and generated tests. |
| R-03 | Preview and confirmed outcome diverge | A user could approve a result different from the authoritative schedule that is applied. | Detect stale inputs, control preview calculations, retain compact confirmation evidence, execute atomically, and reconcile preview, result, history, and audit in automated tests. |
| R-04 | Concurrent or stale actions overwrite newer intent | Two authorized users may confirm, revise, or cancel conflicting schedule states. | Use stable operation identities, schedule-version checks, stale-work invalidation, one durable outcome, and concurrency verification. |
| R-05 | Partial or indefinitely processing operations | A budget could enter an ambiguous state or require support intervention. | Require atomic operations, idempotent recovery, bounded processing, automatic resolution to Succeeded or Failed, preservation of the prior state, and temporary read-only behavior during integrity recovery. |
| R-06 | Permission or masking leakage | Restricted financial amounts, counts, aggregates, history, or account relationships could be exposed. | Apply the role-state rules, consolidated masking, no restricted aggregates, reauthorization before confirmation, and invalidation after permission changes. |
| R-07 | Account-scope ambiguity or duplication | A canonical account or transaction could be copied, double-counted, or exposed across budgets. | Consume CBD-82 and CBD-84 ownership decisions, preserve canonical identities and budget-specific assignments, retain history, and test cross-budget isolation. |
| R-08 | Stale account synchronization misleads the user | A preview may be internally correct but based on incomplete or outdated external financial data. | Identify stale synchronization clearly, permit informed continuation only where allowed, preserve the preview's data context in confirmation evidence, and avoid implying completeness. |
| R-09 | Projection and transaction double-counting | A projection and its matched transaction could both appear or contribute to totals. | Consume only a reliable match relationship, display the canonical transaction once, retain separate identities, and test replacement behavior; matching rules remain separate work. |
| R-10 | Time-zone changes invalidate open work | “Today,” local midnight, effective dates, or pending proposals could change meaning while a workflow is open. | Keep time-zone editing outside schedule workflows, revalidate open work, retain historical time-zone context, and continue tracking the unresolved effective-date rule in Section 18. |
| R-11 | Active-transition allocation changes are misunderstood | A user may unintentionally preserve or recalculate a shortened transition period. | Provide no default choice, require an explicit keep-or-recalculate selection while the transition remains active, update the preview, explain the effect, and remove the choice after completion. |
| R-12 | Long-lived history becomes inconsistent or uninterpretable | A budget may exist for decades while rules, names, precision, and implementation change. | Use stable identities, non-reused category IDs, immutable completed facts, compact confirmation records, retained rule and currency context, append-only adjustments, and archival verification. |
| R-13 | History volume or preview calculation harms usability | Decades of schedules, transactions, and projections could make workflows slow or difficult to navigate. | Keep durable evidence compact, bound preview horizons, require the technical design to support incremental or paginated retrieval, and test long-lived budgets at realistic scale. |
| R-14 | Cross-specification drift | CBD-12, CBD-82, CBD-84, CBD-85, or future time-zone and matching work could introduce contradictory behavior. | Maintain explicit ownership boundaries, linked requirements, traceability review, and mandatory reconciliation when a dependency changes. |
| R-15 | Accessibility failures prevent workflow completion | Users relying on keyboards or assistive technology may not be able to understand errors, masked content, status, or confirmation. | Apply the automated accessibility contract and complete later keyboard and assistive-technology acceptance testing. |
| R-16 | Scope creep introduces incomplete future behavior | Rollover, multi-currency, owner approval, or time-zone editing could leak into MVP workflows without complete rules. | Preserve explicit exclusions, use the future-feature register, and execute automated MVP scope-boundary tests. |
| R-17 | Dependency delay creates misleading partial experiences | The interface may expose account-backed or onboarding behavior before its governing model is ready. | Use capability-specific release gates and unavailable-state handling; never simulate unresolved ownership or membership rules. |
| R-18 | External time-zone data changes | Updated time-zone rules could change future UTC execution instants. | Store the named time zone and applicable historical context, calculate future instants from maintained time-zone data, and never reinterpret completed budget dates or periods. |
| R-19 | Financial-data changes rewrite historical approval evidence | Later synchronization, matching, amount updates, or corrections could alter what the user originally confirmed. | Preserve compact immutable confirmation evidence while allowing current views and audited adjustments to reflect later authoritative data. |
| R-20 | Technical implementation cannot satisfy the product's recovery guarantee | A design may expose indefinite Processing, duplicates, or inconsistent recovery despite correct happy-path behavior. | Treat definitive outcomes, idempotency, atomicity, and self-recovery as mandatory technical-design and release constraints. |

### 17.4 Assumptions

The following assumptions support this specification but do not override an explicit rule, invariant, dependency decision, or open question:

* Every persistent budget has exactly one authoritative schedule lineage and an active cycle.
* Initial budget creation and initial schedule creation are one atomic user-visible outcome.
* A budget uses one authoritative named time zone; free text and raw UTC offsets are not accepted.
* GMT is used only when no usable user time zone exists during budget creation.
* Transaction categorization uses the transaction's authoritative date, not its timestamp or the viewer's time zone.
* Each budget has one authoritative currency context in the CBD-67 MVP.
* Primary Owner, Co-owner, and Collaborator are the only roles authorized to create, change, cancel, or confirm schedules; Viewer is read-only and Accountability Partner is financially read-only, with personal acknowledgements and attributed comments separately permitted.
* Accountability Partners receive complete schedule visibility but no modification authority.
* Viewer access remains profile-scoped and may expose less than the full schedule or financial picture.
* Upstream account systems can identify synchronization freshness and provide an authoritative transaction date, amount status, and posted or pending status when available.
* CBD-82 and CBD-84 provide authoritative account-ownership and budget-membership decisions before account-backed cadence behavior is released.
* CBD-67 receives a reliable projection-match result but does not determine how reliability is established.
* Category, account, transaction, pending-change, schedule-version, and schedule-operation identities remain stable.
* Historical rules, time-zone context, currency precision, and calculation versions remain interpretable.
* Previews are transient and need not be retained as complete historical snapshots.
* The compact immutable confirmation record provides sufficient evidence of what was approved.
* Completed periods are not regenerated or rewritten by later schedule changes.
* Future projected periods are disposable calculations until they become current.
* No rollover, multi-currency, owner-approval, or in-workflow time-zone-change behavior is assumed.
* An unresolved decision in Section 18 cannot be filled through an undocumented implementation assumption.
* Supporting technical specifications will choose the architecture while preserving every product invariant and definitive-outcome requirement.

### 17.5 Governance and release handling

* A dependency change must trigger review of affected requirements, terminology, invariants, scenarios, and traceability.
* A risk is considered mitigated only when its controlling product rule and required verification are implemented.
* If a stated assumption becomes false, the affected workflow must not be released until the specification is revised or the dependency supplies an authoritative replacement decision.
* An unresolved scoped dependency blocks only the capability that consumes it, but the product must not expose a partial experience that implies the missing behavior is supported.
* An unresolved decision in Section 18 remains an explicit gap; it may not be converted into an implementation default without product review.

## 18. Open questions and follow-up work

### 18.1 MVP decision status

No known implementation-blocking product decisions remain for the CBD-67 MVP.

This statement does not mean every adjacent or future capability has been specified. It means the weekly and monthly schedule workflows defined in this document can be implemented without inventing an undocumented product rule. Deferred work below is either outside the MVP or has a complete consumption boundary that allows CBD-67 to operate without defining the upstream capability.

### 18.2 Deferred, non-blocking follow-up work

| ID | Deferred question | Current CBD-67 boundary | Decisions required before the future capability is released | Linked work | Status |
| --- | --- | --- | --- | --- | --- |
| OQ-TZ-01 | When does a change to an existing budget's authoritative time zone become effective, and how does it affect an active cycle or pending schedule change? | CBD-67 allows a named time zone to be selected during budget creation. Time-zone editing is not available inside schedule-creation or schedule-change workflows and does not block the MVP. | Define authorization, effective-date choices, treatment of the active cycle, local-midnight execution, pending-change invalidation or recalculation, preview and confirmation behavior, history, audit, failure recovery, and effects on future versus completed periods. | [FF-002 — Budget-space time-zone change workflow](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/950274) | Deferred; non-blocking |
| OQ-PM-01 | Which projection-matching behavior remains outside the resolved CBD-68 MVP income rules? | CBD-67 consumes reliable results. CBD-68 PD-68-06 and PD-68-07 govern one-to-one income matching, exact automation, ±5-day/±5% suggestions, correction, permissions, audit, Late, Missing, and Skip occurrence. | Define projected-bill matching, pending-transaction interaction, split/combined/partial and reconciliation-group behavior, advanced confidence, and any additional resolution states. | [FF-004 — Advanced projection matching and occurrence resolution](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/950274) | Deferred; non-blocking remainder |

The CoBudget Future Feature Register is authoritative for prioritization and future status. This section preserves the CBD-67 boundary and the specific decisions that later work must resolve.

### 18.3 New-question governance

If implementation, design, testing, dependency review, or acceptance review discovers a new ambiguity:

1. Stop work only on the affected capability when proceeding would require an unsupported product assumption.
2. Assign a stable open-question ID.
3. Record the exact question, user and data impact, affected workflows, and release consequence.
4. Assign a decision owner and target date.
5. Create or link a Jira issue when the decision blocks implementation or release.
6. Identify any temporary unavailable or read-only behavior that safely prevents unsupported operation.
7. Update the specification, terminology, invariants, scenario catalog, acceptance-criteria traceability, risks, and future-feature register where applicable after the decision is approved.
8. Close the question only when the authoritative product decision and linked verification implications are documented.

A placeholder, technical convenience, inferred default, or implementation-specific behavior is not a product decision. Deferred non-MVP work must remain unavailable unless its governing specification is completed and approved.

## 19. Supporting documents

### 19.1 Supporting-artifact map

| Artifact | Purpose | Authority and relationship |
| --- | --- | --- |
| [CBD-67 — Weekly and Monthly Budget Cycle Workflow Specification](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/655361) | Defines weekly and monthly cadence rules, workflows, boundaries, permissions, history, and interface behavior. | Authoritative for CBD-67 product behavior. |
| [Weekly and Monthly Cadence Scenario Catalog](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/688129) | Provides concrete weekly, monthly, transition, failure, permission, and boundary examples. | Illustrates the specification but cannot override it. A conflicting scenario must be corrected. |
| [Acceptance Criteria Traceability and Review Record](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/720897) | Maps Jira acceptance criteria to specification sections, scenarios, invariants, and verification evidence. | Authoritative for coverage status, not product rules. |
| [CoBudget Future Feature Register](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/950274) | Tracks deliberately excluded or deferred capabilities such as time-zone changes, rollover, projection matching, and multi-currency. | Authoritative for future-feature disposition. Inclusion does not imply commitment or release timing. |
| [CBD-67 Jira subtask](https://cobudget.atlassian.net/browse/CBD-67) | Tracks delivery status, acceptance criteria, and links to the approved artifacts. | Authoritative for work status. Description or acceptance-criteria changes require reconciliation with the specification. |
| [CBD-12 role and permission model](https://cobudget.atlassian.net/browse/CBD-12) | Defines broader collaborator roles, provisioning, and authority. | Authoritative for cross-product role semantics; CBD-67 owns cadence-specific application. |
| [CBD-82 financial profile and linked-account ownership](https://cobudget.atlassian.net/browse/CBD-82) | Defines canonical accounts, financial connections, ownership, consent, privacy, and unlinking. | Authoritative for profile-level account behavior. |
| [CBD-84 linked-account scope across budgets](https://cobudget.atlassian.net/browse/CBD-84) | Defines account-to-budget membership, removal, classification, and cross-budget isolation. | Authoritative for whether financial data belongs to a budget. |
| [CBD-85 schedule-first onboarding](https://cobudget.atlassian.net/browse/CBD-85) | Defines the surrounding budget-creation and onboarding journey. | Authoritative for onboarding orchestration; CBD-67 remains authoritative for schedule behavior. |
| [CBD-83 account-level financial dashboard](https://cobudget.atlassian.net/browse/CBD-83) | Defines non-budget aggregate financial presentation. | Related downstream work; it consumes shared canonical financial data without blocking CBD-67. |
| Planned CBD-67 technical specification | Will define architecture, persistence, APIs, jobs, recovery mechanics, observability, migrations, performance, and implementation testing. | Must implement this product specification and may not redefine approved product behavior. It will be created in a separate implementation-planning task. |

### 19.2 Authority and conflict rules

* The approved CBD-67 specification controls cadence product behavior.
* An adjacent specification controls the domain explicitly assigned to it.
* Scenarios demonstrate rules; they do not create or supersede rules.
* The traceability record measures coverage; it does not replace requirements.
* Jira tracks work and acceptance, but it must remain reconciled with the approved documentation.
* A technical design may choose implementation mechanisms but cannot weaken invariants, recovery guarantees, permissions, or user-visible outcomes.
* When artifacts conflict, work on the affected capability stops until the authoritative documents are reconciled. A team must not select whichever source is easiest to implement.

### 19.3 Update expectations

A material CBD-67 change must trigger review of:

* Jira description and acceptance criteria;
* scenario coverage;
* acceptance-criteria traceability;
* terminology and invariants;
* dependencies, risks, assumptions, and open questions;
* future-feature disposition; and
* the planned technical specification and implementation evidence, once they exist.

Links must be checked during approval review and whenever an artifact is moved, renamed, replaced, or archived. An unavailable link does not transfer authority to a secondary artifact; the authoritative source must be restored or formally replaced.

## 20. Revision history and approval

### 20.1 Publication state

| Field | Value |
| --- | --- |
| Document version | 1.0 |
| Document status | Approved |
| Author | Alexander Wohlford |
| Final-draft publication date | August 11, 2026 |
| Reviewer | Alexander Wohlford — Product Owner |
| Formal approval | Approved August 11, 2026 |
| Approved version | 1.0 |

**Final Draft** means the product-behavior specification is complete enough for formal product, design, engineering, data, security/privacy, accessibility, and quality review. It is not an implementation authorization, production-release approval, or substitute for the planned technical specification.

### 20.2 Final-draft readiness record

| Check | Result | Evidence or remaining action |
| --- | --- | --- |
| Purpose, scope, workflows, boundaries, interface behavior, and product logic are complete | Passed | Sections 1–15 |
| Terminology and product invariants have been reviewed throughout drafting | Passed | Section 3, including INV-01 through INV-89 |
| Automated-verification implications and release gates are defined | Passed | Section 16 |
| Dependencies, risks, assumptions, and scoped release effects are documented | Passed | Section 17 |
| Known MVP-blocking product questions are resolved | Passed | Section 18 records no known blockers |
| Deferred features and unresolved adjacent capabilities have explicit boundaries | Passed | Section 18 and the Future Feature Register |
| Supporting-artifact ownership and conflict rules are documented | Passed | Section 19 |
| CBD-67 Jira description and acceptance-criteria fields were included in final review | Passed | [CBD-67](https://cobudget.atlassian.net/browse/CBD-67) |
| All 19 CBD-67 acceptance criteria appear in the traceability record | Passed | [Acceptance Criteria Traceability and Review Record](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/720897) |
| Required weekly, monthly, and cross-cadence reference scenarios exist | Passed for final-draft review | [Weekly and Monthly Cadence Scenario Catalog](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/688129); implementation-level expansion remains subject to Section 16 |
| FF-002 and FF-004 remain registered as deferred, non-blocking work | Passed | [CoBudget Future Feature Register](https://cobudget.atlassian.net/wiki/spaces/CBD/pages/950274) |
| Product Owner review completed | Passed | Alexander Wohlford approved the clarified old-period preview rule, corrected acceptance mappings, explicit confirmation assertions, and the complete document package on August 11, 2026. |
| Planned technical specification completed | Not started; not required for Final Draft | Must be completed before implementation authorization |
| Automated acceptance and invariant verification implemented | Not started; not required for Final Draft | Required by Section 16 before release of affected workflows |

### 20.3 Formal approval requirements

Before this document becomes **Approved** version 1.0:

1. Assign an accountable reviewer or review group.
2. Review the Jira description and acceptance criteria against this specification.
3. Review each supporting scenario for consistency with the authoritative product rules.
4. Confirm that every acceptance criterion has correct section and scenario traceability.
5. Review terminology, invariants, permissions, masking, accessibility, history, risks, assumptions, deferred work, and data-retention implications.
6. Resolve every review finding that changes product behavior, or record it as explicit blocking or deferred work with an authoritative boundary.
7. Recheck every supporting link.
8. Record the reviewer, review date, decision, and any conditions in this section.
9. Change the header status to Approved and issue version 1.0 only after all required reviewers accept the document.

Approval of this product specification does not approve a technical design or production release. Those decisions require their own evidence and gates.

### 20.4 Change control after publication

* Editorial changes that do not alter meaning may increment the patch version and must identify the corrected content.
* A change to user behavior, calculation rules, permissions, authoritative state, data interpretation, history, recovery guarantees, scope, or acceptance mapping is material and requires a new review.
* Material pre-approval changes retain Final Draft status and increment the draft version as appropriate.
* Material post-approval changes increment the approved minor or major version according to impact and return the affected sections and supporting artifacts to review.
* A later artifact cannot silently override this specification. Conflicts must be reconciled through an explicit revision.
* Revision entries are append-only; prior publication and approval decisions remain visible.

### 20.5 Revision history

| Version | Date | Author | Summary | Reviewer | Decision |
| --- | --- | --- | --- | --- | --- |
| 0.1 | August 9, 2026 | Alexander Wohlford | Established the initial structured working draft for CBD-67. | Not assigned | Working draft |
| 0.9 | August 11, 2026 | Alexander Wohlford | Completed the weekly and monthly cadence product-behavior specification, including workflows, invariants, previews, transitions, history, recovery, domain concepts, verification requirements, dependencies, risks, assumptions, deferred work, and supporting-artifact governance. | Unassigned | Final Draft published; formal approval pending |
| 1.0 | August 11, 2026 | Alexander Wohlford | Resolved final completion-review findings: clarified that the shortened old period has no financial details or totals, aligned complete-authorized-set wording, corrected supporting acceptance mappings, and approved the CBD-67 product-document package. | Alexander Wohlford — Product Owner | Approved |
| 1.1 | August 12, 2026 | Alexander Wohlford with Codex assistance | Reconciled narrative permission language with the authoritative matrix: Primary Owner, Co-owner, and Collaborator may perform cadence schedule actions; Viewer remains read-only and Accountability Partner remains financially read-only with personal acknowledgements and attributed comments separately permitted. Owner/Co-owner-only authority remains for the separate budget-time-zone setting. Terminology clarified August 15, 2026. | Alexander Wohlford — Product Owner | Approved |
| 1.2 | August 12, 2026 | Alexander Wohlford with Codex assistance | Added the cadence-neutral boundary-and-target adapter used by paycheck and fixed-length custom schedules. Required explicit review of proposed full-period spending targets and generalized proration inputs without changing weekly/monthly outcomes. | Alexander Wohlford — Product Owner | Approved |
| 1.3 | August 12, 2026 | Alexander Wohlford with Codex assistance | Reconciled CBD-67 matching boundaries with CBD-68 PD-68-06/07 and narrowed FF-004 to projected bills, pending interaction, complex cardinality, advanced confidence, and additional resolution behavior. | Alexander Wohlford — Product Owner | Approved |
