"use client";

import { useState } from "react";
import { Building2, MapPin, Phone, Eye } from "lucide-react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { useApp } from "@/context/AppContext";

export default function FornecedoresPage() {
  const { fornecedores } = useApp();
  const [busca, setBusca] = useState("");
  const lista = fornecedores.filter(
    (f) =>
      f.nome.toLowerCase().includes(busca.toLowerCase()) ||
      f.cidade.toLowerCase().includes(busca.toLowerCase()) ||
      f.categoria.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <Header />
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-black text-zinc-800">Fornecedores</h1>
        <p className="text-zinc-500 mt-2">Empresas associadas ao Giro Estoque.</p>

        <div className="mt-8">
          <SearchBar value={busca} onChange={setBusca} placeholder="Buscar por nome, cidade ou categoria..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 animate-in fade-in duration-500">
          {lista.map((f) => (
            <div
              key={f.id}
              className="bg-white rounded-3xl p-6 shadow-lg border border-zinc-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center shadow-md">
                <Building2 />
              </div>
              <h3 className="text-2xl font-black text-zinc-800 mt-4">{f.nome}</h3>
              <span className="inline-block mt-2 bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full font-semibold">
                {f.categoria}
              </span>
              <div className="mt-4 space-y-2 text-zinc-600">
                <p className="flex items-center gap-2 text-sm">
                  <MapPin size={16} className="text-zinc-400" />
                  {f.cidade}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <Phone size={16} className="text-zinc-400" />
                  {f.contato}
                </p>
              </div>
              <button className="mt-5 w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-black text-white py-3 rounded-2xl font-semibold transition cursor-pointer">
                <Eye size={18} /> Visualizar
              </button>
            </div>
          ))}
          {lista.length === 0 && (
            <div className="md:col-span-2 lg:col-span-3 bg-white rounded-3xl p-16 text-center border border-dashed border-zinc-300">
              <Building2 className="mx-auto text-zinc-300" size={64} />
              <h3 className="text-2xl font-bold text-zinc-700 mt-4">Nenhum fornecedor encontrado</h3>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
