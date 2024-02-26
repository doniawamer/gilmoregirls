const BREAKPOINTS = {
    xs: 320,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
    xxxl: 1920,
    ultraXl: 3840
  };
  
  const size = {
    xs: BREAKPOINTS.xs,
    sm: BREAKPOINTS.sm,
    md: BREAKPOINTS.md,
    lg: BREAKPOINTS.lg,
    xl: BREAKPOINTS.xl,
    xxl: BREAKPOINTS.xxl,
    xxxl: BREAKPOINTS.xxxl,
    ultraXl: BREAKPOINTS.ultraXl
  };
  
  const device = {
    xs: `min-width: ${size.xs}px`,
    sm: `min-width: ${size.sm}px`,
    md: `min-width: ${size.md}px`,
    lg: `min-width: ${size.lg}px`,
    xl: `min-width: ${size.xl}px`,
    xxl: `min-width: ${size.xxl}px`,
    xxxl: `min-width: ${size.xxxl}px`,
    ultraXl: `min-width: ${size.ultraXl}px`
  };
  
  
  export { size, device };