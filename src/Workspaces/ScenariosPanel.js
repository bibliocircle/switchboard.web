import { Grid } from "@mui/material";
import React from "react";
import ScenarioConfigCard from "./ScenarioConfigCard";

export default function ScenariosPanel({
  scenarioConfigs,
  onActivateScenario,
}) {
  return (
    <Grid container>
        <Grid item xs={12}>
          {scenarioConfigs.map((sc) => (
            <ScenarioConfigCard
              onActivateScenario={() => onActivateScenario(sc.scenario.id)}
              key={sc.scenario.id}
              sc={sc}
              expandable={sc.scenario.type !== "NETWORK"}
            />
          ))}
        </Grid>
      </Grid>
  );
}
