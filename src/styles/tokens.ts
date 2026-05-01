export const tokens = {
  colors: {
    background: '#eef7ff',
    surface: '#ffffff',
    surfaceMuted: '#f3f8ff',
    text: '#152033',
    textMuted: '#66758f',
    accent: '#3563e9',
    accentStrong: '#2448b8',
    border: '#d9e6f7',
    danger: '#b42318',
    dangerSurface: '#fff1f0',
  },
  spacing: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.5rem',
    6: '2rem',
    7: '3rem',
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    sizeSm: '0.875rem',
    sizeBase: '1rem',
    sizeLg: '1.125rem',
    sizeXl: '1.375rem',
    weightMedium: 500,
    weightBold: 700,
    lineHeightRelaxed: 1.65,
  },
  radius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
  },
  shadow: {
    lg: '0 1.5rem 4rem rgba(42, 74, 130, 0.18)',
  },
} as const;
