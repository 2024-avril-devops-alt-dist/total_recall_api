import { getCurrentUser } from "@/db/user.query";
import { AccountCompleteForm } from "./AccountCompleteForm";

export const AccountCompleteModal = async () => {
  const user = await getCurrentUser();

  if (user?.phone && user?.role) {
    return null;
  }

  return (
    <div className="fixed z-50 w-full h-full bg-background">
      <div className="flex flex-col gap-6 justify-center items-center max-w-md m-auto h-screen ">
        <h1 className="font-title text-center w-full font-bold text-primary-title text-2xl">
          Complétez vos informations
        </h1>
        <p>Renseignez les champs ci-dessous pour finaliser votre inscription</p>
        <div className="w-full">
          <AccountCompleteForm />
        </div>
      </div>
    </div>
  );
};
