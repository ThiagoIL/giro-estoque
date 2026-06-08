import { Layers3, Package, Wrench, Hammer, Box } from "lucide-react";
import { ReactNode } from "react";

export type CategoriaItem = {
  id: number;
  nome: string;
  icon: ReactNode;
  cor: string;
};

export const categorias: CategoriaItem[] = [
  { id: 1, nome: "Partes de MDF", icon: <Layers3 size={28} />, cor: "from-orange-500 to-orange-600" },
  { id: 2, nome: "Fitas de Bordas", icon: <Package size={28} />, cor: "from-amber-500 to-orange-500" },
  { id: 3, nome: "Ferragens", icon: <Wrench size={28} />, cor: "from-zinc-700 to-zinc-900" },
  { id: 4, nome: "Ferramentas", icon: <Hammer size={28} />, cor: "from-gray-700 to-black" },
  { id: 5, nome: "Outros", icon: <Box size={28} />, cor: "from-slate-600 to-slate-800" },
];

export const categoriasNomes = ["Partes de MDF", "Fitas de Bordas", "Ferragens", "Ferramentas", "Outros"];
