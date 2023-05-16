import { Footer } from "@/components/footer/Footer"
import { Navbar } from "@/components/navbar/Navbar"
import './globals.css';
import './skeleton.css';

export const metadata = {
  title: 'Crafting Room Recordings'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
