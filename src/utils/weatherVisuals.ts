export type WeatherVisualVariant = 'clear' | 'cloudy' | 'rain' | 'snow' | 'storm' | 'fog';

export function getWeatherVisualVariant(condition: string): WeatherVisualVariant {
  const normalizedCondition = condition.toLowerCase();

  if (normalizedCondition.includes('thunder')) {
    return 'storm';
  }

  if (normalizedCondition.includes('snow')) {
    return 'snow';
  }

  if (normalizedCondition.includes('rain') || normalizedCondition.includes('drizzle')) {
    return 'rain';
  }

  if (normalizedCondition.includes('fog')) {
    return 'fog';
  }

  if (normalizedCondition.includes('cloud') || normalizedCondition.includes('overcast')) {
    return 'cloudy';
  }

  return 'clear';
}
