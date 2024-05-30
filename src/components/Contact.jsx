import React from 'react'
import Footer from './Footer'
import { Icon } from '@iconify/react'
import Input from './Input'
import socialMedia from '../data/socialMedia'

const contact = [
  {
    icon: 'carbon:location',
    title: 'Address',
    content: 'Banjarejo, Kec. Pagelaran Kab. Malang',
  },
  {
    icon: 'lets-icons:e-mail',
    title: 'Email',
    content: 'udinesia325@gmail.com',
  },
  {
    icon: 'ic:baseline-whatsapp',
    title: 'Phone / WhatsApp',
    content: '+6283119803061',
  },
]

function Contact() {
  return (
    <>
      <div id='contact' className="w-full min-h-[950px] sm:min-h-[640px] contact-gradient relative flex justify-center items-center" data-aos='zoom-in'>
        <div className="w-[95%] max-w-3xl bg-white px-5 pt-10 pb-8 rounded-md shadow-2xl absolute -bottom-10 flex flex-col sm:flex-row justify-center items-start gap-3 lg:max-w-4xl dark:bg-slate-900">
          <div className="basis-1/2">
            <h3 className="font-semibold text-lg lg:text-2xl dark:text-slate-200">
              Let’s discuss your Project
            </h3>
            <p className="text-xs font-light text-gray-500 mt-3 lg:text-sm dark:text-slate-400">
              Want to consult or discuss, even design a system <br className="hidden sm:block" />{' '}
              with me? here is my address
            </p>
            <div className="flex flex-col gap-y-3 mt-10">
              {contact.map((con, index) => (
                <div
                  key={index}
                  className="flex-none w-[90%] bg-white rounded-md p-3 shad hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] grid grid-cols-[50px_1fr] grid-rows-2 cursor-pointer dark:bg-slate-700"
                >
                  <Icon
                    icon={con.icon}
                    className="text-4xl p-1 bg-primary-100 text-primary-500 rounded row-span-2"
                  />
                  <h4 className="text-sm dark:text-slate-200">{con.title}</h4>
                  <span className="text-xs text-gray-500 font-light dark:text-slate-400">
                    {con.content}
                  </span>
                </div>
              ))}

              <div className="p-2 bg-white flex gap-x-3 dark:bg-transparent">
                {socialMedia.map((social, index) => (
                  <a key={index} href={social.link} target="_blank" aria-label={social.link}>
                    <Icon
                      icon={social.icon}
                      className="text-3xl p-1 rounded-md text-purple-500 hover:text-white hover:bg-primary-500 lg:text-4xl"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="basis-1/2">
            <p className="text-xs font-light text-gray-500 mt-3 lg:text-sm dark:text-slate-400">
              Fill out the form below to connect directly{' '}
              <br className="hidden sm:block" />
              to me via email!
            </p>
            <form
              action="mailto:udinesia325@gmail.com"
              method="POST"
              encType="text/plain"
              className="mt-10 flex flex-col gap-4"
            >
              <Input name="Name" placeholder="Name*" type="text" required={true} />
              <Input name="Email" placeholder="Email*" type="email" required={true} />
              <Input name="Location" placeholder="Location" type="text" />
              <div className="flex gap-2">
                <Input
                  name="Budget"
                  placeholder="Budget"
                  type="text"
                  className="basis-1/2"
                />
                <Input
                  name="Subject"
                  placeholder="Subject*"
                  type="text"
                  className="basis-1/2"
                  required={true}
                />
              </div>
              <Input name="Message" placeholder="Message*" type="text" required={true} />
              <button className="btn-primary flex-none flex items-center gap-3 w-fit text-sm font-semibold mt-4 lg:text-lg">
                Submit{' '}
                <Icon icon="iconamoon:send" className="text-white text-2xl" />
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Contact
