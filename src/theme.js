import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    mojito: "linear-gradient(to right, #616161, #9bc5c3)",
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    mojito: "linear-gradient(to right, #1d976c, #93f9b9)",
  },
});

export const LIGHT_THEME = "light";
export const DARK_THEME = "dark";
export const THEME_COOKIE_NAME = "sb_theme";

export const getTheme = (mode) => {
  if (mode === LIGHT_THEME) {
    return lightTheme;
  }
  return darkTheme;
};
