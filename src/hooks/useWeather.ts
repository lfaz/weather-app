import { useCallback, useEffect, useState } from 'react';
import { getWeatherByCity } from '../services/weatherService';
import type { WeatherData } from '../types/weather';

interface UseWeatherState {
  data: WeatherData | null;
  error: string | null;
  isLoading: boolean;
  isTransitioning: boolean;
  search: (query: string) => Promise<void>;
}

const DEFAULT_CITY = 'Helsinki';
const AUTO_REFRESH_MS = 60000;
const SEARCH_TRANSITION_MS = 1000;

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

export function useWeather(initialCity = DEFAULT_CITY): UseWeatherState {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeCity, setActiveCity] = useState(initialCity);

  const fetchWeather = useCallback(async (query: string, withTransition: boolean) => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setError('Enter a city to search.');
      return;
    }

    if (withTransition) {
      setIsLoading(true);
      setIsTransitioning(true);
    }

    setError(null);

    try {
      const [weather] = await Promise.all(
        withTransition
          ? [getWeatherByCity(trimmedQuery), wait(SEARCH_TRANSITION_MS)]
          : [getWeatherByCity(trimmedQuery)],
      );

      setData(weather);
      setActiveCity(trimmedQuery);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load weather.');
    } finally {
      if (withTransition) {
        setIsLoading(false);
        setIsTransitioning(false);
      }
    }
  }, []);

  const search = useCallback(
    async (query: string) => {
      await fetchWeather(query, true);
    },
    [fetchWeather],
  );

  useEffect(() => {
    void search(initialCity);
  }, [initialCity, search]);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      void fetchWeather(activeCity, false);
    }, AUTO_REFRESH_MS);

    return () => window.clearInterval(timerId);
  }, [activeCity, fetchWeather]);

  return { data, error, isLoading, isTransitioning, search };
}
