export const theme = {
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536
  },
  colors: {
   elevator: '#ffbdbc',
   floorBorders: '#a98686',
  },
};

export type ITheme = typeof theme;

export type IBreakpointsName = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
