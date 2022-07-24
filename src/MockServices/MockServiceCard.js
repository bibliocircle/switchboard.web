import { Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import React from "react";
import { MOCK_SERVICE_TYPE_MAP } from "../config";
import { getUserFullName } from "../utils/strings";

export default function MockServiceCard({ mockService }) {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography variant="h6">{mockService.name}</Typography>
              </Grid>
              <Grid item>
                <Chip
                  label={
                    <Typography variant="subtitle2">
                      {MOCK_SERVICE_TYPE_MAP[mockService.type]}
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="GrayText">
              {getUserFullName(mockService.createdBy)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
