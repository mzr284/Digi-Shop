import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/home'
import Enter from './pages/enter'
import NotifContext from './components/context'
import { useState } from 'react'

function App() {
  let [notifData, setNotifData] = useState([]);
  return (
    <div>
      <Router>
        <Header/>
        <NotifContext.Provider value={{ notifData, setNotifData}}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/enter' element={<Enter/>}/>
        </Routes>
        </NotifContext.Provider>
        <Footer/>
      </Router>
    </div>
  )
}

export default App