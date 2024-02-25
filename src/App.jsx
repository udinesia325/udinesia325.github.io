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
import { useEffect, useState } from 'react';

function App() {
  AOS.init();

  const [dark, setDark] = useState(false)
  useEffect(()=>{
    if(dark){
      document.body.classList.add("bg-slate-800")
      document.body.classList.add("dark")
    }else{
      document.body.classList.remove("bg-slate-800")
      document.body.classList.remove("dark")
    }
  },[dark])

  return (
    <>
      <Navbar dark={dark} setDark={setDark} />
      <Hero />
      <div className={`container ${dark ? 'dark' : ''}`}>
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
