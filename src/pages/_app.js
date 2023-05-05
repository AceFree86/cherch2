import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Router from "next/router";
import NProgress from "nprogress";
import "../styles/Nprogress.css";
import GoogleAnalytics from "@/components/helpers/GoogleAnalytics";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GoogleAnalytics GoogId={process.env.NEXT_PUBLIC_GIDA} />
      <main className="bg-white w-full min-h-screen">
        <SessionProvider>
          <NavBar />
          <ToastContainer />
          <Component {...pageProps} />
          <Footer />
        </SessionProvider>
      </main>
    </>
  );
}
