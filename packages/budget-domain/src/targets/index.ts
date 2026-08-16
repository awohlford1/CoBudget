export type {
  BaseTarget,
  BaseTargetSet,
  CategoryId,
  PeriodTarget,
  ProrationRecord,
  TargetOrigin,
} from "./definition.ts";
export { TARGET_ORIGINS, validateBaseTargetSet } from "./definition.ts";

export { fullPeriodTargets, prorateTransitionTargets } from "./proration.ts";

export type { TransitionRecalculation, TransitionTargetChoice } from "./recalculation.ts";
export {
  TRANSITION_TARGET_CHOICES,
  applyBaseTargetChange,
  recalculationAllowed,
} from "./recalculation.ts";
