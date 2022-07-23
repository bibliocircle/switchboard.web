import {
  Card,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";

export default function MockServiceCardSkeleton() {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container justifyContent="space-between">
              <Grid item xs={8}>
                <Typography variant="h6">
                  <Skeleton />
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h6">
                  <Skeleton />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="GrayText">
              <Skeleton />
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
