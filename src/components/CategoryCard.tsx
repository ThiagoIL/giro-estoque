import { ReactNode } from "react";

type Props = {
  nome: string;
  icon: ReactNode;
  cor: string;
  ativo: boolean;
  onClick: () => void;
};

export default function CategoryCard({ nome, icon, cor, ativo, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={
        ativo
          ? "rounded-3xl p-6 bg-orange-50 text-orange-700 border-2 border-orange-400 ring-4 ring-orange-200/70 shadow-[0_0_30px_rgba(249,115,22,0.35)] scale-105 transition-all duration-300"
          : `rounded-3xl p-6 text-white shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-r ${cor}`
      }
    >
      <div className="flex items-center justify-between">
        {icon}
        <span className={`text-xs px-3 py-1 rounded-full ${ativo ? "bg-orange-200/70 text-orange-700" : "bg-white/20"}`}>
          {ativo ? "Selecionada" : "Categoria"}
        </span>
      </div>
      <h3 className="mt-8 text-left text-2xl font-bold">{nome}</h3>
    </button>
  );
}
