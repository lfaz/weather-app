import { ForecastIcon } from '../../components/ForecastIcon';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import type { WeatherData } from '../../types/weather';
import { formatForecastDate, formatTemperature } from '../../utils/formatters';
import styles from './ForecastViewer.module.css';
import dashboardStyles from './WeatherDashboard.module.css';

interface ForecastViewerProps {
  data: WeatherData | null;
  error: string | null;
  isLoading: boolean;
  isTransitioning: boolean;
  onBack: () => void;
}

export function ForecastViewer({
  data,
  error,
  isLoading,
  isTransitioning,
  onBack,
}: ForecastViewerProps) {
  if (isLoading && !data) {
    return <LoadingIndicator label="Loading forecast" />;
  }

  return (
    <div className={dashboardStyles.dashboard}>
      {error ? (
        <div className={dashboardStyles.toast} role="alert">
          {error}
        </div>
      ) : null}

      {data ? (
        <section
          className={`${styles.viewer} ${isTransitioning ? styles.transitioning : ''}`}
          aria-busy={isTransitioning}
          aria-label={`Forecast for ${data.locationName}`}
        >
          <div className={styles.hero}>
            <button className={styles.backButton} type="button" onClick={onBack}>
              Back
            </button>
            <div>
              <p className={styles.kicker}>Forecast viewer</p>
              <h1>{data.locationName}</h1>
              {data.country ? <p className={styles.country}>{data.country}</p> : null}
            </div>
            <div className={styles.currentPill}>
              <span>Now</span>
              <strong>{formatTemperature(data.current.temperature, data.current.unit)}</strong>
            </div>
          </div>

          <div className={styles.forecastGrid}>
            {data.forecast.map((day) => (
              <article className={styles.dayCard} key={day.date}>
                <ForecastIcon condition={day.condition} />
                <div className={styles.dayInfo}>
                  <p>{formatForecastDate(day.date)}</p>
                  <h2>{day.condition}</h2>
                </div>
                <div className={styles.temps}>
                  <span className={styles.high}>{formatTemperature(day.high, data.current.unit)}</span>
                  <span className={styles.low}>{formatTemperature(day.low, data.current.unit)}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
