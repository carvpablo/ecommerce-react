import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { UserPlus, User, Mail, Lock, AlertCircle } from "lucide-react";

export interface IFormInput {
  name: string;
  email: string;
  password: string;
}

export default function SignIn() {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  async function onSubmit(data: IFormInput) {
    setServerError(null);
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
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 shadow-xs p-8 sm:p-10 space-y-8">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
            <UserPlus className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Crie sua conta
          </h2>
          <p className="text-sm text-slate-500">
            Junte-se à nossa loja e aproveite descontos exclusivos
          </p>
        </div>

        {serverError && (
          <div className="flex items-center gap-2 p-3.5 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
              Nome Completo
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                {...register("name", {
                  required: "Nome obrigatório",
                  maxLength: { value: 30, message: "Máximo de 30 caracteres" },
                })}
                id="name"
                type="text"
                placeholder="Ex: Pablo Lemos"
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-500 mt-1 font-medium">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
              E-mail
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                {...register("email", {
                  required: "E-mail obrigatório",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Formato de e-mail inválido",
                  },
                })}
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1 font-medium">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
              Senha
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                {...register("password", {
                  required: "Senha obrigatória",
                  minLength: { value: 6, message: "Mínimo de 6 caracteres" },
                })}
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1 font-medium">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold rounded-xl shadow-sm shadow-indigo-200 transition duration-150"
          >
            {isSubmitting ? "Criando Conta..." : "Cadastrar"}
          </button>
        </form>

        <div className="text-center text-sm text-slate-500 border-t border-slate-100 pt-6">
          Já tem uma conta?{" "}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline">
            Faça login aqui
          </Link>
        </div>
      </div>
    </div>
  );
}
