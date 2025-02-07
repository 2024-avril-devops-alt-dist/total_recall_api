import * as z from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "L'email est obligatoire" })
    .max(255)
    .email({ message: "Doit être un email valide" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Le mot de passe est obligatoire" })
    .max(255)
    .min(8, { message: "Trop court" }),
});

export default loginSchema;
