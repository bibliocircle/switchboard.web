import { Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import React from "react";
import { DARK_THEME } from "../theme";

export default function EndpointTab({ endpointConfig, selected, onClick }) {
  return (
    <Card
      onClick={onClick}
      sx={{
        backgroundColor: selected
          ? (theme) =>
              theme.palette.mode === DARK_THEME
                ? theme.palette.grey[700]
                : theme.palette.grey[300]
          : "paper",
        cursor: "pointer",
      }}
    >
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={4}>
                <Chip
                  sx={{
                    fontWeight: "bold",
                    width: "100%",
                    borderRadius: "2px",
                  }}
                  label={endpointConfig.endpoint.method}
                ></Chip>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="subtitle2">
                  {endpointConfig.endpoint.path}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
