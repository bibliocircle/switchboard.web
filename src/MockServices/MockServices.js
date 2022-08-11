import { useQuery } from "@apollo/client";
import { AddCircle as AddCircleIcon } from "@mui/icons-material";
import { Button, Grid, Paper, styled, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import PageHead from "../Common/PageHead";
import { GET_MOCK_SERVICES } from "../gql/queries/mockservice";
import MockServiceCard from "./MockServiceCard";
import MockServiceCardSkeleton from "./MockServiceCardSkeleton";

export const ServiceCard = styled(Grid)({
  textDecoration: "none",
});

export default function MockServices() {
  const { loading, error, data } = useQuery(GET_MOCK_SERVICES, {
    variables: {},
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
      <PageHead title="Mock Service Templates · Switchboard" />
      <Grid item xs={12}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={10}>
            <Paper>
              <TextField
                size="small"
                fullWidth
                placeholder="Search Mock Service Templates"
                autoFocus
              ></TextField>
            </Paper>
          </Grid>

          <Grid item xs={2}>
            <Button
              LinkComponent={Link}
              to="/template/new"
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<AddCircleIcon />}
            >
              Create Service Template
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {data?.mockServices?.map((ms) => (
            <ServiceCard
              key={ms.id}
              item
              xs={4}
              component={Link}
              to={`/template/${ms.id}`}
            >
              <MockServiceCard mockService={ms} />
            </ServiceCard>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
