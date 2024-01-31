// import { Provider } from "next-auth/client";
import Head from "next/head";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "styled-components";

import Header from "./Header";
import Footer from "./Footer";
import "../styles/layout.css";
// import Navbar from "@/components/Navbar";

const theme = {
  colors: {
    primary: "#FF0000",
  },
};

export default function App({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Main layout Default head tag</title>
        <meta
          name="description"
          content="This is for using layout page meta description"
        />
      </Head>
      {/* <Navbar /> */}
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}
