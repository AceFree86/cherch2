import "@/styles/globals.css";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-light1 w-full min-h-screen">
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
