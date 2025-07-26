"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const translations = {
  fr: {
    title: "Connexion",
    email: "Email",
    password: "Mot de passe",
    submit: "Se connecter",
    success: "Connexion réussie !",
    errors: {
      email: "Email invalide",
      password: "Le mot de passe est requis"
    }
  },
  en: {
    title: "Login",
    email: "Email",
    password: "Password",
    submit: "Login",
    success: "Login successful!",
    errors: {
      email: "Invalid email",
      password: "Password is required"
    }
  },
  ar: {
    title: "تسجيل الدخول",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    submit: "دخول",
    success: "تم تسجيل الدخول بنجاح!",
    errors: {
      email: "البريد الإلكتروني غير صالح",
      password: "كلمة المرور مطلوبة"
    }
  }
};

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const locale = typeof window !== "undefined" ? (window.location.pathname.split("/")[1] || "fr") : "fr";
  const t = translations[locale] || translations.fr;
  const [success, setSuccess] = useState(false);

  const schema = z.object({
    email: z.string().email(t.errors.email),
    password: z.string().min(1, t.errors.password)
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    setSuccess(true);
    // Ici, tu pourrais envoyer les données à l'API
  };

  return (
    <section className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">{t.title}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1">{t.email}</label>
          <input
            className="w-full border rounded px-3 py-2"
            {...register("email")}
            type="email"
            autoComplete="email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block mb-1">{t.password}</label>
          <input
            className="w-full border rounded px-3 py-2"
            {...register("password")}
            type="password"
            autoComplete="current-password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded mt-2 hover:bg-gray-800"
        >
          {t.submit}
        </button>
        {success && <p className="text-green-600 mt-2">{t.success}</p>}
      </form>
    </section>
  );
} 