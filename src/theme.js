import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    mojito: "linear-gradient(to right, #093028, #237a57)",
    primary: {
      dark: "#093028",
      main: "#16543F",
      light: "#237A57",
    }
  },
  shadows: ["none"]
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    mojito: "linear-gradient(to right, #1d976c, #93f9b9)",
    primary: {
      dark: "#1D976C",
      main: "#56C691",
      light: "#93F9B9"
    }
  },
  shadows: new Array(10).fill("none")
});

export const LIGHT_THEME = "light";
export const DARK_THEME = "dark";

export const getTheme = (mode) => {
  if (mode === LIGHT_THEME) {
    return lightTheme;
  }
  return darkTheme;
};
