import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LegacyOS - Sistema Operacional Pessoal',
  description: 'Um sistema operacional pessoal baseado nos 7 Hábitos de Stephen R. Covey',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="classic">
      <body>{children}</body>
    </html>
  )
}
