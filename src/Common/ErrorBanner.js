import { Alert, Grid } from "@mui/material";
import React from "react";

export default function ErrorBanner({ message }) {
  return (
    <Grid container>
      <Alert sx={{ width: "100%"}} severity="error">{message}</Alert>
    </Grid>
  );
}
