import { FunctionComponent, useState, Fragment } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

import styles from "../styles.module.css";

import { Login, modalAction as login } from "components/modals/login";
import { Register, modalAction as register } from "components/modals/register";
import { ShootingStar } from "components/icons/star/shooting";

import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Button,
  Modal,
  Fade,
  Box,
  Backdrop,
  TextField,
} from "@mui/material";

const inter = Inter({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export const Navbar: FunctionComponent = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const home = () => {
    router.push("/");
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {};

  return (
    <Fragment>
      <form
        className={inter.className}
        style={{
          width: "calc(stretch - 20px)",
          height: "fit-content",
          paddingTop: "3px",
          paddingBottom: "3px",
          paddingLeft: "10px",
          paddingRight: "10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "rgb(76, 172, 255)",
        }}
      >
        <div className={styles.container}>
          <ShootingStar className={styles.logo} onClick={home} />
          <button className={styles.button} onClick={home}>
            Home
          </button>
        </div>
        <div className={styles.container}>
          <Login />
          <button
            type="button"
            className={`${styles.button} ${styles.emphasis}`}
            onClick={register}
          >
            Register
          </button>
        </div>
      </form>
      <Register />

      <AppBar position="static" sx={{ bgcolor: "rgb(76, 172, 255)" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <ShootingStar className={styles.logo} onClick={home} />
            <Typography variant="h6" sx={{ ml: 3, flexGrow: 1 }} onClick={home}>
              Home
            </Typography>
            <Login />
            <Button
              color="inherit"
              onClick={register}
              sx={{ fontWeight: "bold" }}
            >
              Register
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* <Button onClick={handleModalOpen}>Open modal</Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <div
            style={{
              backgroundColor: "#fff",
              padding: "2rem",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "30%",
              maxWidth: "400px",
            }}
          >
            <Typography variant="h5" id="transition-modal-title">
              Login
            </Typography>
            <form>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleLogin}
              >
                Sign In
              </Button>
            </form>
          </div>
        </Fade>
      </Modal> */}
    </Fragment>
  );
};
