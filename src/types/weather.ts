export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  timezone?: string;
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
  generationtime_ms: number;
}

export interface OpenMeteoForecastResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: {
    time: string;
    temperature_2m: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    weather_code: number;
  };
  current_units: {
    temperature_2m: string;
    wind_speed_10m: string;
    wind_direction_10m: string;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
  daily_units: {
    temperature_2m_max: string;
    temperature_2m_min: string;
  };
}

export interface ForecastDay {
  date: string;
  condition: string;
  high: number;
  low: number;
}

export interface WeatherData {
  fetchedAt: string;
  locationName: string;
  country?: string;
  current: {
    temperature: number;
    unit: string;
    condition: string;
    windSpeed: number;
    windUnit: string;
    windDirection: number;
    windDirectionUnit: string;
    observedAt: string;
  };
  forecast: ForecastDay[];
}
