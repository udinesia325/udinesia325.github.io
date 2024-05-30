import React from 'react'
import portfolio from '../data/portfolio'
import { Icon } from '@iconify/react'

function Portfolio() {
  return (
    <div id='portfolio' className="pt-16 pb-10 portfolio-gradient">
      <h1 className="text-3xl font-semibold text-center lg:text-4xl dark:text-slate-200" data-aos='fade-up'>Portfolio</h1>
      <p className="text-xs font-light text-gray-500 mt-4 text-center px-2 sm:px-0 lg:text-lg dark:text-slate-400" data-aos='fade-up' data-aos-delay='200'>
        Check out my portfolio to see the cool stuff I've worked on! From making websites look good <br /> and easy to use to bringing
        ideas to life, it's all here. Take a peek into my digital world <br /> where creativity meets functionality!
      </p>

      <div className="w-[90%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-5 mx-auto mt-10">
        {portfolio.map((port, index) => (
          <div className="border rounded-md overflow-hidden bg-white flex flex-col items-start justify-start dark:bg-slate-900 dark:border-slate-700" key={index} data-aos='zoom-in' data-aos-delay={200 * index} data-aos-anchor-placement="bottom-bottom">
            <img
              src={port.img}
              alt="demo website portfolio fahruddin"
              className="aspect-video w-full h-[170px]"
              loading='lazy'
              width={300}
              height={170}
            />
            <div className='p-3 lg:pb-5 flex-1 flex flex-col items-start justify-start'>
              <span className="text-xs text-gray-500 font-light lg:text-sm dark:text-slate-400">
                {port.category}
              </span>
              <h2 className="font-semibold mt-[2px] text-lg dark:text-slate-300">{port.title}</h2>
              <p className="text-sm text-gray-500 font-light mt-` mb-1 lg:mt-2 lg:mb-4 dark:text-slate-400">
                {port.description}
              </p>
              {port.isPrivate ? (
                <button className="text-primary-400 border bg-primary-100/50 border-primary-200 text-sm py-1 px-4 font-semibold min-w-[80px] transition-all flex items-center gap-2 cursor-not-allowed mt-auto dark:bg-slate-700">
                  Private WEB
                  <Icon icon='material-symbols:lock-outline' className='text-lg' />
                </button>
              ) : (
                <a
                  href={port.link}
                  target='_blank'
                  className="inline-flex items-center gap-4 border border-primary-500 text-primary-500 py-1 px-4 text-sm font-semibold min-w-[80px] transition-all hover:bg-primary-500 hover:text-white mt-auto"
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
