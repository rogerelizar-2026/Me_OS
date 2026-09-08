import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LegacyOS - Sistema Pessoal de Eficácia',
  description: 'Um sistema operacional pessoal baseado nos 7 Hábitos das Pessoas Altamente Eficazes de Stephen R. Covey.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="classic">
      <body>{children}</body>
    </html>
  );
}
