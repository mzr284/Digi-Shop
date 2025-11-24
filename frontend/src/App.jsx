import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/home'
import Enter from './pages/enter'
import NotifContext from './components/notifContext'
import { useState } from 'react'
import UserContext from './components/userContext'
import AdminHome from './pages/adminHome'
import AdminUsers from './pages/adminUsers'
import Cart from './pages/cart'
import AdminProducts from './pages/products'

function App() {
  let [notifData, setNotifData] = useState([]);
  let [user, setUser] = useState(null);

  return (
    <div>
      <Router>
        <UserContext.Provider value={{user, setUser}}>
        <NotifContext.Provider value={{ notifData, setNotifData}}>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/enter' element={<Enter/>}/>
          <Route path='/admin' element={<AdminHome/>}>
            <Route path='users' element={<AdminUsers/>}/>
            <Route path='products' element={<AdminProducts/>}/>
          </Route>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
        <Footer/>
        </NotifContext.Provider>
        </UserContext.Provider>
      </Router>
    </div>
  )
}

export default App