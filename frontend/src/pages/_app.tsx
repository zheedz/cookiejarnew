import Head from "next/head";

import { FunctionComponent, Fragment, useEffect, useState } from "react";
import { AppProps } from "next/app";
import { Metadata } from "next";

import "./globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Navbar as GuestNavbar } from "components/navbars/guest";
import { Navbar as AdminNavbar } from "components/navbars/admin";
import { Navbar as MemberNavbar } from "components/navbars/member";
import Login from "./Login/login";
import Register from "./Register/register";

import { http } from "utils/http";
import { UserRoles } from "utils/enum";

const metadata: Metadata = {
  title: "Dynamic Website Frontend",
  description: "A dynamic website frontend",
};

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  const [verified, setVerified] = useState<UserRoles>(UserRoles.guest);

  let navbar: JSX.Element = <GuestNavbar />;

  useEffect(() => {
    switch (verified) {
      case UserRoles.member:
        navbar = <MemberNavbar />;
        break;
      case UserRoles.admin:
        navbar = <AdminNavbar />;
        break;
      default:
        navbar = <GuestNavbar />;
    }
  }, [verified]);


  const customPalette = {
    primary: {
      main: "#E51A5E", // button 1 color
      contrastText: "#FFFFFF", // text color for button 1
    },
    secondary: {
      main: "#AF7B8C", // button 2 color
      contrastText: "#1C0D12", // text color for button 2
    },
    text: {
      primary: "#1C0D12", // text color
      secondary: "#1C0D12", // subtext color
    },
    background: {
      default: "#E8EBF3", // background color
    },
  };

  const theme = createTheme({
    palette: {
      ...customPalette,
    },
  });

  return (
    <Fragment>
      <Head>
        <title>{String(metadata.title)}</title>
        <meta name="description" content={metadata.description!} />
      </Head>
      <ThemeProvider theme={theme}>
        <Register/>
      </ThemeProvider>

      <Component {...pageProps} />
    </Fragment>
  );
};

export default App;
