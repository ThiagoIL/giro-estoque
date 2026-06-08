import { useState } from "react";
import { Produto } from "@/context/AppContext";
import { handleImgError } from "@/lib/image";
import ProductModal from "./ProductModal";

export default function ProductCard({ item }: { item: Produto }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-[28px] overflow-hidden shadow-md border border-zinc-100 hover:shadow-2xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1.5 group">
        <div className="h-56 overflow-hidden bg-zinc-100">
          <img
            src={item.imagem}
            alt={item.produto}
            onError={handleImgError}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-out"
          />
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <span className="bg-orange-100 text-orange-600 text-sm px-3 py-1 rounded-full font-semibold">
                {item.categoria}
              </span>
              <h3 className="text-2xl font-black text-zinc-800 mt-4 leading-tight">
                {item.produto}
              </h3>
              <p className="text-zinc-500 mt-3 text-sm">
                Empresa:
                <span className="font-semibold text-zinc-700 ml-2">{item.empresa}</span>
              </p>
              {item.descricao && (
                <p className="text-zinc-500 text-sm mt-3 line-clamp-2">{item.descricao}</p>
              )}
            </div>
            <div className="min-w-[100px] bg-zinc-900 text-white rounded-2xl px-4 py-4 text-center">
              <p className="text-xs text-zinc-400 uppercase tracking-wide">Quantidade</p>
              <h4 className="text-3xl font-black mt-1">{item.quantidade}</h4>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setOpen(true)}
              className="flex-1 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] transition-all text-white py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg hover:shadow-orange-200"
            >
              Ver Detalhes
            </button>
            <button className="px-5 py-3 rounded-2xl border border-zinc-300 hover:bg-zinc-100 hover:border-zinc-400 active:scale-[0.98] transition-all font-semibold">
              Empresa
            </button>
          </div>
        </div>
      </div>

      {open && <ProductModal item={item} onClose={() => setOpen(false)} />}
    </>
  );
}
