import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'

export default function NotFound() {
  return (
    <PageTransition>
      <section className="container-edge py-32 md:py-44 text-center">
        <p className="mono text-electric-300 text-[0.62rem]">— 404</p>
        <h1 className="display-xl text-paper mt-5">
          This page is <span className="italic-accent">not on the chain.</span>
        </h1>
        <p className="mt-6 max-w-md mx-auto text-paper-dim">
          The URL you reached doesn't exist in the MEICO ecosystem. Head home and start again.
        </p>
        <Link to="/" className="btn-electric mt-9">Return to MEICO</Link>
      </section>
    </PageTransition>
  )
}
