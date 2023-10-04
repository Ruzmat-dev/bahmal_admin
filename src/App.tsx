import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Blogs from "./pages/Blogs"
import Dashboard from './pages/Dashboard'
import Login from "./pages/Login"




const App = () => {
  const [login, ] = useState<boolean>(localStorage.getItem("access") ? true : false  )

  
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={login ? <Layout login={login}><Dashboard /></Layout> : <Login />} />
            <Route path={"/blogs"} element={<Layout login={login}> <Blogs /> </Layout>} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App