import { getWeatherVisualVariant } from '../utils/weatherVisuals';
import styles from './ForecastIcon.module.css';

interface ForecastIconProps {
  condition: string;
}

export function ForecastIcon({ condition }: ForecastIconProps) {
  const variant = getWeatherVisualVariant(condition);

  return (
    <div className={`${styles.icon} ${styles[variant]}`} aria-hidden="true">
      <span />
    </div>
  );
}
