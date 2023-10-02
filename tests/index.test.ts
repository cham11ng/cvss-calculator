import { describe, it, expect } from "bun:test";

import Scope from '../src/types/Scope';
import { getCVSS31, calculateBaseScore } from '../src/utils';

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
  it('should calculate high correctly', () => {
    const baseScore = calculateBaseScore({
      scope: Scope.UNCHANGED,
      confidentiality: 0.56,
      integrity: 0,
      availability: 0,
      attackVector: 0.85,
      attackComplexity: 0.77,
      privilegeRequired: 0.85,
      userInteraction: 0.85
    });

    expect(baseScore).toBe(7.5)
  })

  it('should calculate medium correctly', () => {
    const baseScore = calculateBaseScore({
      "attackVector": 0.85,
      "attackComplexity": 0.44,
      "userInteraction": 0.85,
      "scope": "U",
      "confidentiality": 0.22,
      "integrity": 0.22,
      "availability": 0,
      "privilegeRequired": 0.62
    });

    expect(baseScore).toBe(4.2)
  })
})
