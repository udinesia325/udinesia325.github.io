import React from 'react'
import process from '../data/process'
import { Icon } from '@iconify/react'

function Process() {
  const result = process.reduce((acc, curr, idx) => {
    if (idx % 2 === 0) {
      acc.push([curr])
    } else {
      acc[acc.length - 1].push(curr)
    }
    return acc
  }, [])
  return (
    <div id='process' className="h-[750px] bg-gray-100 flex place-items-center place-content-center dark:bg-slate-800">
      <div className="w-full sm:max-w-2xl flex flex-col sm:flex-row justify-center gap-3 p-2 lg:max-w-3xl">
        <div className="basis-1/2 flex flex-col justify-center items-start">
          <h1 className="text-3xl font-semibold lg:text-4xl dark:text-slate-200" data-aos='fade-in'>Work Process</h1>
          <p className="font-light text-gray-500 text-xs mt-5 lg:text-sm dark:text-slate-500" data-aos='fade-in' data-aos-duration='300'>
            I start by looking into things, figuring out smart solutions. Then, I analyze data to make good choices. Next, I get creative and design things to look cool and work well for users.
          </p>
          <p className="font-light text-gray-500 text-xs mb-3 sm:mb-0 lg:text-sm mt-1 dark:text-slate-500" data-aos='fade-in' data-aos-duration='350'>
            Finally, I launch projects, turning plans into real stuff in the digital world.
          </p>
        </div>
        <div className="basis-1/2 flex gap-4">
          {result.map((proc, idx) => {
            return (
              <div key={idx} className={`basis-1/2 flex flex-col gap-4 ${idx == 1 ? 'translate-y-4':''}`}>
                {proc.map((data, index) => (
                  <div
                    key={index}
                    className="basis-1/2 aspect-square flex flex-col items-start justify-start rounded-md shadow-sm p-3 group bg-white/80 transition-all cursor-pointer hover:bg-white hover:scale-105 dark:bg-slate-700"
                    data-aos='zoom-in'
                    data-aos-delay={200 * index}
                  >
                    <Icon icon={data.icon} className='text-primary-500 bg-primary-100 rounded-md text-4xl p-1 group-hover:bg-primary-500 group-hover:text-white' />
                    <h2 className='text-sm font-semibold mt-2 mb-1 lg:text-lg dark:text-slate-200'>
                      {data.title}
                    </h2>
                    <p className='text-xs font-light text-gray-500 lg:text-sm dark:text-slate-400'>{data.description}</p>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Process
