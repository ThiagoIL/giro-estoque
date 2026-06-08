"use client";

import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { useApp } from "@/context/AppContext";
import { categoriasNomes } from "@/lib/categorias";

export default function CadastroProdutoPage() {
  const { user, addProduto } = useApp();
  const router = useRouter();
  const [form, setForm] = useState({
    produto: "",
    categoria: categoriasNomes[0],
    quantidade: 0,
    empresa: "",
    imagem: "",
    descricao: "",
  });

  // Keep form.empresa in sync with user.nome once user loaded
  useEffect(() => {
    if (user) {
      setForm((f) => ({ ...f, empresa: f.empresa || user.nome }));
    } else {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  const update = (k: string, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduto({
      produto: form.produto,
      categoria: form.categoria,
      quantidade: Number(form.quantidade),
      empresa: form.empresa,
      imagem: form.imagem || "https://images.unsplash.com/photo-1582582429416-cf06c7db4f84?q=80&w=1200",
      descricao: form.descricao,
    });
    router.push("/produtos");
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <Header />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-zinc-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center">
              <PlusCircle />
            </div>
            <h1 className="text-3xl font-black text-zinc-800">Cadastro de Produto</h1>
          </div>
          <p className="text-zinc-500 mb-8">Adicione um novo item ao seu estoque.</p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-zinc-700 mb-2">Nome do produto</label>
              <input
                required
                value={form.produto}
                onChange={(e) => update("produto", e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-zinc-200 outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-2">Categoria</label>
              <select
                value={form.categoria}
                onChange={(e) => update("categoria", e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-zinc-200 outline-none focus:border-orange-500 bg-white"
              >
                {categoriasNomes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-2">Quantidade</label>
              <input
                type="number"
                min={0}
                required
                value={form.quantidade}
                onChange={(e) => update("quantidade", e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-zinc-200 outline-none focus:border-orange-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-zinc-700 mb-2">Empresa</label>
              <input
                required
                value={form.empresa}
                onChange={(e) => update("empresa", e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-zinc-200 outline-none focus:border-orange-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-zinc-700 mb-2">Imagem (URL)</label>
              <input
                value={form.imagem}
                onChange={(e) => update("imagem", e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-zinc-200 outline-none focus:border-orange-500"
                placeholder="https://..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-zinc-700 mb-2">Descrição</label>
              <textarea
                value={form.descricao}
                onChange={(e) => update("descricao", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-2xl border border-zinc-200 outline-none focus:border-orange-500 resize-none"
              />
            </div>
            <button
              type="submit"
              className="md:col-span-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-semibold shadow-lg transition mt-2 cursor-pointer"
            >
              Salvar produto
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
