import Divider from './components/Divider';
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Portfolio from './components/Portfolio'
import Process from './components/Process'
import AOS from 'aos';
import 'aos/dist/aos.css'
import Skills from './components/Skills';
import Services from './components/Services';
import Contact from './components/Contact';

function App() {
  AOS.init();
  return (
    <>
      <Navbar />
      <Hero />
      <div className="container">
        <Process />
        <Portfolio />
        <Divider />
        <Skills />
        <Services />
        <Contact />
      </div>
    </>
  )
}

export default App
