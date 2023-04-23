import { z } from "zod";

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(3, "O nome obrigatório,precisa pelo menos 3 caracteres."),
    email: z
      .string()
      .nonempty("O e-mail é obrigatório")
      .email("Forneça um e-mail válido"),
    password: z
      .string()
      .min(7, "A senha precisa conter pelo menos 7 caracteres")
      .regex(
        /(?=.*?[#?!@$%^&*-])/,
        "É necessário pelo menos um caracter especial"
      )
      .regex(/(?=.*?[A-Z])/, "É necessário pelo menos uma letra maiúscula")
      .regex(/(?=.*?[a-z])/, "É necessário pelo menos uma letra minúscula"),
    confirmPassword: z.string().nonempty("É obrigatório confirmar a senha"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "A senha precisa ser igual a confirmaçao da senha.",
    path: ["confirmPassword"],
  });

export type TRegisterFormValues = z.infer<typeof registerFormSchema>;
