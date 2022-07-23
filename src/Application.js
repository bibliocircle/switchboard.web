import React, { useEffect } from "react";
import NotFound from "./NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Home from "./Home";
import { useCookies } from "react-cookie";
import { DARK_THEME, getTheme, LIGHT_THEME } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { AUTH_COOKIE_NAME, THEME_COOKIE_NAME } from "./config";
import { useDispatch } from "react-redux";
import { loginCompleted } from "./store/slices/user";
import MockServices from "./MockServices/MockServices";
import Workspaces from "./Workspaces/Workspaces";
import Users from "./Users/Users";
import MockService from "./MockServices/MockService";
import PageHead from "./Common/PageHead";
import Workspace from "./Workspaces/Workspace";

const ColorModeContext = React.createContext({ onToggleColourMode: () => {} });

function Application() {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies([
    THEME_COOKIE_NAME,
    AUTH_COOKIE_NAME,
  ]);
  const [mode, setMode] = React.useState(
    cookies[THEME_COOKIE_NAME] || LIGHT_THEME
  );
  const token = cookies[AUTH_COOKIE_NAME];

  useEffect(() => {
    dispatch(loginCompleted(token));
  }, [token, dispatch]);

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
        <PageHead title="Switchboard" />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/"
              element={
                <Home
                  onToggleColourMode={currentColourMode.onToggleColourMode}
                  currentTheme={currentTheme}
                />
              }
            >
              <Route path="/mockservices" element={<MockServices />} />
              <Route path="/mockservice/:mockServiceId" element={<MockService />} />
              <Route path="/workspaces" element={<Workspaces />} />
              <Route path="/workspace/:workspaceId" element={<Workspace />} />
              <Route path="/users" element={<Users />} />
            </Route>
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Application;
