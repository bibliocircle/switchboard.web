import { useQuery } from "@apollo/client";
import { Grid, Paper, styled, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import PageHead from "../Common/PageHead";
import { GET_MOCK_SERVICES } from "../gql/queries/mockservice";
import ServiceTemplateCard from "./ServiceTemplateCard";
import ServiceTemplateCardSkeleton from "./ServiceTemplateCardSkeleton";

export const ServiceCard = styled(Grid)({
  textDecoration: "none",
});

export default function ServiceTemplates() {
  const { loading, error, data } = useQuery(GET_MOCK_SERVICES);

  if (loading) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <ServiceTemplateCardSkeleton />
        </Grid>
        <Grid item xs={4}>
          <ServiceTemplateCardSkeleton />
        </Grid>
        <Grid item xs={4}>
          <ServiceTemplateCardSkeleton />
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return <div>error</div>;
  }
  return (
    <Grid container spacing={3}>
      <PageHead title="Service Templates · Switchboard" />
      <Grid item xs={12}>
        <Paper>
          <TextField fullWidth placeholder="Search Service Templates" autoFocus></TextField>
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
              to={`/serviceTemplate/${ms.id}`}
            >
              <ServiceTemplateCard mockService={ms} />
            </ServiceCard>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
