import { Icon } from '@iconify/react'
import React from 'react'
import sendWhatsapp from '../utils/sendWhatsapp'

function Divider() {
  return (
    <div className='w-full bg-gray-900 py-10 flex flex-col justify-center items-center'>
        <h1 className='text-center text-white text-2xl sm:text-3xl font-semibold'>Do you have Project Idia? <br /> Let's discuss your project!</h1>
        <p className='mt-4 text-center text-xs font-light text-gray-400'>There are many variations of passages of Lorem Ipsum available, <br className='hidden sm:block' /> but the majority have suffered alteration.</p>
        <a id='skills' href={sendWhatsapp('Halo fahrudin, saya ingin bekerja sama dengan anda')} target='_blank' className='btn-primary mt-5 text-sm font-semibold text-center inline-flex items-center gap-x-5'>Let's Work Together <Icon icon='gg:arrow-right' className='text-lg' /></a>
    </div>
  )
}

export default Divider