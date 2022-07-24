import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Grid, styled, Typography } from "@mui/material";
import React from "react";
import CodeSnippet from "../Common/CodeSnippet";
import { SCENARIO_TYPE_MAP } from "../config";
import { DARK_THEME } from "../theme";
import { getStatusCodeText } from "../utils/httpStatusCodes";

const ScenarioType = styled("div")(({ theme }) => ({
    padding: theme.spacing(0.5),
    backgroundColor:
      theme.palette.mode === DARK_THEME
        ? theme.palette.grey[700]
        : theme.palette.grey[200],
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: theme.shape.borderRadius,
  }));

const getScenarioHeader = (sc) => {
  switch (sc.type) {
    case "HTTP_RESPONSE":
      return (
        <Typography variant="body2">
          {`${sc.httpResponseScenarioConfig.statusCode} ${getStatusCodeText(
            sc.httpResponseScenarioConfig.statusCode
          )}`}
        </Typography>
      );
    case "PROXY":
      return (
        <Typography variant="body2">{sc.proxyScenarioConfig.name}</Typography>
      );
    case "NETWORK":
      return (
        <Typography variant="body2">{sc.networkScenarioConfig.type}</Typography>
      );
    default:
      return null;
  }
};

const getScenarioDetails = (sc) => {
  switch (sc.type) {
    case "HTTP_RESPONSE":
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  Response Headers Template
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <CodeSnippet sx={{ whiteSpace: "pre-wrap" }}>
                  {sc.httpResponseScenarioConfig.responseHeadersTemplate ||
                    "<none>"}
                </CodeSnippet>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  Response Body Template
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <CodeSnippet sx={{ whiteSpace: "pre-wrap" }}>
                  {sc.httpResponseScenarioConfig.responseBodyTemplate ||
                    "<none>"}
                </CodeSnippet>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    case "PROXY":
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Upstream URL</Typography>
              </Grid>
              <Grid item xs={12}>
                <CodeSnippet sx={{ whiteSpace: "pre-wrap" }}>
                  {sc.proxyScenarioConfig.upstream.url}
                </CodeSnippet>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  Inject Upstream Request Headers
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <CodeSnippet sx={{ whiteSpace: "pre-wrap" }}>
                  {sc.proxyScenarioConfig.injectHeaders.map(
                    ({ name, value }) => `${name}: "${value}"\n`
                  )}
                </CodeSnippet>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    default:
      return null;
  }
};

export default function ScenarioItem({ sc, expandable }) {
  return (
    <Accordion disableGutters>
      <AccordionSummary sx={{ cursor: expandable ? "pointer" : "default"}} expandIcon={expandable && <ExpandMoreIcon />}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={2}>
            <ScenarioType>{SCENARIO_TYPE_MAP[sc.type]}</ScenarioType>
          </Grid>
          <Grid item xs={10}>
            {getScenarioHeader(sc)}
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>{getScenarioDetails(sc)}</AccordionDetails>
    </Accordion>
  );
}
