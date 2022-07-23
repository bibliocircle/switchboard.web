import {
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { amber, blue, green, grey, purple, red } from "@mui/material/colors";
import React from "react";
import { getStatusCodeText } from "../utils/httpStatusCodes";

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

export default function EndpointCard({ endpoint }) {
  const chipColour = chipColours[endpoint.method] || grey[100];
  const scenarioGrouping = endpoint.scenarios.reduce((result, sc) => {
    if (!Array.isArray(result[sc.type])) {
      result[sc.type] = [sc];
    } else {
      result[sc.type].push(sc);
    }
    return result;
  }, {});
  const httpResponseScenarios = scenarioGrouping["HTTP_RESPONSE"] || [];
  const proxyScenarios = scenarioGrouping["PROXY"] || [];
  const networkScenarios = scenarioGrouping["NETWORK"] || [];
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={2}>
                <Grid container alignItems="center">
                  <MethodChip
                    sx={{
                      backgroundColor: chipColour,
                      color: (theme) =>
                        theme.palette.getContrastText(chipColour),
                    }}
                    label={endpoint.method}
                  ></MethodChip>
                </Grid>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="body1" fontWeight="bold">
                  {endpoint.path}
                </Typography>
                {endpoint.description && (
                  <Typography variant="caption" color="GrayText">
                    {endpoint.description}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {!!httpResponseScenarios.length && (
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">
                    HTTP Response Scenarios
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <ul>
                    {httpResponseScenarios.map((sc) => (
                      <li key={sc.id}>
                        <Typography variant="body2">
                          {`${
                            sc.httpResponseScenarioConfig.statusCode
                          } ${getStatusCodeText(
                            sc.httpResponseScenarioConfig.statusCode
                          )}`}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Grid>
              </Grid>
            </Grid>
          )}
          {!!proxyScenarios.length && (
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Proxy Scenarios</Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
          {!!networkScenarios.length && (
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">
                    Network Condition Scenarios
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}
