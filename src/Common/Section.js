import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { DARK_THEME } from "../theme";

export default styled(Grid)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === DARK_THEME
        ? theme.palette.grey[900]
        : theme.palette.background.paper;
    return {
      backgroundColor,
      color: theme.palette.getContrastText(backgroundColor),
      padding: theme.spacing(3),
      height: "100%",
      borderRadius: theme.shape.borderRadius,
    };
  });