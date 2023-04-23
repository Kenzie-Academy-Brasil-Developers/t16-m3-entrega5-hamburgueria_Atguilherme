import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().nonempty("Email inválido"),
  password: z.string().nonempty("Senha é obrigatória"),
});

export type TLoginFormValues = z.infer<typeof loginFormSchema>;
