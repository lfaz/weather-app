import { LoadingIndicator } from '../../components/LoadingIndicator';
import { SearchInput } from '../../components/SearchInput';
import { WeatherCard } from '../../components/WeatherCard';
import type { WeatherData } from '../../types/weather';
import styles from './WeatherDashboard.module.css';

interface WeatherDashboardProps {
  data: WeatherData | null;
  error: string | null;
  isLoading: boolean;
  isTransitioning: boolean;
  onOpenForecast: () => void;
  search: (query: string) => Promise<void>;
}

export function WeatherDashboard({
  data,
  error,
  isLoading,
  isTransitioning,
  onOpenForecast,
  search,
}: WeatherDashboardProps) {
  if (isLoading && !data) {
    return <LoadingIndicator label="Loading weather" />;
  }

  return (
    <div className={styles.dashboard}>
      <SearchInput
        className={styles.searchDock}
        isLoading={isLoading}
        onSearch={(query) => void search(query)}
      />

      {error ? (
        <div className={styles.toast} role="alert">
          {error}
        </div>
      ) : null}

      {data ? (
        <WeatherCard
          isTransitioning={isTransitioning}
          onOpenForecast={onOpenForecast}
          weather={data}
        />
      ) : null}
    </div>
  );
}
