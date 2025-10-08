// app/layout.tsx
import './globals.css';
import Providers from './providers'; // Importa el nuevo componente

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}