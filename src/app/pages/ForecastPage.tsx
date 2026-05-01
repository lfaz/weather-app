import { useNavigate, useSearchParams } from 'react-router-dom';
import { ForecastViewer } from '../../features/weather/ForecastViewer';
import { useWeather } from '../../hooks/useWeather';

const DEFAULT_CITY = 'Helsinki';

export function ForecastPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const city = searchParams.get('city') || DEFAULT_CITY;
  const weatherState = useWeather(city);

  function handleBack() {
    navigate(`/?city=${encodeURIComponent(weatherState.data?.locationName ?? city)}`);
  }

  return (
    <ForecastViewer
      {...weatherState}
      onBack={handleBack}
    />
  );
}
