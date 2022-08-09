import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import CodeSnippet from "../Common/CodeSnippet";
import ScenarioItem from "../MockServices/ScenarioItem";
import { DARK_THEME } from "../theme";

const InterceptionRule = styled(Accordion)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === DARK_THEME
      ? theme.palette.grey[800]
      : theme.palette.grey[50],
}));

export default function InterceptionRulesPanel({ rules, scenarioConfigs }) {
  const getScenario = (scenarioId) => {
    return scenarioConfigs?.find((sc) => sc.scenario.id === scenarioId)
      ?.scenario;
  };
  return (
    <Grid container spacing={2}>
      {!rules?.length && (
        <Grid item xs={12}>
          <Typography variant="body2">No interception rules</Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        {rules.map((r) => (
          <Grid item xs={12} key={r.id}>
            <InterceptionRule disableGutters>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="body1">{r.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2">
                          Matcher Expression
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <CodeSnippet>
                          {JSON.stringify(
                            JSON.parse(r.matcherExpression),
                            null,
                            2
                          )}
                        </CodeSnippet>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2">
                          Activated Scenario
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <ScenarioItem
                          sc={getScenario(r.targetScenarioId)}
                          expanded
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </InterceptionRule>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
