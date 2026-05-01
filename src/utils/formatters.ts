export function formatTemperature(value: number, unit = 'C'): string {
  return `${Math.round(value)}°${unit.replace('°', '')}`;
}

export function formatForecastDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(new Date(`${value}T00:00:00`));
}

export function formatObservationTime(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}
