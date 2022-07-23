import { Card, CardContent, Grid, Tooltip, Typography } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import React from "react";
import { getUserFullName } from "../utils/strings";
import dayjs from "dayjs";

export default function WorkspaceCard({ workspace }) {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography variant="h6">{workspace.name}</Typography>
              </Grid>
              {workspace.expiresAt && (
                <Grid item>
                  <Tooltip title={`[Temporary Workspace] Expires in ${dayjs(workspace.expiresAt).diff(dayjs(), 'day')} day(s)`}>
                  <TimerIcon />
                  </Tooltip>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="GrayText">
              {getUserFullName(workspace.createdBy)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
