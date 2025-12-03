import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./auth/contexts/auth-context";

export const metadata: Metadata = {
  title: {
    template: "%s | Cullen",
    default: "Cullen | Aplicación de Donaciones de Sangre",
  },

  // Descripción optimizada
  description:
    "Únete a Cullen, la aplicación de donaciones de sangre. Dona hoy y acumula créditos para canjear sangre cuando más lo necesites.",

  // Palabras clave
  keywords: [
    "Cullen",
    "donación de sangre",
    "canjear sangre",
    "créditos de sangre",
    "banco de sangre",
  ],

  // Metadatos para redes sociales (Open Graph)
  openGraph: {
    title: "Cullen | Dona y Canjea Sangre",
    description:
      "La plataforma de trueque de donaciones de sangre. Dona hoy y canjea créditos para cuando más lo necesites.",
    type: "website",
    // Deberías añadir la URL de tu app aquí cuando la tengas
    // url: "https://www.cullen.app",
    // Deberías añadir una imagen de vista previa aquí
    // images: ["/cullen-og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
