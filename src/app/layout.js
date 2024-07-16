"use client";

import StyledComponentsRegistry from "./lib/registry";
import ThemeProvider from "./lib/themeProvider";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>{children}</ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
