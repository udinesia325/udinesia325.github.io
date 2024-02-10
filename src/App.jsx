import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Process from './components/Process'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="container max-w-5xl">
        <Process />
      </div>
    </>
  )
}

export default App
