import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export interface IIFormInput {
  email: string;
  password: string;
}

export default function LogIn() {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IIFormInput>();
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  async function onSubmit(data: IIFormInput) {
    try {
      await axios.post("http://localhost:3000/auth/login", data, {
        withCredentials: true,
      });

      handleLogin();
      navigate("/");
    } catch (err) {
      const message =
        (axios.isAxiosError(err) && err.response?.data?.error) ||
        "Erro ao realizar login.";
      setServerError(message);
    }
  }

  return (
    <div>
      <Link to="/">Home</Link>
      {serverError && <p style={{ color: "red" }}>{serverError}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            {...register("email", {
              required: "Provide a valid email",
              maxLength: {
                value: 25,
                message: "Max length is 25",
              },
            })}
            id="email"
            type="email"
          />
          {errors.email && <p>{errors.email?.message}</p>}
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Min password length is 6",
              },
            })}
            id="password"
            type="password"
          />
        </div>
        {errors.password && <p>{errors.password?.message}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loging" : "Log In"}
        </button>
      </form>
    </div>
  );
}
