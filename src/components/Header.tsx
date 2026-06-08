import { Link, useNavigate } from "@tanstack/react-router";
import { LogIn, LogOut, UserPlus, Package, PlusCircle, Building2, Home } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { handleImgError } from "@/lib/image";
import logo from "@/assets/logo.png";

export default function Header() {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const linkBase = "px-4 py-2.5 rounded-2xl border border-zinc-200 text-zinc-700 hover:bg-zinc-100 transition font-semibold text-sm flex items-center gap-2";
  const active = { className: linkBase + " bg-orange-50 text-orange-700 border-orange-400 ring-2 ring-orange-200 hover:bg-orange-100" };

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-4">
        <Link to="/" className="flex items-center gap-4">
          <img src={logo} alt="Giro Estoque" onError={handleImgError} className="w-14 h-14 object-contain" />
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-orange-500 leading-none">GIRO ESTOQUE</h1>
            <p className="text-zinc-700 tracking-[4px] font-medium text-xs mt-1">SINDIMÓVEIS</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2 flex-wrap">
          <Link to="/" activeOptions={{ exact: true }} activeProps={active} className={linkBase}>
            <Home size={16} /> Página Inicial
          </Link>

          {!user && (
            <>
              <Link to="/login" activeProps={active} className={linkBase}>
                <LogIn size={16} /> Login
              </Link>
              <Link
                to="/cadastro"
                activeProps={active}
                className="px-4 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm flex items-center gap-2 shadow-lg transition"
              >
                <UserPlus size={16} /> Cadastro
              </Link>
            </>
          )}

          {user && (
            <>
              <Link to="/produtos" activeProps={active} className={linkBase}>
                <Package size={16} /> Produtos
              </Link>
              <Link to="/cadastro-produto" activeProps={active} className={linkBase}>
                <PlusCircle size={16} /> Cadastro de Produtos
              </Link>
              <Link to="/fornecedores" activeProps={active} className={linkBase}>
                <Building2 size={16} /> Fornecedores
              </Link>
              <button
                onClick={() => { logout(); navigate({ to: "/" }); }}
                className="px-4 py-2.5 rounded-2xl bg-zinc-900 hover:bg-black text-white font-semibold text-sm flex items-center gap-2 shadow-lg transition"
              >
                <LogOut size={16} /> Sair
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
