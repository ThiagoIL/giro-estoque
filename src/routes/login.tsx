import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LogIn } from "lucide-react";
import Header from "@/components/Header";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    if (login(email, senha)) {
      navigate({ to: "/produtos" });
    } else {
      setErro("Email ou senha inválidos.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <Header />
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-zinc-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center"><LogIn /></div>
            <h1 className="text-3xl font-black text-zinc-800">Entrar</h1>
          </div>
          <p className="text-zinc-500 mb-8">Acesse a área da sua empresa.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-2">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-2xl border border-zinc-200 outline-none focus:border-orange-500 transition" placeholder="empresa@email.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-2">Senha</label>
              <input type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} className="w-full px-4 py-3 rounded-2xl border border-zinc-200 outline-none focus:border-orange-500 transition" placeholder="••••••" />
            </div>
            {erro && <p className="text-red-500 text-sm font-semibold">{erro}</p>}
            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-semibold shadow-lg transition">Entrar</button>
          </form>

          <p className="text-center text-zinc-500 text-sm mt-6">
            Não tem uma conta? <Link to="/cadastro" className="text-orange-500 font-semibold">Cadastre-se</Link>
          </p>
          <p className="text-center text-zinc-400 text-xs mt-4">Demo: demo@giro.com / 123456</p>
        </div>
      </div>
    </div>
  );
}
