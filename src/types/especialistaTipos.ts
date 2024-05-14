import { z } from "zod";
import { schemaCadastroEnderecoEsp } from "../schemas/schemaEspecialista";

export type FormInputEndEsp = z.infer<typeof schemaCadastroEnderecoEsp>;

export interface EnderecoProps{
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}