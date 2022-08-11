import {
  Card,
  CardContent,
  Chip,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { amber, blue, green, grey, purple, red } from "@mui/material/colors";
import React from "react";
import { DARK_THEME } from "../theme";
import ScenarioItem from "./ScenarioItem";

const CHIP_COLOUR_INTENSITY = 100;
const chipColours = {
  GET: green[CHIP_COLOUR_INTENSITY],
  POST: purple[CHIP_COLOUR_INTENSITY],
  DELETE: red[CHIP_COLOUR_INTENSITY],
  PUT: amber[CHIP_COLOUR_INTENSITY],
  PATCH: blue[CHIP_COLOUR_INTENSITY],
  OPTIONS: grey[CHIP_COLOUR_INTENSITY],
};

const MethodChip = styled(Chip)(({ theme }) => ({
  width: "100%",
  borderRadius: theme.shape.borderRadius,
  fontWeight: "bold",
}));

const EndpointHeading = styled(Grid)(({ theme }) => ({
  background:
    theme.palette.mode === DARK_THEME
      ? `linear-gradient(to right, ${theme.palette.grey[600]}, ${theme.palette.grey[700]})`
      : `linear-gradient(to right, ${theme.palette.grey[400]}, ${theme.palette.grey[300]})`,
  padding: theme.spacing(2),
}));

export default function EndpointCard({ endpoint }) {
  const chipColour = chipColours[endpoint.method] || grey[100];
  return (
    <Card>
      <EndpointHeading item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2}>
                <Grid container alignItems="center">
                  <MethodChip
                    sx={{
                      backgroundColor: chipColour,
                      color: (theme) =>
                        theme.palette.getContrastText(chipColour),
                    }}
                    label={endpoint.method}
                  />
                </Grid>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="body1" fontWeight="bold">
                  {endpoint.path}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </EndpointHeading>
      <CardContent>
        {endpoint.scenarios.map((sc) => (
          <ScenarioItem sc={sc} expandable={sc.type !== "NETWORK"} />
        ))}
      </CardContent>
    </Card>
  );
}
