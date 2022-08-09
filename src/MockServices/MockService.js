import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { gqlErrorCodes, MOCK_SERVICE_TYPE_MAP } from "../config";
import { GET_MOCK_SERVICE_BY_ID } from "../gql/queries/mockservice";
import { DARK_THEME } from "../theme";
import { getUserFullName } from "../utils/strings";
import EndpointCard from "./EndpointCard";
import Section from "../Common/Section";
import { GET_WORKSPACES } from "../gql/queries/workspaces";
import { ADD_MOCK_SERVICE_TO_WORKSPACE } from "../gql/mutations/workspace";
import { getGqlErrorCode } from "../gql/errors";

export const MockServiceType = styled(Chip)(({ theme }) => ({
  fontWeight: "bold",
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

export function UpstreamCard({ upstream }) {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          p: 1,
          textAlign: "center",
          backgroundColor: (theme) =>
            theme.palette.mode === DARK_THEME
              ? theme.palette.grey[800]
              : theme.palette.grey[200],
        }}
      >
        <Typography variant="subtitle2">{upstream.name}</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          p: 1,
          textAlign: "center",
          backgroundColor: (theme) =>
            theme.palette.mode === DARK_THEME
              ? theme.palette.grey[700]
              : theme.palette.grey[100],
        }}
      >
        <Typography variant="caption">{upstream.url}</Typography>
      </Grid>
    </Grid>
  );
}

export default function MockService() {
  const { mockServiceId } = useParams();
  const navigate = useNavigate();
  const [selectedWsId, setSelectedWsId] = useState(null);
  const [addMockServiceToWorkspace] = useMutation(
    ADD_MOCK_SERVICE_TO_WORKSPACE
  );
  const [mockServiceCreateError, setMockServiceCreateError] = useState(null);
  const {
    loading: fetchingWs,
    error: fetchWsError,
    data: wsData,
  } = useQuery(GET_WORKSPACES);
  const {
    loading: fetchingMs,
    error: fetchMsError,
    data: msData,
  } = useQuery(GET_MOCK_SERVICE_BY_ID, {
    variables: {
      id: mockServiceId,
    },
  });

  if (fetchingMs) {
    return <div>loading</div>;
  }
  if (fetchMsError) {
    return <div>error</div>;
  }

  if (!msData) return null;
  const ms = msData.mockService;

  const onSelectWs = (e) => {
    setSelectedWsId(e.target.value);
  };

  const onClickAddMockServiceToWorkspace = async () => {
    setMockServiceCreateError(null);
    if (!selectedWsId) return;
    try {
      await addMockServiceToWorkspace({
        variables: {
          workspaceId: selectedWsId,
          mockServiceId,
        },
      });
      navigate(`/workspace/${selectedWsId}/mockservice/${mockServiceId}`);
    } catch (err) {
      const errorCode = getGqlErrorCode(err);
      if (errorCode === gqlErrorCodes.DUPLICATE_ENTITY) {
        return setMockServiceCreateError(
          `${ms.name} is already added to this workspace`
        );
      }
      alert(err.message);
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Section container alignContent="flex-start">
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h4" fontWeight="bold">
                  {ms.name}
                </Typography>
              </Grid>
              <Grid item>
                <MockServiceType label={MOCK_SERVICE_TYPE_MAP[ms.type]} />
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
                  {ms.endpoints.map((ep) => (
                    <Grid item xs={12} lg={12} key={ep.id}>
                      <EndpointCard endpoint={ep} />
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
                            <Grid container>
                              {ms.config.injectHeaders.map(
                                ({ name, value }) => (
                                  <Grid item xs={12} key={name}>
                                    <Typography
                                      variant="caption"
                                      key={name}
                                    >{`${name}: "${value}"`}</Typography>
                                  </Grid>
                                )
                              )}
                            </Grid>
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
                              value={ms.config.globalResponseDelay}
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
                              {ms.upstreams.map((us) => (
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

              <Grid item xs={12}>
                <Section container>
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2">
                          About this mock service
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography variant="caption">
                              Created by {getUserFullName(ms.createdBy)}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="caption">
                              Created on{" "}
                              {dayjs(ms.createdAt).format(
                                "YYYY-mm-DD [at] hh:mm:ss a"
                              )}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="caption">
                              Last updated on{" "}
                              {dayjs(ms.updatedAt).format(
                                "YYYY-mm-DD [at] hh:mm:ss a"
                              )}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Section>
              </Grid>
              <Grid item xs={12}>
                <Section container>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography textAlign="center" variant="body2">
                          Start configuring this mock service by adding it to a
                          workspace.
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container justifyContent="center">
                          <Grid item xs={12}>
                            <FormControl fullWidth variant="filled">
                              <InputLabel id="select-ws">
                                Select Workspace
                              </InputLabel>
                              <Select
                                labelId="select-ws"
                                fullWidth
                                value={selectedWsId}
                                onChange={onSelectWs}
                              >
                                {wsData?.workspaces?.map((ws) => (
                                  <MenuItem key={ws.id} value={ws.id}>
                                    {ws.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <Grid container justifyContent="center">
                              <Button
                                onClick={onClickAddMockServiceToWorkspace}
                                variant="contained"
                                startIcon={<AddIcon />}
                              >
                                Add Mock Service to Workspace
                              </Button>
                            </Grid>
                          </Grid>
                          {mockServiceCreateError && (
                            <Grid item xs={12}>
                              <Grid container justifyContent="center">
                                <FormHelperText error>
                                  {mockServiceCreateError}
                                </FormHelperText>
                              </Grid>
                            </Grid>
                          )}
                        </Grid>
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
