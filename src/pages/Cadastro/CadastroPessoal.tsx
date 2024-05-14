import { Button, Label, Fieldset, Input, Form, Titulo, ErrorMessage } from "../../components";
import { useForm, Controller } from "react-hook-form";
import InputMask from "../../components/InputMask";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schemaCadastro = z.object({
  nome: z.string().min(5,{message:"O nome deve conter no mínimo 5 caracteres"}),
  email: z.string().min(8, {message:"O campo é obrigatório"}).email({message:"Endereço de email inválido"}).transform((val)=> val.toLocaleLowerCase()),
  telefone: z.string().min(1, {message:"O campo é obrifatório"}).regex(/^\(\d{2,3}\) \d{5}-\d{4}$/, "O telefone inserido está no formato incorreto"),
  senha: z.string().min(8, {message:"A senha deve ter no mínimo 8 caracteres"}),
  senhaVerificada: z.string().min(8, {message:"Este campo não pode ser vazio"}),
}).refine((dados) => dados.senha === dados.senhaVerificada, {
  message: "As senhas não coincidem",
  path: ["senhaVerificada"],
});
type FormInputProps = z.infer<typeof schemaCadastro>;

const CadastroPessoal = () => {
  const {register, handleSubmit, formState:{errors}, control} = useForm<FormInputProps>(
    {
      mode:'all',
      resolver: zodResolver(schemaCadastro),
      defaultValues:{
        nome:'',
        email:'',
        telefone:'',
        senha:'',
        senhaVerificada:'',
      }
    }
  );

  const aoSubmeter = (dados: FormInputProps) => {
    console.log(dados);
  }
 
  return (
    <>
      <Titulo>Insira alguns dados básicos:</Titulo>
      <Form onSubmit={handleSubmit(aoSubmeter)}>
        <Fieldset>
          <Label htmlFor="campo-nome">Nome</Label>
          <Input
            id="campo-nome"
            placeholder="Digite seu nome completo"
            type="text"
            $error={!!errors.nome}
            aria-describedby="erro-name"
            {...register("nome")}
          />
          {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}
        </Fieldset>
        <Fieldset>
          <Label htmlFor="campo-email">E-mail</Label>
          <Input
            id="campo-email"
            placeholder="Insira seu endereço de email"
            type="email"
            $error={!!errors.email}
            {...register("email")}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </Fieldset>
        <Controller 
          control={control} name="telefone" 
          render={({field}) => (
            <Fieldset>
              <Label>Telefone</Label>
              <InputMask
                mask="(99) 99999-9999"
                placeholder="Ex: (DD) XXXXX-XXXX"
                $error={!!errors.telefone}
                onChange={field.onChange}
              />
              {errors.telefone && (<ErrorMessage>{errors.telefone.message}</ErrorMessage>)}
            </Fieldset>
          )}
        />
        <Fieldset>
          <Label htmlFor="campo-senha">Crie uma senha</Label>
          <Input
            id="campo-senha"
            placeholder="Crie uma senha"
            type="password"
            $error={!!errors.senha}
            {...register("senha")}
          />
          {errors.senha && <ErrorMessage>{errors.senha.message}</ErrorMessage>}
        </Fieldset>
        <Fieldset>
          <Label htmlFor="campo-senha-confirmacao">Repita a senha</Label>
          <Input
            id="campo-senha-confirmacao"
            placeholder="Repita a senha anterior"
            type="password"
            $error={!!errors.senhaVerificada}
            {...register("senhaVerificada")}
          />
          {errors.senhaVerificada && <ErrorMessage>{errors.senhaVerificada.message}</ErrorMessage>}
        </Fieldset>
        <Button type="submit">Avançar</Button>
      </Form>
    </>
  );
};

export default CadastroPessoal;
