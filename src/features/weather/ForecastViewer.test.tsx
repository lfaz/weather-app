import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { mockWeather } from '../../test/testUtils';
import { ForecastViewer } from './ForecastViewer';

describe('ForecastViewer', () => {
  it('shows only a loading indicator during initial load', () => {
    render(
      <ForecastViewer
        data={null}
        error={null}
        isLoading
        isTransitioning={false}
        onBack={vi.fn()}
      />,
    );

    expect(screen.getByRole('status', { name: /loading forecast/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument();
  });

  it('renders the forecast viewer and all forecast days', () => {
    render(
      <ForecastViewer
        data={mockWeather}
        error={null}
        isLoading={false}
        isTransitioning={false}
        onBack={vi.fn()}
      />,
    );

    expect(screen.getByText('Forecast viewer')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Helsinki' })).toBeInTheDocument();
    expect(screen.getByText('Slight rain')).toBeInTheDocument();
    expect(screen.getByText('Thunderstorm')).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(mockWeather.forecast.length);
  });

  it('calls onBack from the back button', async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();

    render(
      <ForecastViewer
        data={mockWeather}
        error={null}
        isLoading={false}
        isTransitioning={false}
        onBack={onBack}
      />,
    );

    await user.click(screen.getByRole('button', { name: /back/i }));

    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
