import Divider from './components/Divider';
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Portfolio from './components/Portfolio'
import Process from './components/Process'
import AOS from 'aos';
import 'aos/dist/aos.css'
import Skills from './components/Skills';

function App() {
  AOS.init();
  return (
    <>
      <Navbar />
      <Hero />
      <div className="container max-w-5xl">
        <Process />
        <Portfolio />
        <Divider />
        <Skills />
      </div>
    </>
  )
}

export default App
