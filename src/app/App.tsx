import { Navigate, Route, Routes } from 'react-router-dom';
import { ForecastPage } from './pages/ForecastPage';
import { WeatherPage } from './pages/WeatherPage';
import styles from './App.module.css';

export function App() {
  return (
    <main className={styles.appShell}>
      <section className={styles.panel} aria-label="Weather app">
        <Routes>
          <Route path="/" element={<WeatherPage />} />
          <Route path="/forecast" element={<ForecastPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </section>
    </main>
  );
}
