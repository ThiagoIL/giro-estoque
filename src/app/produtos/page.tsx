"use client";

import { useState } from "react";
import { Package as PackageIcon } from "lucide-react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import { categoriasNomes } from "@/lib/categorias";
import { useApp } from "@/context/AppContext";

export default function ProdutosPage() {
  const { produtos } = useApp();
  const [busca, setBusca] = useState("");
  const [cat, setCat] = useState("");

  const lista = produtos.filter((p) => {
    const buscaOk =
      p.produto.toLowerCase().includes(busca.toLowerCase()) ||
      p.empresa.toLowerCase().includes(busca.toLowerCase());
    const catOk = cat === "" || p.categoria === cat;
    return buscaOk && catOk;
  });

  const temFiltro = busca !== "" || cat !== "";

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <Header />
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-black text-zinc-800">Produtos</h1>
        <p className="text-zinc-500 mt-2">Lista completa de produtos cadastrados.</p>

        <div className="flex flex-col md:flex-row gap-3 mt-8">
          <SearchBar value={busca} onChange={setBusca} />
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="px-4 py-4 rounded-2xl border border-zinc-200 bg-white outline-none focus:border-orange-500 font-semibold text-zinc-700"
          >
            <option value="">Todas as categorias</option>
            {categoriasNomes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setBusca("");
              setCat("");
            }}
            disabled={!temFiltro}
            className="bg-zinc-900 hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed px-6 py-4 rounded-2xl text-white font-semibold transition shadow-lg cursor-pointer"
          >
            Remover Filtros
          </button>
        </div>

        <div className="mt-8">
          {lista.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-zinc-300">
              <PackageIcon className="mx-auto text-zinc-300" size={64} />
              <h3 className="text-2xl font-bold text-zinc-700 mt-4">Nenhum produto encontrado</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-500">
              {lista.map((p) => (
                <ProductCard key={p.id} item={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
