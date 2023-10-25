import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import {
  checkingAuthentication,
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth/thunks";

const initialFormData = {
  email: "",
  password: "",
}

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { email, password, onInputChange, formState } = useForm(initialFormData);

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(startLoginWithEmailPassword(formState));
  };

  const onGoogleSignIn = (event) => {
    event.preventDefault();
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form className="animate__animated animate__fadeIn" onSubmit={onSubmit}>
        <Grid>
          {/* Input email */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="E-Mail"
              type="email"
              name="email"
              value={email}
              onChange={onInputChange}
              fullWidth
            ></TextField>
          </Grid>
          {/* Input contraseña */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={onInputChange}
              fullWidth
            ></TextField>
          </Grid>
          {/* Buttons */}
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid
              item
              xs={12}
              sx={{ mt: -1 }}
              display={!!errorMessage ? "" : "none"}
            >
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                disabled={isAuthenticating}
                variant="contained"
                fullWidth
                sx={{ p: 1 }}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                variant="contained"
                onClick={onGoogleSignIn}
                fullWidth
                sx={{ p: 1 }}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          {/* Create account link */}
          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Create Account
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
