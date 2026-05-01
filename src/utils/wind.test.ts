import { describe, expect, it } from 'vitest';
import { getWindDirectionClass, getWindDirectionLabel } from './wind';

describe('wind direction helpers', () => {
  it.each([
    [0, 'N', 'north'],
    [45, 'NE', 'northEast'],
    [90, 'E', 'east'],
    [180, 'S', 'south'],
    [270, 'W', 'west'],
    [359, 'N', 'north'],
  ] as const)('maps %d degrees to %s', (degrees, label, className) => {
    expect(getWindDirectionLabel(degrees)).toBe(label);
    expect(getWindDirectionClass(degrees)).toBe(className);
  });
});
