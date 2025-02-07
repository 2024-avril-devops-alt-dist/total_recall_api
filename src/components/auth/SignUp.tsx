"use client";

import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

import registerSchema from "@/schemas/register";
import SpanEye from "./AuthModal/SpanEye";
import { useRouter } from "next/navigation";

const SignUp = ({ children }: { children?: React.ReactNode }) => {
  const [formStep, setFormStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const divRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    const { ...rest } = values;
    const data = { ...rest, provider: "local" };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        console.log("Account created! Redirecting to login...");

        // rediriger vers la page de connexion
        form.reset();
        setFormStep(0);
        router.back();
      } else {
        const { error } = await res.json();

        setError(error);
      }
    } catch (error: any) {
      setError(error?.message);
    }
  };

  const handleGoBack = () => {
    // Accédez à l'élément de formulaire à l'aide de la référence
    const formElement = divRef.current;

    if (formElement) {
      // Réinitialisez la position de défilement au début du formulaire
      formElement.scrollTop = 0;
    }
    // Réinitialiser le formStep à 0 pour afficher le premier enfant
    setFormStep(0);
  };

  const handleVisible = () => {
    setVisible(!visible);
  };
  return (
    <Form {...form}>
      {children}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          id="register-form"
          ref={divRef}
          className={cn("relative flex flex-col space-y-3 overflow-hidden", {
            "overflow-y-auto": formStep == 1,
          })}
        >
          <motion.div
            className={cn("space-y-3", {
              // hidden: formStep == 1,
            })}
            animate={{
              translateX: `-${formStep * 100}%`,
            }}
            transition={{
              ease: "easeInOut",
            }}
          >
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom*</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="doe"
                      autoComplete="family-name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom*</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="john"
                      autoComplete="given-name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone*</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="06 00 00 00 00"
                      autoComplete="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="mt-6 text-primary-title text-sm">
              Vous avez déjà un compte ? &nbsp;
              <Link
                href="/sign-in"
                className="text-primary-title cursor-pointer font-bold"
              >
                Se connecter
              </Link>
            </p>
          </motion.div>
          <motion.div
            className={cn("space-y-3 absolute top-0 left-0 right-0", {
              // hidden: formStep == 0,
            })}
            // formStep == 0 -> translateX == 100%
            // formStep == 1 -> translateX == 0
            animate={{
              translateX: `${100 - formStep * 100}%`,
            }}
            style={{
              translateX: `${100 - formStep * 100}%`,
            }}
            transition={{
              ease: "easeInOut",
            }}
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

            <FormField
              control={form.control}
              name="cgu"
              render={({ field }) => (
                <div className="my-2">
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-xl border-2 border-input p-4 mb-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal font">
                        J’accepte les conditions générales.
                      </FormLabel>
                    </div>
                  </FormItem>
                  <FormMessage className="mb-4" />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="dataExploitation"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-xl border-2 border-input p-4 mb-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal font">
                      En envoyant ma demande, j'accepte que le groupe Golobe
                      exploite mes données personnelles dans le cadre de ma
                      demande de contact et de la relation commerciale qui
                      pourrait en découler.
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <div className="block">
              <p className="text-xs mb-6 block">
                Vous avez la possibilité de modifier votre consentement,
                d'exercer vos droits pour accéder, rectifier, effacer vos
                données, limiter leurs traitements, vous y opposer et demander
                la portabilité de celle-ci. Pour cela vous pouvez consulter sur
                ce lien notre{" "}
                <Link href="/cgu" className="text-primary underline">
                  Charte de protection des données à caractère personnel.
                </Link>
              </p>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-row flex-wrap justify-between items-center mt-4">
          <Button
            type="button"
            variant={"outline"}
            className={cn({
              hidden: formStep == 1,
            })}
            onClick={() => {
              // validation
              form.trigger(["lastName", "firstName", "phone"]);
              const lastNameState = form.getFieldState("lastName");
              const firstNameState = form.getFieldState("firstName");
              const phoneState = form.getFieldState("phone");

              if (!lastNameState.isDirty || lastNameState.invalid) return;
              if (!firstNameState.isDirty || firstNameState.invalid) return;
              if (!phoneState.isDirty || phoneState.invalid) return;

              setFormStep(1);
            }}
          >
            Continuer
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            type="button"
            variant={"outline"}
            onClick={handleGoBack}
            className={cn({
              hidden: formStep == 0,
            })}
          >
            Retour
          </Button>
          <Button
            type="submit"
            className={cn({
              hidden: formStep == 0,
            })}
          >
            Valider
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignUp;
