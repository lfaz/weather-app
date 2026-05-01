import { useNavigate, useSearchParams } from 'react-router-dom';
import { WeatherDashboard } from '../../features/weather/WeatherDashboard';
import { useWeather } from '../../hooks/useWeather';

const DEFAULT_CITY = 'Helsinki';

export function WeatherPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const city = searchParams.get('city') || DEFAULT_CITY;
  const weatherState = useWeather(city);

  function handleSearch(query: string): Promise<void> {
    const nextCity = query.trim();

    if (!nextCity) {
      return weatherState.search(query);
    }

    setSearchParams({ city: nextCity });
    return Promise.resolve();
  }

  function handleOpenForecast() {
    navigate(`/forecast?city=${encodeURIComponent(weatherState.data?.locationName ?? city)}`);
  }

  return (
    <WeatherDashboard
      {...weatherState}
      onOpenForecast={handleOpenForecast}
      search={handleSearch}
    />
  );
}
