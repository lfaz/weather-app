import type { WeatherData } from '../types/weather';
import { formatForecastDate, formatTemperature } from '../utils/formatters';
import { getWindDirectionClass, getWindDirectionLabel } from '../utils/wind';
import { useElapsedTime } from '../hooks/useElapsedTime';
import { ForecastIcon } from './ForecastIcon';
import { WeatherVisual } from './WeatherVisual';
import styles from './WeatherCard.module.css';

interface WeatherCardProps {
  isTransitioning?: boolean;
  onOpenForecast?: () => void;
  weather: WeatherData;
}

export function WeatherCard({ isTransitioning = false, onOpenForecast, weather }: WeatherCardProps) {
  const checkedAgo = useElapsedTime(weather.fetchedAt);
  const windDirectionClass = getWindDirectionClass(weather.current.windDirection);
  const windDirectionLabel = getWindDirectionLabel(weather.current.windDirection);

  return (
    <article
      className={`${styles.card} ${isTransitioning ? styles.transitioning : ''}`}
      aria-busy={isTransitioning}
      aria-label={`Weather for ${weather.locationName}`}
    >
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.location}>
            {weather.locationName}
            {weather.country ? <span>{weather.country}</span> : null}
          </p>
          <p className={styles.condition}>{weather.current.condition}</p>
          <p className={styles.temperature}>
            {formatTemperature(weather.current.temperature, weather.current.unit)}
          </p>
        </div>
        <WeatherVisual condition={weather.current.condition} isActive={isTransitioning} />
      </div>

      <div className={styles.metrics} aria-label="Current weather details">
        <div className={styles.metric}>
          <span>Wind</span>
          <div className={styles.windMetric}>
            <strong>
              {Math.round(weather.current.windSpeed)} {weather.current.windUnit}
            </strong>
            <span className={styles.windMeta}>
              <span
                className={`${styles.windArrow} ${styles[windDirectionClass]}`}
                aria-hidden="true"
              >
                ↑
              </span>
              {windDirectionLabel} {Math.round(weather.current.windDirection)}
              {weather.current.windDirectionUnit}
            </span>
          </div>
        </div>
        <div className={styles.metric}>
          <span>Live check</span>
          <strong>{checkedAgo}</strong>
        </div>
      </div>

      <section className={styles.forecastSection} aria-label="Forecast">
        <div className={styles.forecastHeader}>
          <h2>Next days</h2>
          {onOpenForecast ? (
            <button className={styles.forecastButton} type="button" onClick={onOpenForecast}>
              View forecast
            </button>
          ) : (
            <span>High / low</span>
          )}
        </div>
        <div className={styles.forecastList}>
          {weather.forecast.slice(0, 3).map((day) => (
              <div className={styles.forecastRow} key={day.date}>
                <ForecastIcon condition={day.condition} />
                <div>
                  <p className={styles.forecastDate}>{formatForecastDate(day.date)}</p>
                  <strong className={styles.forecastCondition}>{day.condition}</strong>
                </div>
                <div className={styles.forecastTemps}>
                  <span className={styles.highTemp}>{formatTemperature(day.high, weather.current.unit)}</span>
                  <span className={styles.lowTemp}>{formatTemperature(day.low, weather.current.unit)}</span>
                </div>
              </div>
          ))}
        </div>
      </section>
    </article>
  );
}
