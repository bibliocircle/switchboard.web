import { useQuery } from "@apollo/client";
import {
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BACKEND_URL, MOCK_SERVICE_TYPE_MAP } from "../config";
import { LOGGED_IN_USER_SELECTOR } from "../store/slices/user";
import Section from '../Common/Section'
import { MockServiceType, UpstreamCard } from "../MockServices/MockService";
import EndpointConfigCard from "./EndpointConfigCard";
import { GET_WORKSPACE_SETTING } from "../queries/workspace_setting";

const activateScenario = async ({ workspaceId, mockServiceId, endpointId, scenarioId }) => {
  const res = await fetch(`${BACKEND_URL}/workspace/${workspaceId}/mockservice/${mockServiceId}/endpoint/${endpointId}/scenario/${scenarioId}/activate`, {
    method: "put",
    credentials: "include"
  })
  if (res.status === 200) {
    alert('done')
  } else {
    alert(res.status)
  }
}

export default function WorkspaceSetting() {
  const user = useSelector(LOGGED_IN_USER_SELECTOR);
  const { mockServiceId, workspaceId } = useParams();
  const { loading, error, data } = useQuery(GET_WORKSPACE_SETTING, {
    variables: {
      mockServiceId,
      workspaceId
    },
    skip: !user,
  });

  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }

  if (!data) return null;
  const ws = data.workspaceSetting;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Section container alignContent="flex-start">
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h4" fontWeight="bold">
                  {ws.mockService.name}
                </Typography>
              </Grid>
              <Grid item>
                <MockServiceType label={MOCK_SERVICE_TYPE_MAP[ws.mockService.type]} />
              </Grid>
            </Grid>
          </Grid>
        </Section>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {ws.endpointConfigs.map((ec) => (
                    <Grid item xs={12} lg={12} key={ec.endpoint.id}>
                      <EndpointConfigCard onActivateScenario={(scenarioId) => activateScenario({
                        workspaceId: ws.workspace.id,
                        mockServiceId: ws.mockService.id,
                        endpointId: ec.endpoint.id,
                        scenarioId,
                      })} endpointConfig={ec} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Section container alignContent="flex-start">
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography textAlign="center" variant="h6">
                          Global Configuration
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Accordion disableGutters>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle2">
                              Inject Response Headers
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            {ws.config.injectHeaders.map(({ name, value }) => (
                              <Typography
                                variant="caption"
                                key={name}
                              >{`${name}: "${value}"`}</Typography>
                            ))}
                          </AccordionDetails>
                        </Accordion>
                        <Accordion disableGutters>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle2">
                              Global Response Delay
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <TextField
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    ms
                                  </InputAdornment>
                                ),
                              }}
                              size="small"
                              value={0}
                            />
                          </AccordionDetails>
                        </Accordion>
                        <Accordion disableGutters>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle2">
                              Upstreams
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid container spacing={2}>
                              {ws.mockService.upstreams.map((us) => (
                                <Grid key={us.id} item xs={12}>
                                  <UpstreamCard upstream={us} />
                                </Grid>
                              ))}
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                    </Grid>
                  </Grid>
                </Section>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
