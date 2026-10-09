import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export interface IFormInput {
  name: string;
  email: string;
  password: string;
}

export default function SigIn() {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  async function onSubmit(data: IFormInput) {
    try {
      await axios.post("http://localhost:3000/auth/signin", data, {
        withCredentials: true,
      });

      handleLogin();
      return navigate("/");
    } catch (err) {
      const message =
        (axios.isAxiosError(err) && err.response?.data?.error) ||
        "Erro ao realizar cadastro.";
      setServerError(message);
    }
  }

  return (
    <div>
      <Link to="/">Home</Link>
      <h1>Auth page</h1>

      {serverError && <p style={{ color: "red" }}>{serverError}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            {...register("name", { required: true, maxLength: 20 })}
            id="name"
            type="text"
          />
          {errors.name && <p>{errors.name?.message}</p>}
        </div>
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
          {isSubmitting ? "Signing in" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
