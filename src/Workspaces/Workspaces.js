import { useQuery } from "@apollo/client";
import { Button, Grid, Paper, styled, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import PageHead from "../Common/PageHead";
import { GET_WORKSPACES } from "../gql/queries/workspaces";
import WorkspaceCard from "./WorkspaceCard";
import WorkspaceCardSkeleton from "./WorkspaceCardSkeleton";

const WSCard = styled(Grid)({
  textDecoration: "none",
});

export default function Workspaces() {
  const { loading, error, data } = useQuery(GET_WORKSPACES);

  if (loading) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <WorkspaceCardSkeleton />
        </Grid>
        <Grid item xs={4}>
          <WorkspaceCardSkeleton />
        </Grid>
        <Grid item xs={4}>
          <WorkspaceCardSkeleton />
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return <div>error</div>;
  }
  return (
    <Grid container spacing={3}>
      <PageHead title="Workspaces · Switchboard" />
      <Grid item xs={12}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={10}>
          <Paper>
          <TextField size="small" fullWidth placeholder="Search Workspaces" autoFocus></TextField>
        </Paper>
          </Grid>
          <Grid item xs={2}>
            <Button fullWidth variant="contained" color="primary">Create Workspace</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {data?.workspaces?.map((ws) => (
            <WSCard
              key={ws.id}
              item
              xs={4}
              component={Link}
              to={`/workspace/${ws.id}`}
            >
              <WorkspaceCard workspace={ws} />
            </WSCard>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
