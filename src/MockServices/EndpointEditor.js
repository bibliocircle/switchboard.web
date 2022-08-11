import { Check, Close } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import React from "react";

const HTTP_METHODS = [
  "OPTIONS",
  "GET",
  "HEAD",
  "PUT",
  "POST",
  "DELETE",
  "PATCH",
];

const Editor = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.grey[200],
}));

export default function EndpointEditor({
  value = {},
  onSubmit,
  onClose,
  onChange,
}) {
  const createChangeHandler = (fieldName) => (e) => {

    onChange({
      ...value,
      [fieldName]:  e.target.value,
    });
  };

  return (
    <Editor container>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <FormControl fullWidth variant="filled">
                  <InputLabel id="select-method">Method</InputLabel>
                  <Select
                    labelId="select-method"
                    fullWidth
                    value={value?.method}
                    onChange={createChangeHandler("method")}
                  >
                    {HTTP_METHODS.map((m) => (
                      <MenuItem key={m} value={m}>
                        {m}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  value={value?.path}
                  onChange={createChangeHandler("path")}
                  label="Path"
                  fullWidth
                ></TextField>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  value={value?.description}
                  onChange={createChangeHandler("description")}
                  label="Description (optional)"
                  fullWidth
                ></TextField>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  type="number"
                  value={+value?.responseDelay || 0}
                  onChange={createChangeHandler("responseDelay")}
                  label="Response Delay"
                  fullWidth
                ></TextField>
              </Grid>
              <Grid item>
                <Button
                  onClick={onSubmit}
                  startIcon={<Check />}
                  variant="contained"
                  color="primary"
                >
                  Create Endpoint
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={onClose}
                  startIcon={<Close />}
                  variant="contained"
                  color="inherit"
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Editor>
  );
}
