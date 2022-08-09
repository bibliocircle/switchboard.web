import { useMutation, useQuery } from "@apollo/client";
import {
  ExpandMore as ExpandMoreIcon,
  Link as LinkIcon,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BACKEND_URL,
  CONSUMER_BACKEND_API_PORT,
  MOCK_SERVICE_TYPE_MAP,
} from "../config";
import Section from "../Common/Section";
import { MockServiceType, UpstreamCard } from "../MockServices/MockService";
import EndpointConfigCard from "./EndpointConfigCard";
import { GET_WORKSPACE_SETTING } from "../gql/queries/workspace_setting";
import { ACTIVATE_MOCK_SERVICE_SCENARIO } from "../gql/mutations/workspace_setting";
import { getGqlErrorCode, GQL_NOT_FOUND_ERROR } from "../gql/errors";
import ErrorBanner from "../Common/ErrorBanner";
import EndpointTab from "./EndpointTab";

export default function WorkspaceSetting() {
  const [activateMockServiceScenario] = useMutation(
    ACTIVATE_MOCK_SERVICE_SCENARIO
  );
  const [selectedEndpointConfigId, setSelectedEndpointConfigId] =
    useState(null);
  const { mockServiceId, workspaceId } = useParams();
  const { loading, error, data } = useQuery(GET_WORKSPACE_SETTING, {
    variables: {
      mockServiceId,
      workspaceId,
    },
  });

  const getMockServiceUrl = () => {
    const url = new URL(BACKEND_URL);
    url.pathname = `/ws/${workspaceId}/${mockServiceId}`;
    url.port = CONSUMER_BACKEND_API_PORT;
    return url.toString();
  };

  const activateScenario = async ({
    workspaceId,
    mockServiceId,
    endpointId,
    scenarioId,
  }) => {
    try {
      await activateMockServiceScenario({
        variables: {
          workspaceId,
          mockServiceId,
          endpointId,
          scenarioId,
        },
      });
    } catch (err) {
      alert("oops");
      console.error(err);
    }
  };

  useEffect(() => {
    if (data?.workspaceSetting) {
      setSelectedEndpointConfigId((current) => {
        if (current) return current;
        return data.workspaceSetting.endpointConfigs[0].id;
      });
    }
  }, [data]);

  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    if (getGqlErrorCode(error) === GQL_NOT_FOUND_ERROR) {
      return (
        <ErrorBanner message="Workspace does not exist or mock service not found on this workspace!" />
      );
    }
    return <ErrorBanner message="Unknown error occurred! Please try later" />;
  }

  if (!data) return null;
  const ws = data.workspaceSetting;

  const getEndpointConfig = () => {
    const selectedEndpointConfig = ws.endpointConfigs.find(
      (ec) => ec.id === selectedEndpointConfigId
    );

    return (
      <EndpointConfigCard
        onActivateScenario={(scenarioId) =>
          activateScenario({
            workspaceId: ws.workspace.id,
            mockServiceId: ws.mockService.id,
            endpointId: selectedEndpointConfig.endpoint.id,
            scenarioId,
          })
        }
        endpointConfig={selectedEndpointConfig}
      />
    );
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Section container alignContent="flex-start">
          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item>
                <Typography variant="h4" fontWeight="bold">
                  {ws.mockService.name}
                </Typography>
              </Grid>
              <Grid item>
                <MockServiceType
                  label={MOCK_SERVICE_TYPE_MAP[ws.mockService.type]}
                />
              </Grid>
            </Grid>
          </Grid>
        </Section>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Grid container spacing={1}>
              {ws.endpointConfigs.map((ec) => (
                <Grid key={ec.endpoint.id} item xs={12}>
                  <EndpointTab
                    onClick={() => setSelectedEndpointConfigId(ec.id)}
                    selected={ec.id === selectedEndpointConfigId}
                    endpointConfig={ec}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            {selectedEndpointConfigId && getEndpointConfig()}
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Section container>
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Typography variant="h6" textAlign="center">
                          Mock Service URL
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Alert
                          sx={{ background: "mojito" }}
                          fullWidth
                          icon={<LinkIcon />}
                        >
                          <Typography variant="caption" color="textPrimary">
                            {getMockServiceUrl()}
                          </Typography>
                        </Alert>
                      </Grid>
                    </Grid>
                  </Grid>
                </Section>
              </Grid>
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
                              <Grid item xs={12} key={name}>
                                <Typography
                                  variant="caption"
                                  key={name}
                                >{`${name}: "${value}"`}</Typography>
                              </Grid>
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
