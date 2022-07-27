import { useQuery } from "@apollo/client";
import { Grid, Paper, styled, TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PageHead from "../Common/PageHead";
import { GET_WORKSPACES } from "../queries/workspaces";
import { LOGGED_IN_USER_SELECTOR } from "../store/slices/user";
import WorkspaceCard from "./WorkspaceCard";
import WorkspaceCardSkeleton from "./WorkspaceCardSkeleton";

const WSCard = styled(Grid)({
  textDecoration: "none",
});

export default function Workspaces() {
  const user = useSelector(LOGGED_IN_USER_SELECTOR);
  const { loading, error, data } = useQuery(GET_WORKSPACES, {
    variables: {},
    skip: !user,
  });

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
        <Paper>
          <TextField fullWidth placeholder="Search Workspaces" autoFocus></TextField>
        </Paper>
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
