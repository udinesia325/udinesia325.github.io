import React from 'react'
import portfolio from '../data/portfolio'
import { Icon } from '@iconify/react'

function Portfolio() {
  return (
    <div id='portfolio' className="pt-16 pb-10 portfolio-gradient">
      <h1 className="text-3xl font-semibold text-center" data-aos='fade-up'>Portfolio</h1>
      <p className="text-xs font-light text-gray-500 mt-4 text-center px-2 sm:px-0" data-aos='fade-up' data-aos-delay='200'>
        Check out my portfolio to see the cool stuff I've worked on! From making websites look good <br /> and easy to use to bringing
        ideas to life, it's all here. Take a peek into my digital world <br /> where creativity meets functionality!
      </p>

      <div className="w-[90%] grid grid-cols-1 sm:grid-cols-3 gap-5 mx-auto mt-10">
        {portfolio.map((port, index) => (
          <div className="border rounded-md overflow-hidden bg-white" key={index} data-aos='zoom-in' data-aos-delay={200 * index}>
            <img
              src={port.img}
              alt="demo website portfolio fahruddin"
              className="aspect-video w-[300px] h-[170px]"
              loading='lazy'
              width={300}
              height={170}
            />
            <div className='p-3'>
              <span className="text-xs text-gray-500 font-light">
                {port.category}
              </span>
              <h1 className="font-semibold mt-[2px]">{port.title}</h1>
              <p className="text-sm text-gray-500 font-light mt-2">
                {port.description}
              </p>
              {port.isPrivate ? (
                <button className="text-primary-400 border bg-primary-100/50 border-primary-200 text-sm py-1 px-4 font-semibold min-w-[80px] mt-2 transition-all flex items-center gap-2 cursor-not-allowed">
                  Private WEB
                  <Icon icon='material-symbols:lock-outline' className='text-lg' />
                </button>
              ) : (
                <a
                  href={port.link}
                  target='_blank'
                  className="inline-flex items-center gap-4 border border-primary-500 text-primary-500 py-1 px-4 text-sm font-semibold min-w-[80px] mt-2 transition-all hover:bg-primary-500 hover:text-white"
                >
                  Visit
                  <Icon icon='gg:arrow-right' />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Portfolio
