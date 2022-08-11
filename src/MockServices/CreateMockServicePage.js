import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { CREATE_MOCK_SERVICE_TEMPLATE } from "../gql/mutations/mockservice";
import { MOCK_SERVICE_TYPE_MAP } from "../config";

export default function CreateServiceTemplatePage() {
  const navigate = useNavigate();
  const [formDisabled, setFormDisabled] = useState(false);
  const [name, setName] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [type, setType] = React.useState(MOCK_SERVICE_TYPE_MAP.REST);

  const [createServiceTemplate] = useMutation(CREATE_MOCK_SERVICE_TEMPLATE);

  const isFormValid = () => {
    return !!(name && id && type);
  };

  useEffect(() => {
    if (!name) return setId("");
    setId(slugify(name));
  }, [name]);

  const onClickSubmit = async () => {
    setFormDisabled(true);
    try {
      const { data } = await createServiceTemplate({
        variables: {
          mockService: {
            id,
            name,
            type,
          },
        },
      });
      navigate(`/templates#createdms=${data?.createMockService?.id}`);
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
                Create Service Template
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <TextField
                    disabled={formDisabled}
                    label="Service Name"
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth variant="filled">
                    <InputLabel id="select-ms-type">
                      Select Service Type
                    </InputLabel>
                    <Select
                      labelId="select-ms-type"
                      fullWidth
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      {Object.entries(MOCK_SERVICE_TYPE_MAP).map(([k, v]) => (
                        <MenuItem key={k} value={k}>
                          {v}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
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
                  Create Service Template
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
