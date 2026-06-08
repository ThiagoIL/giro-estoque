"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { useApp } from "@/context/AppContext";

export default function CadastroPage() {
  const { register } = useApp();
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    cnpj: "",
    email: "",
    senha: "",
    cidade: "",
    telefone: "",
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(form);
    router.push("/produtos");
  };

  const field = (label: string, key: keyof typeof form, type = "text") => (
    <div>
      <label className="block text-sm font-semibold text-zinc-700 mb-2">{label}</label>
      <input
        type={type}
        required
        value={form[key]}
        onChange={(e) => update(key, e.target.value)}
        className="w-full px-4 py-3 rounded-2xl border border-zinc-200 outline-none focus:border-orange-500 transition"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <Header />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-zinc-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center">
              <UserPlus />
            </div>
            <h1 className="text-3xl font-black text-zinc-800">Cadastro de Empresa</h1>
          </div>
          <p className="text-zinc-500 mb-8">Crie sua conta para gerenciar produtos e estoques.</p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">{field("Nome da empresa", "nome")}</div>
            {field("CNPJ", "cnpj")}
            {field("Cidade", "cidade")}
            {field("Email", "email", "email")}
            {field("Telefone", "telefone")}
            <div className="md:col-span-2">{field("Senha", "senha", "password")}</div>
            <button
              type="submit"
              className="md:col-span-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-semibold shadow-lg transition mt-2 cursor-pointer"
            >
              Criar conta
            </button>
          </form>

          <p className="text-center text-zinc-500 text-sm mt-6">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-orange-500 font-semibold">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
