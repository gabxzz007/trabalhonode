import { z } from "zod";

export const UtilizadorSchema = z.object({
  nome: z.string().min(3, "Mínimo 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "Mínimo 6 caracteres"),
  idade: z.number().positive("A idade deve ser positiva")
});
