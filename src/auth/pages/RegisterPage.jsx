import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useMemo, useState } from "react";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
import { useDispatch, useSelector } from "react-redux";

const formData = {
  email: "",
  password: "",
  displayName: "",
};

const formValidations = {
  email: [(value) => value.includes("@"), "El correo debe de tener una @"],
  password: [
    (value) => value.length >= 6,
    "La contraseña debe de tener al menos 6 caracteres",
  ],
  displayName: [(value) => value.length >= 1, "El nombre es obligatorio"],
};

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmited, setFormSubmited] = useState(false)

  const {status, errorMessage} = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === "checking", [status])


  const { displayName, displayNameValid, email, emailValid, password, passwordValid, onInputChange, formState, isFormValid } = useForm(
    formData,
    formValidations
  );

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true)

    if (!isFormValid) {return} //Si no esta validado ni lo envia

    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Create account">
      <form className="animate__animated animate__fadeIn" onSubmit={onSubmit}>
        <Grid>
          {/* Input nombre */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              type="text"
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              fullWidth
              error={!!displayNameValid && formSubmited}
              helperText={formSubmited ? displayNameValid : null}
            ></TextField>
          </Grid>
          {/* Input email */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              name="email"
              value={email}
              onChange={onInputChange}
              fullWidth
              error={!!emailValid && formSubmited}
              helperText={formSubmited ? emailValid : null}
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
              error={!!passwordValid && formSubmited}
              helperText={formSubmited ? passwordValid : null}
            ></TextField>
          </Grid>
          {/* Buttons */}
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? "": 'none'}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit" disabled={isCheckingAuthentication} fullWidth sx={{ p: 1 }}>
                Create account
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>Already have an account?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Log in
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
