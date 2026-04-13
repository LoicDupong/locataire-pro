import type { Metadata } from 'next'
import { Bricolage_Grotesque, Figtree } from 'next/font/google'
import './globals.scss'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Locataire Pro',
  description: 'Constituez votre dossier de location en quelques minutes.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${bricolage.variable} ${figtree.variable}`}>{children}</body>
    </html>
  )
}
