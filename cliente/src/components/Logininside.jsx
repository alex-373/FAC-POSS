import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import users from "./../../data/users"; // tu data de usuarios
import authService from "./../service/authService"; // tu auth
import image from "./Images/image.jpg"; // tu fondo

// Footer
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Mi POS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// 🎨 ESTILOS GLASSMORPHISM
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundImage: `url(${image})`, // imagen de fondo
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.15)", // transparencia
    borderRadius: "16px",
    backdropFilter: "blur(12px)", // glass effect
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)",
    maxWidth: "400px",
    width: "100%",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#1e88e5", // azul
  },
  title: {
    color: "#0d47a1",
    fontWeight: 600,
    marginBottom: theme.spacing(2),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: "8px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#1e88e5",
    color: "#fff",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "#1565c0",
    },
  },
  link: {
    color: "#1e88e5",
    fontWeight: 500,
  },
}));

// 🟦 COMPONENTE LOGIN
export default function SignInSide(props) {
  const classes = useStyles();

  // Redirige si ya está logueado
  if (authService.isLoggedIn()) {
    props.history.push("./home");
  }

  // Estado
  const [account, setAccount] = React.useState({ username: "", password: "" });

  const handelAccount = (property, event) => {
    const accountCopy = { ...account };
    accountCopy[property] = event.target.value;
    setAccount(accountCopy);
  };

  const isVarifiedUser = (username, password) => {
    return users.find(
      (user) => user.username === username && user.password === password
    );
  };

  const handelLogin = (e) => {
    e.preventDefault();
    if (isVarifiedUser(account.username, account.password)) {
      authService.doLogIn(account.username);
      setAccount({ username: "", password: "" });
      props.history.push("/home");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5" className={classes.title}>
            Sign in
          </Typography>

          <form className={classes.form} noValidate onSubmit={handelLogin}>
            <TextField
              onChange={(event) => handelAccount("username", event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              InputProps={{ className: classes.input }}
            />

            <TextField
              onChange={(event) => handelAccount("password", event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputProps={{ className: classes.input }}
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item>
                <Link href="#" variant="body2" className={classes.link}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>

            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
