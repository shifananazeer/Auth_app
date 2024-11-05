import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Headert from './components/Headert'
import PrivateRoute from './components/privateRoute'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import EditUser from './pages/EditUser'
const App = () => {
  return (
   <BrowserRouter>
      {window.location.pathname.startsWith('/admin') ? null : <Headert />}
  
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route element={<PrivateRoute/>}>
    <Route path='/profile' element={<Profile/>}/>
    </Route>
    <Route path='/sign-in' element={<SignIn/>}/>
    <Route path='/sign-up' element={<SignUp/>}/>
    <Route path='/admin/login' element={<AdminLogin/>}/>
    <Route path='/admin/dashboard' element= {<AdminDashboard/>}/>
    <Route path="/admin/edit/:id" element={<EditUser />} /> 
   </Routes>
   </BrowserRouter>
  )
}

export default App
