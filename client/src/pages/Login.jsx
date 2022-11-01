import { useContext } from "react";
import { InfoContext } from "../utility/InfoProvider";
import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="http://localhost:3000/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  const { setStatus, setAuthorized } = useContext(InfoContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));

    axios
      .post("/auth/login", data)
      .then((res) => {
        setStatus({
          open: true,
          message: res.data.message,
          severity: "success",
        });
        setAuthorized(true);
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("user", res.data.user);
        axios.defaults.headers.common["Authorization"] = res.data.accessToken;
        navigate("/");
      })
      .catch((err) => {
        let message = err.response ? err.response.data.message : err.message;
        setStatus({ open: true, message: message, severity: "error" });
      });
  };

  return (
    <Box
      bgcolor={"background.default"}
      color="text.primary"
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CssBaseline />
      <Container maxWidth="md">
        <Grid
          container
          spacing={5}
          flex={1}
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Typography
              variant="h2"
              fontSize="50px"
              fontWeight={800}
              color="primary"
            >
              Devicate
            </Typography>
            <Typography variant="h5">
              Connect with developers from around the world on Devicate.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 2,
              }}
            >
              <Container>
                <Typography
                  component="h1"
                  variant="h5"
                  color="primary"
                  align="center"
                  sx={{ mt: 1 }}
                >
                  Login
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit}>
                  <TextField
                    size="small"
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
                    size="small"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container align="center">
                    <Grid item xs>
                      <Link href="#" variant="body2" to="">
                        Forgot password?
                      </Link>
                    </Grid>
                  </Grid>
                  <Button
                    component={Link}
                    to="/register"
                    fullWidth
                    variant="contained"
                    color="success"
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Create Account
                  </Button>
                </Box>
              </Container>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
