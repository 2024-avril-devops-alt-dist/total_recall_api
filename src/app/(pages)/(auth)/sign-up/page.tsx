import { auth } from "@/auth";
import SignUp from "@/components/auth/SignUp";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await auth();

  if (user) {
    return redirect("/");
  }
  return (
    <div className="flex justify-center items-center h-screen max-w-sm mx-auto">
      <SignUp />
    </div>
  );
};

export default page;
