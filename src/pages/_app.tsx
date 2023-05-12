import Head from "next/head";
import { type AppType } from "next/app";

import { Toaster } from "@/components/ui/toaster";

import { api } from "@/lib/api";

import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ClerkProvider
        {...pageProps}
        appearance={{
          layout: {
            logoImageUrl: "/logo.png",
            socialButtonsVariant: "blockButton",
            logoPlacement: "outside",
          },
          variables: {
            colorPrimary: "#9ca3af",
            borderRadius: "4px",
          },
          elements: {
            card: "shadow-none border-slate-200 rounded-md",
          },
        }}
      >
        <Component {...pageProps} />
        <Toaster />
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
