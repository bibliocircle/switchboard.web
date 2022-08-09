import {
  Card,
  CardContent,
  Chip,
  Grid,
  styled,
  Tooltip,
  Tab,
  Typography,
  Box,
} from "@mui/material";
import AnimationIcon from "@mui/icons-material/Animation";
import CommitIcon from "@mui/icons-material/Commit";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { amber, blue, green, grey, purple, red } from "@mui/material/colors";
import React, { useState } from "react";
import { DARK_THEME } from "../theme";
import InterceptionRulesPanel from "./InterceptionRulesPanel";
import ScenariosPanel from "./ScenariosPanel";
import EndpointGeneralSettingsPanel from "./EndpointGeneralSettingPanel";
import { Settings as SettingsIcon } from "@mui/icons-material";

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

const SCENARIOS_TAB = "SCENARIOS_TAB";
const INTERCEPTION_RULES_TAB = "INTERCEPTION_RULES_TAB";
const GENERAL_SETTINGS_TAB = "GENERAL_SETTINGS_PANEL";

export default function EndpointConfigCard({
  endpointConfig,
  onActivateScenario,
}) {
  const [activeTab, setActiveTab] = useState(SCENARIOS_TAB);
  const chipColour = chipColours[endpointConfig.endpoint.method] || grey[100];

  const onChangeTab = (e, newTabId) => {
    setActiveTab(newTabId);
  };

  return (
    <Card>
      <Tooltip title={`Endpoint ID: ${endpointConfig.endpoint.id}`}>
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
      </Tooltip>
      <CardContent>
        <Grid container spacing={2}>
          <TabContext value={activeTab}>
            <Grid container>
              <Grid item xs={12}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={onChangeTab}>
                    <Tab
                      sx={{textTransform: "unset"}}
                      iconPosition="start"
                      label="Scenarios"
                      value={SCENARIOS_TAB}
                    />
                    <Tab
                      sx={{textTransform: "unset"}}
                      iconPosition="start"
                      label="Interception Rules"
                      value={INTERCEPTION_RULES_TAB}
                    />
                    <Tab
                      sx={{textTransform: "unset"}}
                      iconPosition="start"
                      label="General Settings"
                      value={GENERAL_SETTINGS_TAB}
                    />
                  </TabList>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TabPanel value={SCENARIOS_TAB}>
                  <ScenariosPanel
                    scenarioConfigs={endpointConfig.scenarioConfigs}
                    onActivateScenario={onActivateScenario}
                  />
                </TabPanel>
                <TabPanel value={INTERCEPTION_RULES_TAB}>
                  <InterceptionRulesPanel
                    rules={endpointConfig.interceptionRules}
                    scenarioConfigs={endpointConfig.scenarioConfigs}
                  />
                </TabPanel>
                <TabPanel value={GENERAL_SETTINGS_TAB}>
                  <EndpointGeneralSettingsPanel
                    endpointConfig={endpointConfig}
                  />
                </TabPanel>
              </Grid>
            </Grid>
          </TabContext>
        </Grid>
      </CardContent>
    </Card>
  );
}
