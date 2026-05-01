import { getWeatherVisualVariant } from '../utils/weatherVisuals';
import styles from './WeatherVisual.module.css';

interface WeatherVisualProps {
  condition: string;
  isActive?: boolean;
}

export function WeatherVisual({ condition, isActive = false }: WeatherVisualProps) {
  const variant = getWeatherVisualVariant(condition);

  return (
    <div
      className={`${styles.visual} ${styles[variant]} ${isActive ? styles.active : ''}`}
      aria-hidden="true"
    >
      <span className={styles.sun} />
      <span className={styles.cloudLarge} />
      <span className={styles.cloudSmall} />
      <span className={styles.weatherMark} />
      <span className={styles.weatherMarkSecondary} />
      <span className={styles.horizon} />
    </div>
  );
}
