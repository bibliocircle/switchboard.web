import { useQuery } from "@apollo/client";
import { Add as AddIcon } from "@mui/icons-material";
import {
  Button,
  Grid,
  Paper,
  styled,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GET_MOCK_SERVICE_BY_ID } from "../queries/mockservice";
import { DARK_THEME } from "../theme";
import { getUserFullName } from "../utils/strings";
import EndpointCard from "./EndpointCard";

const Section = styled(Grid)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === DARK_THEME
      ? theme.palette.grey[900]
      : theme.palette.background.paper;
  return {
    backgroundColor,
    color: theme.palette.getContrastText(backgroundColor),
    padding: theme.spacing(3),
    height: "100%",
  };
});

function UpstreamCard({ upstream }) {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          p: 1,
          textAlign: "center",
          backgroundColor: (theme) => theme.palette.mode === DARK_THEME
          ? theme.palette.grey[800]
          : theme.palette.grey[200],
        }}
      >
        <Typography variant="subtitle2">{upstream.name}</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          p: 1,
          textAlign: "center",
          backgroundColor: (theme) => theme.palette.mode === DARK_THEME
          ? theme.palette.grey[700]
          : theme.palette.grey[100],
        }}
      >
        <Typography variant="caption">{upstream.url}</Typography>
      </Grid>
    </Grid>
  );
}

export default function MockService() {
  const user = useSelector((s) => s.user.loggedInUser);
  const { mockServiceId } = useParams();
  const { loading, error, data } = useQuery(GET_MOCK_SERVICE_BY_ID, {
    variables: {
      id: mockServiceId,
    },
    skip: !user,
  });

  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }

  if (!data) return null;
  const ms = data.mockService;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Section container alignContent="flex-start">
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h4" fontWeight="bold">
                  {ms.name}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Section>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item xs={9}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {ms.endpoints.map((ep) => (
                    <Grid item xs={12} lg={6} key={ep.id}>
                      <EndpointCard endpoint={ep} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Section container>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography textAlign="center" variant="body2">
                          Start configuring this mock service by adding it to
                          your workspace.
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container justifyContent="center">
                          <Button variant="contained" startIcon={<AddIcon />}>
                            Add to workspace
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Section>
              </Grid>
              <Grid item xs={12}>
                <Section container alignContent="flex-start">
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography textAlign="center" variant="h6">
                          Global Configuration
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TableContainer component={Paper}>
                          <Table >
                            <TableRow>
                              <TableCell >Inject Response Headers</TableCell>
                              <TableCell>
                                {ms.config.injectHeaders.map(({ name, value}) => (
                                    <code key={name}>{`${name}:"${value}"`}</code>
                                ))}
                              </TableCell>
                            </TableRow>
                          </Table>
                        </TableContainer>
                      </Grid>
                    </Grid>
                  </Grid>
                </Section>
              </Grid>
              <Grid item xs={12}>
                <Section container alignContent="flex-start">
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography textAlign="center" variant="h6">
                          Upstreams
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          {ms.upstreams.map((us) => (
                            <Grid key={us.id} item xs={12}>
                              <UpstreamCard upstream={us} />
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Section>
              </Grid>

              <Grid item xs={12}>
                <Section container>
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2">
                          About this mock service
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography variant="caption">
                              Created by {getUserFullName(ms.createdBy)}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="caption">
                              Created at{" "}
                              {dayjs(ms.createdAt).format(
                                "YYYY-mm-DD [at] hh:mm:ss a"
                              )}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="caption">
                              Last updated at{" "}
                              {dayjs(ms.updatedAt).format(
                                "YYYY-mm-DD [at] hh:mm:ss a"
                              )}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Section>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
