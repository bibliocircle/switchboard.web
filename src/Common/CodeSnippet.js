import { styled } from "@mui/material";
import { DARK_THEME } from "../theme";

export default styled("div")(({ theme }) => ({
    fontFamily: "monospace",
    fontSize: 14,
    whiteSpace: "pre-wrap",
    backgroundColor: theme.palette.mode === DARK_THEME ? theme.palette.grey[800] : theme.palette.grey[200],
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2)
}))