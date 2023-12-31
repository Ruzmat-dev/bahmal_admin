import React from 'react'
import { Navigate } from 'react-router-dom'
import { NavbarNested } from '../Sidebar/NavbarNested'
import "./glabal.css"
import TopBar from '../TopBar'
type Props = {
  children: React.ReactNode,
  login: boolean
}

const Layout = ({ children, login }: Props) => {
  if (!login) return <Navigate to="/" />

  return (
    <div className='wrppaerTopbarAndChildren'>
      <div><TopBar/></div>
      <div className='wrapper_topbar_children'>
        <div>
        <NavbarNested />
        </div>
        <div style={{width :"100%"}}>
          {children}
        </div>
      </div>

    </div>

  )
}

export default Layout
