import { describe, it, expect } from "bun:test";

import Scope from '../src/types/Scope';
import { getCVSS31, calculateBaseScore } from '../src/utils/cvss';

describe("getCVSS31()", () => {
  it('should successfully return CVSS 3.1 metric if nothing passed.', () => {
    expect(getCVSS31({})).toBe('CVSS:3.1/AV:_/AC:_/PR:_/UI:_/S:_/C:_/I:_/A:_');
  })

  it('should successfully return CVSS 3.1 metric if passed', () => {
    expect(getCVSS31({
      attackVector: 'N',
      attackComplexity: 'L',
      privilegeRequired: 'N',
      userInteraction: 'N',
      scope: 'U',
      confidentiality: 'H',
      integrity: 'N',
      availability: 'N'
    })).toBe('CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N')
  })
});

describe("calculateBaseScore()", () => {
  it('should calculate', () => {
    const scope = Scope.UNCHANGED;
    const impactConfidentiality = 0.56;
    const impactIntegrity = 0;
    const impactAvailability = 0;
    const attackVector = 0.85;
    const attackComplexity = 0.77;
    const privilegesRequired = 0.85;
    const userInteraction = 0.85;

    const baseScore = calculateBaseScore(
      scope,
      impactConfidentiality,
      impactIntegrity,
      impactAvailability,
      attackVector,
      attackComplexity,
      privilegesRequired,
      userInteraction
    );

    console.log(`Base Score: ${baseScore}`);
    expect(baseScore).toBe(7.5)
  })
})
