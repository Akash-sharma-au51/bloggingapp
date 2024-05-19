import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Header from "./components/Header"
import Welcome from "./pages/Welcome"
import Login from"./pages/Login"
import Dashboard from "./pages/Dashboard"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Error from './pages/Error'
import Contactus from './pages/Contactus'



const App = () => {
  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Welcome/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/contact' element={<Contactus/>}/>
          <Route path='/*' element={<Error/>}/>

        </Routes>
        
        
      </Router>
      
    </div>
  )
}

export default App
