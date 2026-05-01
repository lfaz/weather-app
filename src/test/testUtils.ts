import type { WeatherData } from '../types/weather';

export const mockWeather: WeatherData = {
  fetchedAt: '2026-05-01T12:00:00.000Z',
  locationName: 'Helsinki',
  country: 'Finland',
  current: {
    temperature: 18,
    unit: '°C',
    condition: 'Partly cloudy',
    windSpeed: 12,
    windUnit: 'km/h',
    windDirection: 45,
    windDirectionUnit: '°',
    observedAt: '2026-05-01T12:00',
  },
  forecast: [
    {
      date: '2026-05-02',
      condition: 'Slight rain',
      high: 19,
      low: 11,
    },
    {
      date: '2026-05-03',
      condition: 'Clear sky',
      high: 21,
      low: 12,
    },
    {
      date: '2026-05-04',
      condition: 'Overcast',
      high: 17,
      low: 10,
    },
    {
      date: '2026-05-05',
      condition: 'Thunderstorm',
      high: 16,
      low: 9,
    },
  ],
};
