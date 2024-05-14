import { z } from "zod";

export const schemaCadastroEnderecoEsp = z.object({
    endereco: z.object({
      cep: z.string().min(8, "Informe um CEP válido"),
      avatar: z.instanceof(FileList).transform((lista) => lista.item(0)!),
      rua: z.string().min(1, "Informe o nome da rua"),
      numero: z.coerce.number().min(1, "Informe o número"),
      bairro: z.string().min(1, "Informe o nome do bairro"),
      localidade: z.string().min(1, "Informe a localidade correta"),
    })
  })