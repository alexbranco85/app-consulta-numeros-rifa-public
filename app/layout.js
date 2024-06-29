import Header from '@/components/Header/Header'
import './globals.css'


export const metadata = {
  title: 'Consulta de Números',
  description: '',
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="min-h-screen bg-center bg-no-repeat bg-cover bg-main-blue" style={{ backgroundImage: "url('/bg-login.jpg')" }}>
          {children}
        </div>
      </body>
    </html>
  )
}
