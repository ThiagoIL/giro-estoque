import { createContext, useContext, useState, ReactNode } from "react";

export type Produto = {
  id: number;
  empresa: string;
  categoria: string;
  produto: string;
  quantidade: number;
  imagem: string;
  descricao?: string;
};

export type Fornecedor = {
  id: number;
  nome: string;
  cidade: string;
  contato: string;
  categoria: string;
};

export type Empresa = {
  nome: string;
  cnpj: string;
  email: string;
  senha: string;
  cidade: string;
  telefone: string;
};

type AppContextType = {
  user: Empresa | null;
  login: (email: string, senha: string) => boolean;
  logout: () => void;
  register: (e: Empresa) => void;
  empresas: Empresa[];
  produtos: Produto[];
  addProduto: (p: Omit<Produto, "id">) => void;
  fornecedores: Fornecedor[];
};

const initialProdutos: Produto[] = [
  { id: 1, empresa: "Móveis RN", categoria: "Partes de MDF", produto: "MDF Branco 15mm", quantidade: 32, imagem: "https://images.unsplash.com/photo-1597484661973-ee6cd0b6482c?q=80&w=1200&auto=format&fit=crop", descricao: "Chapa de MDF branco 15mm para móveis planejados." },
  { id: 2, empresa: "Top MDF", categoria: "Fitas de Bordas", produto: "Fita Carvalho", quantidade: 120, imagem: "https://images.unsplash.com/photo-1611145434336-2324aa4079ce?q=80&w=1200&auto=format&fit=crop", descricao: "Fita de borda padrão carvalho 22mm." },
  { id: 3, empresa: "Casa Ferragem", categoria: "Ferragens", produto: "Corrediça Telescópica", quantidade: 55, imagem: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=1200&auto=format&fit=crop", descricao: "Corrediça telescópica 45cm com amortecimento." },
  { id: 4, empresa: "Ferramentas Natal", categoria: "Ferramentas", produto: "Parafusadeira 20V", quantidade: 18, imagem: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1200&auto=format&fit=crop", descricao: "Parafusadeira sem fio 20V com bateria de lítio." },
];

const initialFornecedores: Fornecedor[] = [
  { id: 1, nome: "Móveis RN", cidade: "Natal/RN", contato: "(84) 99999-1111", categoria: "Partes de MDF" },
  { id: 2, nome: "Top MDF", cidade: "Mossoró/RN", contato: "(84) 99999-2222", categoria: "Fitas de Bordas" },
  { id: 3, nome: "Casa Ferragem", cidade: "Parnamirim/RN", contato: "(84) 99999-3333", categoria: "Ferragens" },
  { id: 4, nome: "Ferramentas Natal", cidade: "Natal/RN", contato: "(84) 99999-4444", categoria: "Ferramentas" },
];

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Empresa | null>(null);
  const [empresas, setEmpresas] = useState<Empresa[]>([
    { nome: "Demo Móveis", cnpj: "00.000.000/0001-00", email: "demo@giro.com", senha: "123456", cidade: "Natal/RN", telefone: "(84) 90000-0000" },
  ]);
  const [produtos, setProdutos] = useState<Produto[]>(initialProdutos);
  const [fornecedores] = useState<Fornecedor[]>(initialFornecedores);

  const login = (email: string, senha: string) => {
    const found = empresas.find((e) => e.email === email && e.senha === senha);
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const register = (e: Empresa) => {
    setEmpresas((prev) => [...prev, e]);
    setUser(e);
  };

  const addProduto = (p: Omit<Produto, "id">) => {
    setProdutos((prev) => [...prev, { ...p, id: prev.length + 1 }]);
  };

  return (
    <AppContext.Provider value={{ user, login, logout, register, empresas, produtos, addProduto, fornecedores }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
