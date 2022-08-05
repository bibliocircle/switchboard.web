import { useQuery } from "@apollo/client";
import {
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Section from "../Common/Section";
import { GET_WORKSPACE_DETAILS } from "../gql/queries/workspaces";
import { getUserFullName } from "../utils/strings";
import MockServiceCard from "../MockServices/MockServiceCard";
import { ServiceCard } from "../MockServices/MockServices";

export default function Workspace() {
  const { workspaceId } = useParams();
  const { loading, error, data } = useQuery(GET_WORKSPACE_DETAILS, {
    variables: { workspaceId },
  });

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;
  if (!data) return null;

  const ws = data.workspace;
  const wsSettings = data.workspaceSettings

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Section container alignContent="flex-start">
          <Grid item xs={12}>
            <Typography variant="h4" fontWeight="bold">
              {ws.name}
            </Typography>
          </Grid>
        </Section>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper>
                  <TextField
                    fullWidth
                    autoFocus
                    placeholder={`Search Mock Services in ${ws.name}`}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {wsSettings.map((wss) => (
                    <ServiceCard component={Link} to={`/workspace/${ws.id}/mockservice/${wss.mockService.id}`} key={wss.id} item xs={6}>
                      <MockServiceCard mockService={wss.mockService} />
                    </ServiceCard>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Section container>
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2">
                          About this workspace
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography variant="caption">
                              Created by {getUserFullName(ws.createdBy)}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="caption">
                              Created on{" "}
                              {dayjs(ws.createdAt).format(
                                "YYYY-mm-DD [at] hh:mm:ss a"
                              )}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="caption">
                              Last updated on{" "}
                              {dayjs(ws.updatedAt).format(
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
