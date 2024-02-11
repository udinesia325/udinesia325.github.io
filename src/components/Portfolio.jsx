import React from 'react'
import portfolio from '../data/portfolio'
import { Icon } from '@iconify/react'

function Portfolio() {
  return (
    <div id='portfolio' className="pt-16 pb-10 portfolio-gradient">
      <h1 className="text-3xl font-semibold text-center">Portfolio</h1>
      <p className="text-xs font-light text-gray-500 mt-4 text-center">
        There are many variations of passages of Lorem Ipsum available, <br />{' '}
        but the majority have suffered alteration.
      </p>

      <div className="w-[90%] grid grid-cols-1 sm:grid-cols-3 gap-5 mx-auto mt-10">
        {portfolio.map((port, index) => (
          <div className="border rounded-md overflow-hidden bg-white" key={index}>
            <img
              src={port.img}
              alt="demo website portfolio fahruddin"
              className="w-full aspect-video"
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
