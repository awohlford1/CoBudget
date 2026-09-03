# CoBudget product plan

## Product vision

CoBudget helps individuals and households manage money on the schedule that
matches their lives while receiving support from people they trust.

The two initial differentiators are:

1. Budgets organized weekly, monthly, by paycheck, or using custom periods.
2. Explicit Viewer, Collaborator, and Accountability Partner relationships
   with defined permissions, consent, alerts, and audit history.

The approved mission, vision, values, and manifesto are maintained in the
[brand foundation](brand-foundation.md). A public Mission or About Us page using
that content is part of the initial web experience.

## Initial audience

The first release will target U.S. consumers who want a clearer short-term view
of spending or voluntary accountability. Legal guardianship, accounts for
minors, and financial control by another person are outside the initial scope.

## Minimum viable product

- Responsive, installable web application
- Public Mission or About Us page reflecting the approved brand foundation
- Secure authentication and multifactor authentication
- Personal and shared budget spaces
- Weekly, monthly, biweekly, semimonthly, paycheck, and custom schedules
- Category allocations. Rollover and carry-forward are deferred to FF-003: a
  period's remainder or overspend stays in that period's history and never
  changes a later target
- Manual accounts and transactions
- Checking, savings, and credit-card transaction synchronization through one
  aggregation provider
- Transaction review and categorization
- Basic dashboard with available, spent, remaining, and upcoming amounts
- Manual bills on a calendar
- Savings goals
- Primary Owner, Co-owner, Collaborator, Viewer, and Accountability Partner
  invitations
- Built-in alerts with per-recipient delivery preferences and acknowledgement
- Mandatory in-app notifications for every eligible recipient, plus opt-in
  email, Web Push, and SMS per supported event or category
- Basic category and period reports
- Connection health, consent history, audit history, export, and deletion

## Role intent

- **Primary Owner:** Responsible for the budget space. The only role that can
  transfer, archive, or delete it. Manages membership and sharing, and controls
  only the bank connections they personally authorized.
- **Co-owner:** Shares day-to-day administration with the Primary Owner. Cannot
  remove or demote the Primary Owner, transfer ownership, or delete the space.
- **Collaborator:** Can categorize transactions and edit agreed budgets, bills,
  and goals. Controls only the bank connections they personally authorized, and
  cannot manage ownership, membership, permissions, or anyone else's connection.
- **Viewer:** Reads one owner-assigned visibility profile and the resources it
  inherits. Read-only, and starts with no profile and therefore no access.
- **Accountability Partner:** A voluntary support role with comprehensive,
  financially read-only visibility of the budget space within a fixed field
  boundary. It may acknowledge its own firm alerts and leave attributed
  comments; it can never move money, change financial data, administer
  membership, or lock anyone out. It has no resource-level grants, so Viewer is
  the role for narrower, profile-scoped sharing.

The approved role vocabulary, including internal enum values and the
customer-facing descriptions, is CBD-75 in
`docs/cbd-75-role-terminology-and-copy-standard.md`. Accountability Partner is
the sole official term for the support role and Guardian is retired. The
controlling permission boundaries are CBD-72.

## Deferred capabilities

- Native iOS and Android applications
- Money movement, bill payment, or purchase blocking
- Mortgage and student-loan details
- Automatic recurring-bill and income detection
- Predictive cash-flow models or AI financial advice
- Credit decisions or underwriting
- International and multicurrency support
- Legal guardian and minor account workflows

## Suggested release sequence

### Discovery

Validate budget-period workflows, role expectations, alert boundaries, consent,
and terminology with prospective users. Complete an initial threat model and
legal review.

### Private MVP

Build the responsive web application, budget schedule engine, role system,
manual transaction flow, one bank-data integration, dependable background sync,
and basic notifications. Test with a small supported cohort.

### Product depth

Add native mobile clients and their native push transports, transaction
splits and rules,
recurring-item detection, shared comments, richer support-role guardrails, and
cash-flow forecasting.

### Financial breadth

Add lender data, additional aggregation providers, advanced reporting, anomaly
detection, and subscription billing when validated by usage.

## Early success measures

Product analytics is disabled for Private MVP. `AN-92-001` and `AN-92-002`
prohibit behavioral event pipelines, session replay, heatmaps, and third-party
trackers, and neither a consent banner nor pseudonymization makes them
permitted. These measures may therefore be computed only as coarse,
non-drillable aggregates inside an authorized operational boundary under
`AN-92-005`, where the released result cannot single out a person, budget
space, relationship, or small cohort, and where no contributing customer-level
event is retained. Enabling ordinary product analytics later requires a new
Product Owner and privacy approval under `AN-92-007`; silence is not approval.

- Percentage of new users who create a first budget period
- Time required to create a usable budget
- Successful financial-account connection and sync rate
- Percentage of transactions categorized or confirmed
- Collaboration invitation acceptance rate
- Accountability Partner alert acknowledgement and dismissal rates
- Four- and eight-week active retention by budget cadence
- Number of duplicate, late, or incorrect alerts per active user
