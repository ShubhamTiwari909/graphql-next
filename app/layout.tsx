import './globals.css'
import Navbar
 from '@/components/Navbar'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="synthwave">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
