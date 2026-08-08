# CoBudget product plan

## Product vision

CoBudget helps individuals and households manage money on the schedule that
matches their lives while receiving support from people they trust.

The two initial differentiators are:

1. Budgets organized weekly, monthly, by paycheck, or using custom periods.
2. Explicit viewer, collaborator, and guardian relationships with scoped
   permissions, consent, alerts, and audit history.

## Initial audience

The first release will target U.S. consumers who want a clearer short-term view
of spending or voluntary accountability. Legal guardianship, accounts for
minors, and financial control by another person are outside the initial scope.

## Minimum viable product

- Responsive, installable web application
- Secure authentication and multifactor authentication
- Personal and shared budget spaces
- Weekly, monthly, biweekly, semimonthly, paycheck, and custom schedules
- Category allocations and optional rollover
- Manual accounts and transactions
- Checking, savings, and credit-card transaction synchronization through one
  aggregation provider
- Transaction review and categorization
- Basic dashboard with available, spent, remaining, and upcoming amounts
- Manual bills on a calendar
- Savings goals
- Owner, viewer, collaborator, and guardian invitations
- Configurable guardian alerts and acknowledgement
- In-app and email notifications
- Basic category and period reports
- Connection health, consent history, audit history, export, and deletion

## Role intent

- **Owner:** Controls the budget space, connections, membership, and sharing.
- **Viewer:** Can see only the financial information explicitly shared.
- **Collaborator:** Can categorize transactions and edit agreed budgets, bills,
  and goals, but cannot manage ownership or financial connections.
- **Guardian:** Receives agreed oversight alerts and may acknowledge or comment
  on them. Guardian access is scoped and revocable; it does not permit money
  movement or locking out the owner.

"Accountability Partner" should be evaluated as an alternative customer-facing
name for the guardian role unless legal guardianship becomes part of the
product.

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

Add native mobile clients, push notifications, transaction splits and rules,
recurring-item detection, shared comments, richer guardian guardrails, and
cash-flow forecasting.

### Financial breadth

Add lender data, additional aggregation providers, advanced reporting, anomaly
detection, and subscription billing when validated by usage.

## Early success measures

- Percentage of new users who create a first budget period
- Time required to create a usable budget
- Successful financial-account connection and sync rate
- Percentage of transactions categorized or confirmed
- Collaboration invitation acceptance rate
- Guardian alert acknowledgement and dismissal rates
- Four- and eight-week active retention by budget cadence
- Number of duplicate, late, or incorrect alerts per active user
