import type {
  GeocodingResponse,
  GeocodingResult,
  OpenMeteoForecastResponse,
  WeatherData,
} from '../types/weather';
import { getWeatherCondition } from '../utils/weatherCodes';

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

async function requestJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function searchLocation(query: string): Promise<GeocodingResult> {
  const params = new URLSearchParams({
    name: query,
    count: '1',
    language: 'en',
    format: 'json',
  });

  const data = await requestJson<GeocodingResponse>(`${GEOCODING_URL}?${params}`);
  const location = data.results?.[0];

  if (!location) {
    throw new Error('No location found. Try a nearby city or a more specific search.');
  }

  return location;
}

export async function getWeatherForLocation(location: GeocodingResult): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: 'temperature_2m,weather_code,wind_speed_10m,wind_direction_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    forecast_days: '7',
    timezone: 'auto',
  });

  const data = await requestJson<OpenMeteoForecastResponse>(`${FORECAST_URL}?${params}`);

  return {
    fetchedAt: new Date().toISOString(),
    locationName: location.name,
    country: location.country,
    current: {
      temperature: data.current.temperature_2m,
      unit: data.current_units.temperature_2m,
      condition: getWeatherCondition(data.current.weather_code),
      windSpeed: data.current.wind_speed_10m,
      windUnit: data.current_units.wind_speed_10m,
      windDirection: data.current.wind_direction_10m,
      windDirectionUnit: data.current_units.wind_direction_10m,
      observedAt: data.current.time,
    },
    forecast: data.daily.time.slice(1).map((date, index) => ({
      date,
      condition: getWeatherCondition(data.daily.weather_code[index + 1]),
      high: data.daily.temperature_2m_max[index + 1],
      low: data.daily.temperature_2m_min[index + 1],
    })),
  };
}

export async function getWeatherByCity(query: string): Promise<WeatherData> {
  const location = await searchLocation(query);
  return getWeatherForLocation(location);
}
