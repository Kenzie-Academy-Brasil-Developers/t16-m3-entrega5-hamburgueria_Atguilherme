import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserContext } from "../../../providers/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema, TRegisterFormValues } from "./registerFormSchema";
import Input from "../Input";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const { userRegister } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
  });

  const submit: SubmitHandler<TRegisterFormValues> = (formData) => {
    userRegister(formData, setLoading);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        type="text"
        id="name"
        {...register("name")}
        placeholder="Nome"
        disabled={loading}
        error={errors.name}
      />
      <Input
        type="email"
        id="email"
        {...register("email")}
        placeholder="E-mail"
        disabled={loading}
        error={errors.email}
      />
      <Input
        type="password"
        id="password"
        {...register("password")}
        placeholder="Senha"
        disabled={loading}
        error={errors.password}
      />
      <Input
        type="password"
        id="confirmPassword"
        {...register("confirmPassword")}
        placeholder="Confirme a senha"
        disabled={loading}
        error={errors.confirmPassword}
      />
      <StyledButton
        type="submit"
        $buttonSize="default"
        $buttonStyle="gray"
        disabled={loading}
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </StyledButton>
    </StyledForm>
  );
};
export default RegisterForm;
