"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import SpanEye from "./AuthModal/SpanEye";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "@/schemas/login";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const router = useRouter();

  const handleVisible = () => {
    setVisible(!visible);
  };

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      setIsLoading(false);

      if (res?.ok) {
        router.back();
        router.refresh();
        window.location.reload();
        setError(null);
      }

      if (res?.error) {
        console.log("error", res);
        setError(res?.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse e-mail*</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  {...field}
                  autoComplete="on"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Mot de passe*</FormLabel>
              <FormControl>
                <Input
                  type={visible ? "text" : "password"}
                  placeholder="********"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <SpanEye visible={visible} handleVisible={handleVisible} />
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <p className="text-red-500 text-sm text-center font-bold mb-4">
            {error}
          </p>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2Icon className="animate-spin" /> : "Connexion"}
        </Button>

        <p className="mt-6 text-primary-title text-sm">
          Vous n’avez pas de compte ?{" "}
          <Link
            href="/sign-up"
            className="text-primary-title cursor-pointer font-bold"
          >
            Inscrivez-vous
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
