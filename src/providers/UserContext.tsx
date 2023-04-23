import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TLoginFormValues } from "../components/Form/LoginForm/loginFormSchema";
import { TRegisterFormValues } from "../components/Form/RegisterForm/registerFormSchema";
import { api } from "../services/api";
import { toast } from "react-toastify";

interface IUserProviderProps {
  children: React.ReactNode;
}

interface IUserContext {
  user: IUser | null;
  userLogin: (
    formData: TLoginFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  userRegister: (
    formData: TRegisterFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  userLogout: () => void;
}

interface IUser {
  email: string;
  name: string;
  job: string;
  id: number;
}

interface IUserLoginResponse {
  accessToken: string;
  user: IUser;
}

interface IUserRegisterResponse {
  accessToken: string;
  user: IUser;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("@hamburgueria:TOKEN");
    const userId = localStorage.getItem("@hamburgueria:USERID");

    const userAutoLogin = async () => {
      try {
        const { data } = await api.get<IUser>(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
        navigate("/shop");
      } catch (error) {
        localStorage.removeItem("@hamburgueria:TOKEN");
        localStorage.removeItem("@hamburgueria:USERID");
      }
    };

    if (token && userId) {
      userAutoLogin();
    }
  }, []);

  const navigate = useNavigate();

  const userLogin = async (
    formData: TLoginFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const { data } = await api.post<IUserLoginResponse>("/login", formData);
      localStorage.setItem("@hamburgueria:TOKEN", data.accessToken);
      localStorage.setItem(
        "@hamburgueria:USERID",
        JSON.stringify(data.user.id)
      );
      setUser(data.user);
      navigate("/shop");
    } catch (error) {
      toast.error("Usuário e/ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  const userRegister = async (
    formData: TRegisterFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      await api.post<IUserRegisterResponse>("/users", formData);
      toast.success("Cadastro efetuado com sucesso");
      navigate("/");
    } catch (error) {
      toast.error("por favor verique os dados antes do envio");
    } finally {
      setLoading(false);
    }
  };

  const userLogout = () => {
    localStorage.removeItem("@hamburgueria:TOKEN");
    localStorage.removeItem("@hamburgueria:USERID");
    localStorage.removeItem("@hamburgueria:CARTLIST");
    setUser(null);
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, userLogin, userRegister, userLogout }}>
      {children}
    </UserContext.Provider>
  );
};
