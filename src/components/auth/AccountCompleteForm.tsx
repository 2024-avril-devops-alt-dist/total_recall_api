"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

type StateAccountComplete = {
  errors?: {
    phone?: string[];
    role?: string[];
  };
  message?: string | null;
};

export const AccountCompleteForm = () => {
  const initialState = {
    message: null,
    errors: {
      phone: [],
      role: [],
    },
  };

  const [state, setState] = useState<StateAccountComplete>(initialState);
  const [pending, setPending] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const result = Object.fromEntries(formData);

    if (result?.errors) {
      setState(result);
      setPending(false);
      return;
    }

    setState(initialState);
    toast({
      title: "Succès",
      description: String(result.message),
    });

    setPending(false);
    router.refresh();
    window.location.reload();
    return;
  };

  return (
    <form onSubmit={onSubmit} className="text-primary-title">
      <div className="mb-4 ">
        <label htmlFor="phone" className="mb-2 block text-sm font-medium">
          Téléphone*
        </label>
        <div className="relative">
          <Input
            type="text"
            name="phone"
            id="phone"
            placeholder="06 00 00 00 00"
            autoComplete="tel"
            required
          />
        </div>
        {state?.errors?.phone && (
          <div
            id="phone-error"
            aria-live="polite"
            className="mt-2 text-base text-red-500"
          >
            {state.errors?.phone.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
      </div>

      {state?.message && (
        <p
          id="message"
          aria-live="polite"
          className="mt-2 text-base text-red-500"
        >
          {state.message}
        </p>
      )}
      <div className="flex justify-center ">
        <Button type="submit" className="w-full mt-4" disabled={pending}>
          {pending ? "En cours..." : "Valider"}
        </Button>
      </div>
    </form>
  );
};
