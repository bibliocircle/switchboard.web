import { useQuery } from "@apollo/client";
import {
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Section from "../Common/Section";
import { GET_USER_WORKSPACE } from "../gql/queries/workspaces";
import { LOGGED_IN_USER_SELECTOR } from "../store/slices/user";
import { getUserFullName } from "../utils/strings";
import MockServiceCard from "../MockServices/MockServiceCard";
import { ServiceCard } from "../MockServices/MockServices";

export default function Workspace() {
  const { workspaceId } = useParams();
  const user = useSelector(LOGGED_IN_USER_SELECTOR);
  const { loading, error, data } = useQuery(GET_USER_WORKSPACE, {
    variables: { workspaceId },
    skip: !user,
  });

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;
  if (!data?.userWorkspace) return null;

  const ws = data.userWorkspace;

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
                  {ws.mockServices.map((ms) => (
                    <ServiceCard component={Link} to={`/workspace/${ws.id}/mockservice/${ms.id}`} key={ms.id} item xs={6}>
                      <MockServiceCard mockService={ms} />
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
