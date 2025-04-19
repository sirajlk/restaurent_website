import React from "react"

const AuthLayout = ({children} : {children: React.ReactNode}) => {
 
    console.log(children)
    return (
    <div className='flex justify-center items-center '>
      {children}
    </div>
  )
}

export default AuthLayout
