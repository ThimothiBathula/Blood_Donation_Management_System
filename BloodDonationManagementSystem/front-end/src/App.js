import './App.css';
import Login from './User-Login/Login';
import Nav from './Nav-Bar/Nav';
import React from 'react';
import Register from './User-Register/Register';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Home/Home';
import Doners from './DonatePages/Doners';
import DonerPage from './DonatePages/DonerPage';
import Admin from './Admin/Admin';
import Donate from './DonatePages/Donate';
import Contact from './Contact/Contact';
import About from './About/About';
import AdminLog from './Admin-Login/AdminLog';
import AdminData from './Admin/AdminData';
import User from './User/User';
import DonersData from './Admin/DonersData';
// import Users from './Admin/Users';
function App() {
  return (
   <React.Fragment>
    <BrowserRouter>
    <Nav/>
    <Routes>
    <Route path='' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/reg' element={<Register/>}/>
      <Route path='/doners' element={<Doners/>}/>
      <Route path='/donate' element={<Donate/>}/>
      <Route path='/doner' element={<DonerPage/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/users' element={<Admin></Admin>}/>
      <Route path='/admins' element={<AdminData/>}/>
      {/* <Route path='/user' element={<Users/>}/> */}
      <Route path='/adminLog' element={<AdminLog/>}/>
      <Route path='/submits' element={<User/>}/>
      <Route path='/donersList' element={<DonersData/>}/>

    </Routes>
   
    
    </BrowserRouter>
   
   </React.Fragment>
  );
}

export default App;
