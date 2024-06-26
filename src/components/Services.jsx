import React from 'react'
import sendWhatsapp from '../utils/sendWhatsapp'
import services from '../data/services'

function Services() {
  return (
    <div id='services' className="py-10 bg-gray-100 flex place-items-center place-content-center dark:bg-slate-900">
      <div className="w-full sm:max-w-2xl flex flex-col sm:flex-row justify-center gap-10 p-2 lg:max-w-3xl">
        <div className="basis-1/2 flex flex-col justify-center items-start" data-aos='fade-up'>
          <h1 className="text-3xl font-semibold lg:text-4xl dark:text-slate-200">What I do ?</h1>
          <p className="font-light text-gray-500 text-xs mt-5 lg:text-sm dark:text-slate-400">
            I'm all about making websites look awesome and work smoothly. From creating enjoyable digital journeys
            to designing cool interfaces, I cover it all. Whether it's making things look good or building the behind-the-scenes magic,
            I bring ideas to life on the web
          </p>
          <p className="font-light text-gray-500 text-xs mt-1 lg:text-sm dark:text-slate-400">
            Check out my portfolio for a taste of simple, stylish, and functional digital experiences!
          </p>
          <a href={sendWhatsapp('Hello')} className='btn-primary text-sm font-semibold mt-4 lg:text-lg px-4'>Say Hello!</a>
        </div>
        <div className="basis-1/2 flex flex-col gap-4" data-aos='fade-up'>
            {services.map((service , index) => (
                <div data-aos='fade-up' data-aos-delay={100 * index} key={index} className="flex flex-col gap-3 p-4 bg-white transition-all cursor-pointer hover:border-l-2 hover:border-l-primary-500 dark:bg-slate-700 dark:text-slate-200">
                    <h2 className='text-sm font-semibold lg:text-lg'>{service.title}</h2>
                    <p className='text-xs text-gray-600 font-light lg:text-sm dark:text-slate-400'>{service.description}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Services