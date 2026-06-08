import { useEffect } from "react";
import { X, Phone, Building2, Tag, Package as PackageIcon } from "lucide-react";
import { Produto, useApp } from "@/context/AppContext";
import { handleImgError } from "@/lib/image";

type Props = {
  item: Produto;
  onClose: () => void;
};

export default function ProductModal({ item, onClose }: Props) {
  const { fornecedores } = useApp();
  const contato =
    fornecedores.find((f) => f.nome === item.empresa)?.contato ?? "Não informado";

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden grid md:grid-cols-2 animate-in zoom-in-95 fade-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 md:h-full bg-zinc-100">
          <img
            src={item.imagem}
            alt={item.produto}
            onError={handleImgError}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="md:hidden absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto relative">
          <button
            onClick={onClose}
            className="hidden md:flex absolute top-4 right-4 bg-zinc-100 hover:bg-zinc-200 rounded-full p-2 transition"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>

          <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full font-semibold">
            <Tag size={12} /> {item.categoria}
          </span>
          <h2 className="text-3xl font-black text-zinc-800 mt-3 leading-tight">
            {item.produto}
          </h2>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex items-center gap-2 text-zinc-600">
              <Building2 size={16} className="text-orange-500" />
              <span className="font-semibold text-zinc-800">{item.empresa}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-600">
              <PackageIcon size={16} className="text-orange-500" />
              <span>
                Quantidade disponível:{" "}
                <span className="font-bold text-zinc-800">{item.quantidade}</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-zinc-600">
              <Phone size={16} className="text-orange-500" />
              <span className="font-medium text-zinc-800">{contato}</span>
            </div>
          </div>

          {item.descricao && (
            <div className="mt-5 p-4 bg-zinc-50 rounded-2xl">
              <p className="text-xs font-bold uppercase text-zinc-500 mb-1">
                Descrição
              </p>
              <p className="text-zinc-700 text-sm leading-relaxed">{item.descricao}</p>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <a
              href={`tel:${contato.replace(/\D/g, "")}`}
              className="flex-1 bg-orange-500 hover:bg-orange-600 transition text-white py-3 rounded-2xl font-semibold text-center shadow-lg hover:shadow-orange-200"
            >
              Entrar em contato
            </a>
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-2xl border border-zinc-300 hover:bg-zinc-100 transition font-semibold"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
