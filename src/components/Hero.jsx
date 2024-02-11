import React from 'react'
import dinn from '../assets/dinn.jpg'
import heroData from '../data/hero'
import About from './About'

function Hero() {
  return (
        <div className="container max-w-5xl sm:min-h-[650px] relative gradient-advance">
            <div className='w-full'>
                <div className="flex flex-col px-3 gap-y-4 justify-center items-stretch gap-x-4 sm:flex-row">
                    {/* Description */}
                    <div className='flex flex-col gap-y-4 basis-1/2 items-start mt-10'>
                        <h1 className='text-4xl text-gray-900 font-semibold'>Hello, I'm <br /> Fahruddin Salim</h1>
                        <p>I'm a Freelance UI/UX Designer and Developer based in London, England. I strives to build immersive and beautiful web applications through carefully crafted code and user-centric design.</p>
                        <button className='btn-primary text-sm font-semibold'>Say Hello!</button>

                        <div className="w-full mt-10 flex gap-1 flex-col sm:flex-row">
                            {heroData.map((data,index) => (
                                <div key={index} className="basis-1/3 flex flex-col items-center gap-y-2 py-2 px-3 bg-primary-100">
                                    <h1 className='text-lg font-semibold'>{ data.title} </h1>
                                    <p className='text-sm text-gray-900 font-light'>{ data.subtitle }</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='basis-1/2 hidden sm:flex items-center justify-center sm:items-end'>
                        <img src={dinn} alt="gambar fahruddin" className='w-full sm:w-[300px] rounded-md shadow-lg' />
                    </div>
                </div>
                <br id='about'></br>
                {/* About */}
                <About />
            </div>
        </div>
    )
}

export default Hero