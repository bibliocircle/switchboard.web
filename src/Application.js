import React from "react";
import NotFound from "./NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Dashboard from "./Dashboard";
import { useCookies } from "react-cookie";
import { DARK_THEME, getTheme, LIGHT_THEME, THEME_COOKIE_NAME } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const ColorModeContext = React.createContext({ onToggleColourMode: () => {} });

function Application() {
  const [cookies, setCookie] = useCookies(["sb_theme"]);
  const [mode, setMode] = React.useState(
    cookies[THEME_COOKIE_NAME] || LIGHT_THEME
  );
  const currentColourMode = React.useMemo(
    () => ({
      onToggleColourMode: () => {
        setMode((prevMode) => {
          const nextMode = prevMode === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
          setCookie(THEME_COOKIE_NAME, nextMode, { path: "/" });
          return nextMode;
        });
      },
    }),
    [setCookie]
  );

  const currentTheme = React.useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={currentColourMode}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/"
              element={
                <Dashboard
                  onToggleColourMode={currentColourMode.onToggleColourMode}
                  currentTheme={currentTheme}
                />
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Application;
