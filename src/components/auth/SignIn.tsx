import { ReactNode } from "react";
import LoginForm from "@/components/auth/LoginForm";
import ProviderSignIn from "@/components/auth/ProviderSignIn";

const SignIn = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full p-6 bg-white rounded-xl">
      {children}
      <LoginForm />
      <ProviderSignIn />
    </div>
  );
};

export default SignIn;
