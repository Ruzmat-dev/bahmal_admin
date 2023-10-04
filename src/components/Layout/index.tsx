import React from 'react'
import { Navigate } from 'react-router-dom'
type Props = {
    children: React.ReactNode,
    login: boolean
}

const Layout = ({ children, login }: Props) => {

  if (!login) return <Navigate to="/" />

  return (
    <div>
        <div>Sidebar</div>
        <div>{children}</div>
    </div>
  )
}

export default Layout