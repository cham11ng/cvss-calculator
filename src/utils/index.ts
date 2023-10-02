import Scope from '../types/Scope';
import MetricParam from '../types/MetricParam';

import { severityRatings } from '../config';

/**
 * Get CVSS 3.1 representation.
 * 
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
 * @param confidentiality 
 * @param integrity 
 * @param availability 
 * @returns 
 */
function calculateImpactSubScore(
  scope: Scope,
  confidentiality: number,
  integrity: number,
  availability: number
): number {
  const iscBase = 1 - (1 - confidentiality) * (1 - integrity) * (1 - availability);

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
 * Define a function to calculate Base Score.
 */
export function calculateBaseScore(
  params
): number {
  const {
    scope,
    confidentiality,
    integrity,
    availability,
    attackVector,
    attackComplexity,
    privilegeRequired,
    userInteraction
  } = params;
  const isc = calculateImpactSubScore(scope, confidentiality, integrity, availability);
  const ess = calculateExploitableSubScore(attackVector, attackComplexity, privilegeRequired, userInteraction);

  if (isc <= 0) {
    return 0;
  } else if (scope === Scope.UNCHANGED) {
    return parseFloat((Math.ceil(Math.min(isc + ess, 10) * 10) / 10).toFixed(1));
  } else if (scope === Scope.CHANGED) {
    return parseFloat((Math.ceil(Math.min(1.08 * (isc + ess), 10) * 10) / 10).toFixed(1));
  }

  return 0;
}

/**
 * Get scope weight.
 * 
 * @param scope 
 * @param privilegeValue 
 * @returns 
 */
export function getWeight(scope, privilegeValue) {
  const weight = {
    [Scope.UNCHANGED]: {
      N: 0.85,
      L: 0.62,
      H: 0.27
    },
    [Scope.CHANGED]: {
      N: 0.85,
      L: 0.68,
      H: 0.5
    }
  }

  try {
    return weight[scope][privilegeValue];
  } catch (err) {
    return privilegeValue
  }
}

/**
 * Check severity.
 * 
 * @param score 
 * @returns 
 */
export function checkSeverity(score) {
  for (const rating of severityRatings) {
    if (score >= rating.bottom && score <= rating.top) {
      return rating;
    }
  }
  return {
    name: "?",
    bottom: 'Not',
    top: 'defined'
  };
};
