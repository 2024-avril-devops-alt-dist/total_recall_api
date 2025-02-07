import { auth } from "@/auth";
import SignIn from "@/components/auth/SignIn";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await auth();

  if (user) {
    return redirect("/");
  }

  return (
    <div className="flex justify-center items-center h-screen max-w-sm mx-auto">
      <SignIn />
    </div>
  );
};

export default page;
