import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Hyperlink from "../Common/Hyperlink";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { loginCompleted } from "../store/slices/user";
import { useDispatch } from "react-redux";

const theme = createTheme();

export default function Login() {
    const dispatch = useDispatch()
  const [loginError, setLoginError] = useState();

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if (!email || !password) {
        return setLoginError("Both Email and Password are required")
    }
    try {
      const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "post",
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 401) {
        return setLoginError("Invalid Email or Password!");
      }
      if (res.status === 200) {
        const data = await res.json()
        dispatch(loginCompleted(data.token))

        return navigate("/");
      }
      setLoginError("Something went wrong! Please try again later.");
    } catch {
      setLoginError("Something went wrong! Please try again later.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in to Switchboard
          </Typography>
          {loginError && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="error">{loginError}</Alert>
            </Box>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Hyperlink to="/login" variant="body2">
                  Forgot password?
                </Hyperlink>
              </Grid>
              <Grid item>
                <Hyperlink to="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Hyperlink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
