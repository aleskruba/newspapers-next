import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer, Navbar } from '@/app/components'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aricles',
  description: 'Find the articles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative">

        <Navbar/>
       
          {children }
         
          <Footer/>

      </body>
    </html>
  )
}
