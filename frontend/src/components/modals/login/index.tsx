import { Fragment, FunctionComponent, useState } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

import styles from "./styles.module.css";

import { RightArrow } from "components/icons/arrow/right";
import { X as Close } from "components/icons/x";
import { http } from "utils/http";
import { Errors } from "utils/enum";

import {
    Typography,
    Button,
    Modal,
    Fade,
    Box,
    Backdrop,
    TextField,
  } from "@mui/material";
import { emit } from "process";

const inter = Inter({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export const modalAction = () => {
  const modal = document.getElementById(styles.main)!;

  if (modal.style.display === "flex") {
    modal.style.display = "none";
  } else {
    modal.style.display = "flex";
  }
};

const errorMessage: string = "loginError";

const close = () => {
  document.getElementById(errorMessage)!.style.display = "none";
  document.getElementById(styles.main)!.style.display = "none";
};

export const Login: FunctionComponent = ({}) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const showError = () => {
    document.getElementById(errorMessage)!.style.display = "flex";
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    document.getElementById(errorMessage)!.style.display = "none";

    try {
      await http.post("v1/users/login", {
        email: username,
        password: password,
      });

      router.reload();
    } catch (e: any) {
      if (e.response === undefined) {
        setError("An error occurred");
        showError();

        return;
      }

      switch (e.response.status) {
        case Errors.badRequest:
          setError("Invalid email or password");
          break;
        case Errors.unauthorized:
          setError("Invalid email or password");
          break;
        default:
          setError("An error occurred");
      }
    }
  };

console.log(username, password)

  return (
    // <form className={inter.className} id={styles.main}>
    //     <div id={errorMessage} style={{
    //         width: 'stretch',
    //         height: 'fit-content',
    //         paddingTop: '3px',
    //         paddingBottom: '3px',
    //         paddingLeft: '10px',
    //         paddingRight: '10px',
    //         textAlign: 'center',
    //         backgroundColor: 'rgb(178, 85, 88)',
    //         color: 'white',
    //         fontSize: '30px',
    //         display: 'none',
    //         borderRadius: '5px',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //     }}>
    //         {error}
    //     </div>
    //     <div className={styles.flex_row} style={{ justifyContent: 'space-between' }}>
    //         <div className={styles.flex_row}>
    //             <h1>Login</h1>
    //             <RightArrow className={styles.button} onClick={login} />
    //         </div>
    //         <Close className={styles.button} onClick={() => { close(); return false }} />
    //     </div>
    //     <input
    //         className={styles.input}
    //         type='email'
    //         placeholder='Email'
    //         value={loginEmail}
    //         onChange={event => setLoginEmail(event.target.value)}
    //     />
    //     <input
    //         className={styles.input}
    //         type='password'
    //         placeholder='Password'
    //         value={loginPassword}
    //         onChange={event => setLoginPassword(event.target.value)}
    //     />
    // </form>
    <Fragment>
       <Button onClick={handleModalOpen} sx={{color:"white", mr:3}}>Login</Button>

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
          onClick={login}
        >
          Sign In
        </Button>
      </form>
    </div>
  </Fade>
</Modal>
    </Fragment>
  );
};
