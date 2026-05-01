import { describe, expect, it } from 'vitest';
import { getWeatherVisualVariant } from './weatherVisuals';

describe('getWeatherVisualVariant', () => {
  it.each([
    ['Clear sky', 'clear'],
    ['Partly cloudy', 'cloudy'],
    ['Slight rain', 'rain'],
    ['Dense drizzle', 'rain'],
    ['Heavy snow', 'snow'],
    ['Thunderstorm with hail', 'storm'],
    ['Fog', 'fog'],
  ] as const)('maps %s to %s', (condition, variant) => {
    expect(getWeatherVisualVariant(condition)).toBe(variant);
  });
});
