import MetricParam from '../types/MetricParam';
import Scope from '../types/Scope';

/**
 * Get CVSS 3.1 representation.
 * @param metrics 
 * @returns 
 */
export function getCVSS31(metrics: MetricParam) {
  const {
    attackVector = '_',
    attackComplexity = '_',
    privilegeRequired = '_',
    userInteraction = '_',
    scope = '_',
    confidentiality = '_',
    integrity = '_',
    availability = '_'
  } = metrics

  return `CVSS:3.1/AV:${attackVector}/AC:${attackComplexity}/PR:${privilegeRequired}/UI:${userInteraction}/S:${scope}/C:${confidentiality}/I:${integrity}/A:${availability}`;
}

/**
 * Define a function to calculate Impact Sub Score (ISC)
 * 
 * @param scope 
 * @param impactConfidentiality 
 * @param impactIntegrity 
 * @param impactAvailability 
 * @returns 
 */
function calculateImpactSubScore(
  scope: Scope,
  impactConfidentiality: number,
  impactIntegrity: number,
  impactAvailability: number
): number {
  const iscBase = 1 - (1 - impactConfidentiality) * (1 - impactIntegrity) * (1 - impactAvailability);

  if (scope === Scope.UNCHANGED) {
    return 6.42 * iscBase;
  } else if (scope === Scope.CHANGED) {
    return 7.52 * (iscBase - 0.029) - 3.25 * Math.pow((iscBase - 0.02), 15);
  }

  return 0;
}

/**
 * Define a function to calculate exploitable Sub Score (ESS)
 * 
 * @param attackVector 
 * @param attackComplexity 
 * @param privilegesRequired 
 * @param userInteraction 
 * @returns 
 */
function calculateExploitableSubScore(
  attackVector: number,
  attackComplexity: number,
  privilegesRequired: number,
  userInteraction: number
): number {
  return 8.22 * attackVector * attackComplexity * privilegesRequired * userInteraction;
}

/**
 * Define a function to calculate Base Score
 * 
 * @param scope 
 * @param impactConfidentiality 
 * @param impactIntegrity 
 * @param impactAvailability 
 * @param attackVector 
 * @param attackComplexity 
 * @param privilegesRequired 
 * @param userInteraction 
 * @returns 
 */
export function calculateBaseScore(
  scope: Scope,
  impactConfidentiality: number,
  impactIntegrity: number,
  impactAvailability: number,
  attackVector: number,
  attackComplexity: number,
  privilegesRequired: number,
  userInteraction: number
): number {
  const isc = calculateImpactSubScore(scope, impactConfidentiality, impactIntegrity, impactAvailability);
  const ess = calculateExploitableSubScore(attackVector, attackComplexity, privilegesRequired, userInteraction);

  if (isc <= 0) {
    return 0;
  } else if (scope === Scope.UNCHANGED) {
    return parseFloat(Math.min(isc + ess, 10).toFixed(1));
  } else if (scope === Scope.CHANGED) {
    return parseFloat(Math.round(Math.min(1.08 * (isc + ess), 10)).toFixed(1));
  }

  return 0;
}
