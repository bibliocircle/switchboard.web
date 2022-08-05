import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_WORKSPACE } from "../gql/mutations/workspace";
import { useNavigate } from "react-router-dom";

export default function CreateWorkspacePage() {
  const navigate = useNavigate();
  const [formDisabled, setFormDisabled] = useState(false);
  const [name, setName] = React.useState(null);
  const [expiresAt, setExpiresAt] = React.useState(null);
  const [isTemporary, setTemporary] = React.useState(false);

  const [createWorkspace] = useMutation(CREATE_WORKSPACE);

  const isFormValid = () => {
    return !!name;
  };

  const onClickSubmit = async () => {
    setFormDisabled(true);
    try {
      const {data} = await createWorkspace({
        variables: {
          workspace: {
            name,
            expiresAt,
          },
        },
      });
      navigate(`/workspaces#createdws=${data?.createWorkspace?.id}`);
    } catch (err) {
      alert(`error: ${err.message}`);
      setFormDisabled(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" fontWeight="bold">
                Create New Workspace
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    disabled={formDisabled}
                    label="Workspace Name"
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl disabled={formDisabled}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isTemporary}
                          onChange={(e) => setTemporary(e.target.checked)}
                        />
                      }
                      label="This is a temporary workspace"
                    />
                  </FormControl>
                </Grid>
                {isTemporary && (
                  <Grid item xs={12}>
                    <LocalizationProvider
                      fullWidth
                      dateAdapter={AdapterDateFns}
                    >
                      <DatePicker
                        disabled={formDisabled}
                        label="Workspace expiry date"
                        value={expiresAt}
                        onChange={(newValue) => {
                          setExpiresAt(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                )}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container justifyContent="center">
                <Button
                  disabled={formDisabled || !isFormValid()}
                  color="primary"
                  variant="contained"
                  onClick={onClickSubmit}
                >
                  Create Workspace
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
