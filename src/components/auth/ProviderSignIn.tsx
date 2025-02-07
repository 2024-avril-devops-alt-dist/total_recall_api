"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { Icons } from "@/components/ui/Icons";
const ProviderSignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const providerLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      await signIn(provider);
    } catch (error) {
      setError(
        `Une erreur s'est produite lors de la connexion avec ${provider}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <hr
        className={cn(
          "overflow-visible block border-0",
          "text-center my-6 text-primary-title h-0.5 bg-input",
          "before:content-['or'] before:relative before:-top-3 before:px-6 before:bg-white"
        )}
      />

      {error && <p className="text-red-500 text-base font-bold">{error}</p>}

      <Button
        variant="ghost"
        className="flex justify-between items-center w-full mb-2"
        onClick={() => providerLogin("google")}
      >
        <Icons.Github className="w-6 h-6" />
        <span className="flex-1">Continuer avec Github</span>
      </Button>
    </>
  );
};

export default ProviderSignIn;
