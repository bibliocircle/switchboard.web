import { Grid, TextField, Typography } from "@mui/material";
import React from "react";

export default function EndpointGeneralSettingsPanel({ endpointConfig }) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between" spacing={1}>
          <Grid item>
            <Typography variant="body2">Response Delay</Typography>
          </Grid>
          <Grid item>
            <TextField size="small" value={endpointConfig.responseDelay} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
