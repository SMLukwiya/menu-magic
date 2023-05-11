import { SignUp } from "@clerk/nextjs";
import { type NextPage } from "next";

const SignUpPage: NextPage = () => (
  <div className="-mt-20 flex h-screen items-center justify-center">
    <SignUp
      path="/sign-up"
      routing="path"
      signInUrl="/sign-in"
      redirectUrl="/dashboard"
    />
  </div>
);

export default SignUpPage;
