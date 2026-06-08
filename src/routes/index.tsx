import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, Package as PackageIcon } from "lucide-react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { categorias } from "@/lib/categorias";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { produtos } = useApp();
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  const produtosFiltrados = produtos.filter((item) => {
    const buscaOk =
      item.produto.toLowerCase().includes(busca.toLowerCase()) ||
      item.empresa.toLowerCase().includes(busca.toLowerCase());
    const categoriaOk = categoriaSelecionada === "" || item.categoria === categoriaSelecionada;
    return buscaOk && categoriaOk;
  });

  const limparFiltros = () => { setBusca(""); setCategoriaSelecionada(""); };
  const temFiltro = busca !== "" || categoriaSelecionada !== "";

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-[32px] p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 text-[220px] font-black select-none">GIRO</div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black max-w-3xl leading-tight">
              Consulte estoques disponíveis entre empresas do setor moveleiro.
            </h2>
            <p className="mt-5 text-orange-100 text-lg max-w-2xl">
              Compartilhe materiais, encontre oportunidades e aumente o giro de estoque das empresas associadas.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h2 className="text-3xl font-black text-zinc-800">Categorias</h2>
            <p className="text-zinc-500 mt-1">Escolha uma categoria para filtrar os produtos.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {categorias.map((cat) => (
            <CategoryCard
              key={cat.id}
              nome={cat.nome}
              icon={cat.icon}
              cor={cat.cor}
              ativo={categoriaSelecionada === cat.nome}
              onClick={() => setCategoriaSelecionada(categoriaSelecionada === cat.nome ? "" : cat.nome)}
            />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="text-orange-500" />
          <h2 className="text-3xl font-black text-zinc-800">Estoques Disponíveis</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <SearchBar value={busca} onChange={setBusca} />
          <button
            onClick={limparFiltros}
            disabled={!temFiltro}
            className="bg-zinc-900 hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed px-6 py-4 rounded-2xl text-white font-semibold transition shadow-lg"
          >
            Remover Filtros
          </button>
        </div>

        {produtosFiltrados.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-zinc-300">
            <PackageIcon className="mx-auto text-zinc-300" size={64} />
            <h3 className="text-2xl font-bold text-zinc-700 mt-4">Nenhum produto encontrado</h3>
            <p className="text-zinc-500 mt-2">Tente ajustar a busca ou remover os filtros.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-500">
            {produtosFiltrados.map((item) => <ProductCard key={item.id} item={item} />)}
          </div>
        )}
      </section>
    </div>
  );
}
