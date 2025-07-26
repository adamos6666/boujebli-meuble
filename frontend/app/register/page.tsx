"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const translations = {
  fr: {
    title: "Créer un compte",
    name: "Nom",
    email: "Email",
    password: "Mot de passe",
    submit: "S'inscrire",
    success: "Inscription réussie !",
    errors: {
      name: "Le nom est requis",
      email: "Email invalide",
      password: "Le mot de passe doit contenir au moins 6 caractères"
    }
  },
  en: {
    title: "Register",
    name: "Name",
    email: "Email",
    password: "Password",
    submit: "Register",
    success: "Registration successful!",
    errors: {
      name: "Name is required",
      email: "Invalid email",
      password: "Password must be at least 6 characters"
    }
  },
  ar: {
    title: "إنشاء حساب",
    name: "الاسم",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    submit: "تسجيل",
    success: "تم التسجيل بنجاح!",
    errors: {
      name: "الاسم مطلوب",
      email: "البريد الإلكتروني غير صالح",
      password: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل"
    }
  }
};

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const locale = typeof window !== "undefined" ? (window.location.pathname.split("/")[1] || "fr") : "fr";
  const t = translations[locale] || translations.fr;
  const [success, setSuccess] = useState(false);

  const schema = z.object({
    name: z.string().min(1, t.errors.name),
    email: z.string().email(t.errors.email),
    password: z.string().min(6, t.errors.password)
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
          <label className="block mb-1">{t.name}</label>
          <input
            className="w-full border rounded px-3 py-2"
            {...register("name")}
            type="text"
            autoComplete="name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
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
            autoComplete="new-password"
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