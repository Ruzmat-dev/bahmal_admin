import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Dashboard from './pages/Dashboard'
import Login from "./pages/Login"
import Catalog from './pages/Catalog'
import CatalogAdd from './components/Catalog/Add'
import CatalogSee from './components/Catalog/See'




const App = () => {
  const [login, ] = useState<boolean>(localStorage.getItem("access") ? true : false  )

  
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={login ? <Layout login={login}><Dashboard /></Layout> : <Login />} />
            <Route path={"/dashbord"} element={<Layout login={login}> <Dashboard /> </Layout>} />
            <Route path={"/categories"} element={<Layout login={login}> <Catalog /> </Layout>}/>
            <Route path={"/categories/see/:id"} element={<Layout login={login}><CatalogSee/></Layout>} />
            <Route path={"/categories/add/:id"} element={<Layout login={login}><CatalogAdd/></Layout>} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App