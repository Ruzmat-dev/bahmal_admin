import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Dashboard from './pages/Dashboard'
import Login from "./pages/Login"
import CategoriesSee from './components/Catalog/See/index'
import CategoriesEdit from './components/Catalog/Edit'
import CategoriesAdd from './components/Catalog/Add'
import NewCategories from './components/Catalog/newCatalog'
import Categories from './pages/Catalog'




const App = () => {
  const [login, ] = useState<boolean>(localStorage.getItem("access") ? true : false  )

  
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={login ? <Layout login={login}><Dashboard /></Layout> : <Login />} />
            <Route path={"/dashbord"} element={<Layout login={login}> <Dashboard /> </Layout>} />
            <Route path={"/categories"} element={<Layout login={login}> <Categories /> </Layout>}/>
            <Route path={"/newCategories"} element={<Layout login={login}><NewCategories/></Layout>} />
            <Route path={"/categories/see/:id"} element={<Layout login={login}><CategoriesSee/></Layout>} />
            <Route path={"/categories/add/:id"} element={<Layout login={login}><CategoriesAdd/></Layout>} />
            <Route path={"/categories/edit/:id"} element={<Layout login={login}>< CategoriesEdit/></Layout>} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App