export const tokens = {
  colors: {
    dark: {
      bg0: '#0A0A0C',
      bg1: '#141418',
      bg2: '#1C1C22',
      bg3: '#26262E',
      fg0: '#FAFAFC',
      fg1: '#C8C8D2',
      fg2: '#8A8A96',
      fg3: '#5A5A66',
    },
    light: {
      bg0: '#FAFAFC',
      bg1: '#F2F2F6',
      bg2: '#E8E8EE',
      bg3: '#DCDCE4',
      fg0: '#0A0A0C',
      fg1: '#2A2A34',
      fg2: '#5A5A66',
      fg3: '#8A8A96',
    },
    shared: {
      accent: '#3B82F6',
      accent2: '#A78BFA',
      success: '#22C55E',
      warn: '#F59E0B',
      danger: '#EF4444',
    }
  },
  typography: {
    displayXl: { family: 'Outfit', weight: 800, size: '72px', lineheight: 1.02 },
    displayL: { family: 'Outfit', weight: 700, size: '48px', lineheight: 1.08 },
    headingM: { family: 'Outfit', weight: 600, size: '28px', lineheight: 1.2 },
    headingS: { family: 'Outfit', weight: 600, size: '20px', lineheight: 1.25 },
    bodyL: { family: 'Inter', weight: 400, size: '18px', lineheight: 1.5 },
    bodyM: { family: 'Inter', weight: 400, size: '16px', lineheight: 1.5 },
    bodyS: { family: 'Inter', weight: 400, size: '14px', lineheight: 1.45 },
    label: { family: 'Inter', weight: 600, size: '12px', lineheight: 1.2, tracking: '0.08em' },
    mono: { family: 'JetBrains Mono', weight: 500, size: '14px', lineheight: 1.35 },
  },
  spacing: {
    4: '0.25rem',
    8: '0.5rem',
    12: '0.75rem',
    16: '1rem',
    24: '1.5rem',
    32: '2rem',
    48: '3rem',
    64: '4rem',
    96: '6rem',
  },
  motion: {
    easeSoft: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    durationMicro: '120ms',
    durationStandard: '220ms',
    durationPage: '400ms',
  }
};
