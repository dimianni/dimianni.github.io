import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Intro from './components/Intro/Intro'
import Works from './components/Works/Works'
import About from './components/About/About'
import Tech from './components/Tech/Tech'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

function App() {

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

export default App
