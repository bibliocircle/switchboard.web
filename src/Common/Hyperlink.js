import { Link as MLink } from "@mui/material";
import { Link } from "react-router-dom";

export default function Hyperlink({ to, variant, color, children }) {
    return (
        <Link to={to}>
            <MLink color={color} variant={variant}>{children}</MLink>
        </Link>
    )
}
