import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { mockWeather } from '../../test/testUtils';
import { WeatherDashboard } from './WeatherDashboard';

describe('WeatherDashboard', () => {
  it('shows only a loading indicator during initial load', () => {
    render(
      <WeatherDashboard
        data={null}
        error={null}
        isLoading
        isTransitioning={false}
        onOpenForecast={vi.fn()}
        search={vi.fn()}
      />,
    );

    expect(screen.getByRole('status', { name: /loading weather/i })).toBeInTheDocument();
    expect(screen.queryByRole('search')).not.toBeInTheDocument();
    expect(screen.queryByText(/Helsinki/i)).not.toBeInTheDocument();
  });

  it('renders weather details and opens the forecast action', async () => {
    const user = userEvent.setup();
    const onOpenForecast = vi.fn();

    render(
      <WeatherDashboard
        data={mockWeather}
        error={null}
        isLoading={false}
        isTransitioning={false}
        onOpenForecast={onOpenForecast}
        search={vi.fn()}
      />,
    );

    expect(screen.getByText('Helsinki')).toBeInTheDocument();
    expect(screen.getByText('Partly cloudy')).toBeInTheDocument();
    expect(screen.getByText('18°C')).toBeInTheDocument();
    expect(screen.getByText(/12 km\/h/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /view forecast/i }));

    expect(onOpenForecast).toHaveBeenCalledTimes(1);
  });

  it('calls search with the entered city', async () => {
    const user = userEvent.setup();
    const search = vi.fn().mockResolvedValue(undefined);

    render(
      <WeatherDashboard
        data={mockWeather}
        error={null}
        isLoading={false}
        isTransitioning={false}
        onOpenForecast={vi.fn()}
        search={search}
      />,
    );

    await user.type(screen.getByRole('searchbox', { name: /search location/i }), 'Amsterdam');
    await user.click(screen.getByRole('button', { name: /go/i }));

    expect(search).toHaveBeenCalledWith('Amsterdam');
  });

  it('renders validation errors as a toast', () => {
    render(
      <WeatherDashboard
        data={mockWeather}
        error="Enter a city to search."
        isLoading={false}
        isTransitioning={false}
        onOpenForecast={vi.fn()}
        search={vi.fn()}
      />,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Enter a city to search.');
  });
});
