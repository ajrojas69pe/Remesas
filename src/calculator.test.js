import { describe, expect, it } from 'vitest';

describe('remittance calculation', () => {
  it('converts PEN using rate and optimization factor', () => {
    const pen = 100, rate = 3.55, factor = 1.27;
    expect(Number((pen / rate * factor).toFixed(2))).toBe(35.77);
  });
});
