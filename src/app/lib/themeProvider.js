"use client";

import {
  createGlobalStyle,
  ThemeProvider as StyledComponentsThemeProvider,
} from "styled-components";
import { commonPalette } from "../../theme/colors";
// import { commonFonts } from "../../theme/font";

import { device } from "../../theme/mediaQuery";

function getTheme() {
  return {
    palette: {
      ...commonPalette,
    },
    // typography: {
    //   ...commonTypography,
    // },
    // fonts: {
    //   ...commonFonts,
    // },
    // pattern: {
    //   ...commonPatterns,
    // },
    // gradients: {
    //   ...gradients,
    // },
    // textshadows: {
    //   ...textshadows,
    // },
  };
}

export default function ThemeProvider({ children }) {
  const themeObject = getTheme();
  return (
    <StyledComponentsThemeProvider theme={themeObject}>
      {children}
    </StyledComponentsThemeProvider>
  );
}
