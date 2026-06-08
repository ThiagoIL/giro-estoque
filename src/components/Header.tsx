"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LogIn, LogOut, UserPlus, Package, PlusCircle, Building2, Home } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { handleImgError } from "@/lib/image";
import logo from "@/assets/logo.png";

export default function Header() {
  const { user, logout } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  const linkBase = "px-4 py-2.5 rounded-2xl border border-zinc-200 text-zinc-700 hover:bg-zinc-100 transition font-semibold text-sm flex items-center gap-2";
  const activeClass = " bg-orange-50 text-orange-700 border-orange-400 ring-2 ring-orange-200 hover:bg-orange-100";

  const getLinkStyle = (href: string, exact = false) => {
    const isActive = exact ? pathname === href : pathname.startsWith(href);
    return `${linkBase}${isActive ? activeClass : ""}`;
  };

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-4">
        <Link href="/" className="flex items-center gap-4">
          <img
            src={typeof logo === "string" ? logo : (logo as any).src || (logo as any)}
            alt="Giro Estoque"
            onError={handleImgError}
            className="w-14 h-14 object-contain"
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-orange-500 leading-none">GIRO ESTOQUE</h1>
            <p className="text-zinc-700 tracking-[4px] font-medium text-xs mt-1">SINDIMÓVEIS</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2 flex-wrap">
          <Link href="/" className={getLinkStyle("/", true)}>
            <Home size={16} /> Página Inicial
          </Link>

          {!user && (
            <>
              <Link href="/login" className={getLinkStyle("/login")}>
                <LogIn size={16} /> Login
              </Link>
              <Link
                href="/cadastro"
                className="px-4 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm flex items-center gap-2 shadow-lg transition"
              >
                <UserPlus size={16} /> Cadastro
              </Link>
            </>
          )}

          {user && (
            <>
              <Link href="/produtos" className={getLinkStyle("/produtos")}>
                <Package size={16} /> Produtos
              </Link>
              <Link href="/cadastro-produto" className={getLinkStyle("/cadastro-produto")}>
                <PlusCircle size={16} /> Cadastro de Produtos
              </Link>
              <Link href="/fornecedores" className={getLinkStyle("/fornecedores")}>
                <Building2 size={16} /> Fornecedores
              </Link>
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="px-4 py-2.5 rounded-2xl bg-zinc-900 hover:bg-black text-white font-semibold text-sm flex items-center gap-2 shadow-lg transition cursor-pointer"
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
