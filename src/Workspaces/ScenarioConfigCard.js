import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Radio,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SCENARIO_TYPE_MAP } from "../config";
import {
  getScenarioDetails,
  getScenarioHeader,
  ScenarioType,
} from "../MockServices/ScenarioItem";

export default function ScenarioConfigCard({
  sc,
  expandable,
  onActivateScenario,
}) {
  const [active, setActive] = useState(false);
  const onClickActivateScenario = (e) => {
    setActive(true);
    e.preventDefault();
    e.stopPropagation();
    setTimeout(() => {
      onActivateScenario();
    });
  };

  useEffect(() => {
    setActive(sc.isActive);
  }, [sc]);
  return (
    <Accordion disableGutters>
      <AccordionSummary
        sx={{ cursor: expandable ? "pointer" : "default" }}
        expandIcon={expandable && <ExpandMoreIcon />}
      >
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={1}>
            <Radio checked={active} onClick={onClickActivateScenario} />
          </Grid>
          <Grid item xs={2}>
            <ScenarioType>{SCENARIO_TYPE_MAP[sc.scenario.type]}</ScenarioType>
          </Grid>
          <Grid item xs={9}>
            {getScenarioHeader(sc.scenario)}
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {getScenarioDetails(sc.scenario)}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" color={theme => theme.palette.grey[400]}>
              Scenario ID: {sc.scenario.id}
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
