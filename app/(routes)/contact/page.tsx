import ContactPage from '@/components/ContactUS'
import Header from '@/components/Header'
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const ContactUs = () => {
    const { userId } = auth();
  
  return (
    <div>
       <header className={'bg-black' }>
      
            <div className={' flex flex-col relative h-[40vh] lg:h-[60vh] bg-center bg-no-repeat bg-cover bg'} style={{boxShadow: 'inset 0 0 0 100vw rgba(0,0,0, .8)', backgroundImage: `url(/img/background.jpg)`}}>
              <Header userId={userId} />
                    <div className='flex-1 px-20 container mx-auto flex text-white space-y-4 flex-col items-center justify-center'>
                        <h1 className='text-3xl font-bold uppercase'>Contact Us</h1>
                        <h1 className='capitalize'>Home <span className='text-primary'>&gt;</span> Contact</h1>
                    </div>
            </div>
   
    </header>
      <ContactPage />
    </div>
  )
}

export default ContactUs
