import '../app/globals.css';  // Adjust path if necessary
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return <SessionProvider session={pageProps.session}>
    <Component {...pageProps} />
  </SessionProvider>;
}

export default MyApp;