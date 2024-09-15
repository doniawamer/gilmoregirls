import StyledComponentsRegistry from "./lib/registry";
import ThemeProvider from "./lib/themeProvider";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "Stars Hallow Books",
  description: "All the books mentioned on Gilmore Girls!",
};
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
