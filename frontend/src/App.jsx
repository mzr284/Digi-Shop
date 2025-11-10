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


function App() {
  let [notifData, setNotifData] = useState([]);
  let [user, setUser] = useState(null);
  return (
    <div>
      <Router>
        <NotifContext.Provider value={{ notifData, setNotifData}}>
        <UserContext.Provider value={{user, setUser}}>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/enter' element={<Enter/>}/>
          <Route path='/admin' element={<AdminHome/>}>
            <Route path='users' element={<AdminUsers/>}/>
          </Route>
        </Routes>
        <Footer/>
        </UserContext.Provider>
        </NotifContext.Provider>
      </Router>
    </div>
  )
}

export default App