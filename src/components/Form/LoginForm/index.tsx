import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import Input from "../Input";
import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserContext } from "../../../providers/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, TLoginFormValues } from "./loginFormSchema";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { userLogin } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  const submit: SubmitHandler<TLoginFormValues> = (formData) => {
    userLogin(formData, setLoading);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
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
        id="senha"
        {...register("password")}
        placeholder="Senha"
        disabled={loading}
        error={errors.password}
      />
      <StyledButton
        $buttonSize="default"
        $buttonStyle="green"
        disabled={loading}
      >
        {loading ? "Entrando..." : "Entrar"}
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
