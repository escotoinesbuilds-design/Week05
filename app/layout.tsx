import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Siguiente paso de atención",
  description: "Navegación simulada para una necesidad de seguimiento médico existente.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="es-MX"><body>{children}</body></html>;
}
