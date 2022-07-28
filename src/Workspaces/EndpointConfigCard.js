import {
  Card,
  CardContent,
  Chip,
  Grid,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { amber, blue, green, grey, purple, red } from "@mui/material/colors";
import React from "react";
import CodeSnippet from "../Common/CodeSnippet";
import { DARK_THEME } from "../theme";
import ScenarioConfigCard from "./ScenarioConfigCard";

const ScenariosContainer = styled(Grid)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.grey[200]}`,
  paddingRight: theme.spacing(2),
}));

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

export default function EndpointConfigCard({
  endpointConfig,
  onActivateScenario,
}) {
  const chipColour = chipColours[endpointConfig.endpoint.method] || grey[100];
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
                    label={endpointConfig.endpoint.method}
                  />
                </Grid>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="body1" fontWeight="bold">
                  {endpointConfig.endpoint.path}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </EndpointHeading>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <ScenariosContainer container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Scenarios</Typography>
              </Grid>
              <Grid item xs={12}>
                {endpointConfig.scenarioConfigs.map((sc) => (
                  <ScenarioConfigCard
                    onActivateScenario={() => onActivateScenario(sc.scenario.id)}
                    key={sc.scenario.id}
                    sc={sc}
                    expandable={sc.scenario.type !== "NETWORK"}
                  />
                ))}
              </Grid>
            </ScenariosContainer>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Rules</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <CodeSnippet>No rules configured</CodeSnippet>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Response Delay</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      value={endpointConfig.responseDelay}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
