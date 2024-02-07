import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login'; 
import Register from './component/Register'; 
import New from './component/New'; 
import Navbar from './component/Navbar'; 
import Footer from './component/Footer'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Layout />} >
          <Route index element={<Login/>} />
        </Route>
        <Route path="/register" element={<Layout />} >
          <Route index element={<Register />} />
        </Route>
        <Route path="/new" element={<Layout/>} >
          <Route index element={<New />} />
        </Route>
        
      </Routes>
    </Router>
  );
};

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
