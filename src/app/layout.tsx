import type { Metadata } from "next";
import { AppProvider } from "@/context/AppContext";
import "@/styles.css";

export const metadata: Metadata = {
  title: "Giro - Estoque Moveleiro",
  description: "Consulte estoques disponíveis entre empresas do setor moveleiro.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
