import "@/styles/globals.css";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/helpers/GoogleAnalytics";

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
