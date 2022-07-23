import { useQuery } from "@apollo/client";
import { Grid, Paper, styled, TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PageHead from "../Common/PageHead";
import { GET_MOCK_SERVICES } from "../queries/mockservice";
import MockServiceCard from "./MockServiceCard";
import MockServiceCardSkeleton from "./MockServiceCardSkeleton";

const ServiceCard = styled(Grid)({
  textDecoration: "none",
});

export default function MockServices() {
  const user = useSelector((s) => s.user.loggedInUser);
  const { loading, error, data } = useQuery(GET_MOCK_SERVICES, {
    variables: {},
    skip: !user,
  });

  if (loading) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <MockServiceCardSkeleton />
        </Grid>
        <Grid item xs={4}>
          <MockServiceCardSkeleton />
        </Grid>
        <Grid item xs={4}>
          <MockServiceCardSkeleton />
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return <div>error</div>;
  }
  return (
    <Grid container spacing={3}>
      <PageHead title="MockServices · Switchboard" />
      <Grid item xs={12}>
        <Paper>
          <TextField fullWidth placeholder="Search Mock Services" autoFocus></TextField>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {data?.mockServices?.map((ms) => (
            <ServiceCard
              key={ms.id}
              item
              xs={4}
              component={Link}
              to={`/mockservice/${ms.id}`}
            >
              <MockServiceCard mockService={ms} />
            </ServiceCard>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
