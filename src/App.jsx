import { Header, Hero, Intro, Works, About, Tech, Contact, Footer } from './components'

export default function App() {
  return (
    <>
      <Header />
      <main id="home">
        <Hero />
        <Intro />
        <Works />
        <About />
        <Tech />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
