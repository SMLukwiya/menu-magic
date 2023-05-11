import { LoadingPage } from "@/components/ui/loading";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      void router.replace("/");
    }
  }, [isSignedIn, isLoaded, router]);

  if (!isLoaded || !isSignedIn) return <LoadingPage />;
  return <>{children}</>;
};

export { AuthGuard };
