"use client";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import AuthModal from "@/components/auth/AuthModal/AuthModal";
import { DialogFooter } from "@/components/ui/dialog";
import clsx from "clsx";
import Image from "next/image";
import { useCallback, useState } from "react";
import useLoginModal from "@/hooks/useLoginModal";
import { Loader2Icon } from "lucide-react";
import loginSchema from "@/schemas/login";
import useRegisterModal from "@/hooks/useRegisterModal";
import SpanEye from "./SpanEye";
import githubIcon from "@/icons/github.svg";

const LoginModal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const router = useRouter();
  const userRegisterModal = useRegisterModal();
  const userLoginModal = useLoginModal();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      setLoading(false);
      console.log("res", res);

      if (res?.ok && !res?.error) {
        console.log("success Logged in");
        router.refresh();
        userLoginModal.onToggle();
        setError(null);
      }

      if (res?.error) {
        setError(res?.error);
        console.log("200error", res?.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeModal = useCallback(() => {
    userLoginModal.onToggle();
    userRegisterModal.onToggle();
  }, [userLoginModal, userRegisterModal]);

  const handleVisible = () => {
    setVisible(!visible);
  };

  return (
    <AuthModal
      title="Connexion"
      buttonName="Connexion / Inscription"
      isOpen={userLoginModal.isOpen}
      onToggle={userLoginModal.onToggle}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
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
                    autoComplete="email"
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
              <FormItem>
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

          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? <Loader2Icon className="animate-spin" /> : "Connexion"}
          </Button>

          <p className="mt-6 text-primary-title font-bold text-sm">
            Vous n’avez pas de compte ?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={handleChangeModal}
            >
              Inscrivez-vous
            </span>
          </p>
        </form>
      </Form>
      <hr
        className={clsx(
          "overflow-visible block border-0",
          "text-center my-6 text-primary-title h-0.5 bg-input",
          "before:content-['or'] before:relative before:-top-3 before:px-6 before:bg-white"
        )}
      />
      <DialogFooter className="space-y-3">
        <Button
          variant="outline"
          className="p-6 flex justify-between items-center"
          onClick={() => signIn("github")}
        >
          <Image src={githubIcon} alt="github icon" />
          <span className="flex-1">Continuer avec Github</span>
        </Button>
      </DialogFooter>
    </AuthModal>
  );
};

export default LoginModal;
