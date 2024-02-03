import React, { ReactNode } from 'react'
import Logo from '../components/Logo'

type Props ={ 
    children :  ReactNode
}

export default function Layout({children} : Props) {
  return (
    <main className="container mx-auto h-screen flex  py-10 overflow-hidden px-2">
    <div className="w-full">
      <div className="lg:w-96 mx-auto my-4"> 
        <Logo/>
      </div>
      {children}
      </div>
      </main>
  )
}
