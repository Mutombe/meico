import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import TopTicker from './TopTicker.jsx'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col surface-grid relative overflow-x-hidden">
      <Nav />
      <div className="pt-[64px]"><TopTicker /></div>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
