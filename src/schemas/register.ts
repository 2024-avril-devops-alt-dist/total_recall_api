import { Role } from "@prisma/client";
import * as z from "zod";

// Définition de l'expression régulière pour le format du numéro de téléphone français
export const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "Le prénom  est obligatoire" })
    .max(255),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Le nom de famille est obligatoire" })
    .max(255),
  phone: z.string().refine((value) => phoneRegex.test(value), {
    message:
      "Veuillez entrer un numéro de téléphone français valide au format 0X XX XX XX XX",
  }),
  email: z
    .string()
    .trim()
    .min(1, { message: "L'email est obligatoire" })
    .email({ message: "Doit être un email valide" })
    .max(255),
  password: z
    .string()
    .trim()
    .min(1, { message: "Le mot de passe est obligatoire" })
    .min(8, { message: "Trop court" })
    .max(255),
  cgu: z.boolean().refine((value) => value === true, {
    message: "Vous devez accepter les conditions générales d'utilisation",
  }),
  dataExploitation: z.boolean().default(false).optional(),
});

export default registerSchema;
