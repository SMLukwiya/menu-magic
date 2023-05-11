import { SignIn } from "@clerk/nextjs";
import { type NextPage } from "next";

const SignInPage: NextPage = () => (
  <div className="-mt-20 flex h-screen flex-col items-center justify-center">
    <SignIn
      path="/sign-in"
      routing="path"
      signUpUrl="/sign-up"
      redirectUrl="/dashboard"
    />
  </div>
);

export default SignInPage;
