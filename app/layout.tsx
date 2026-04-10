import type { Metadata } from 'next'
import './globals.scss'

export const metadata: Metadata = {
  title: 'Locataire Pro',
  description: 'Constituez votre dossier de location en quelques minutes.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
