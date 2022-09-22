import React, { useState, useEffect } from 'react'
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import CPnav from './Components/CPnav/CPnav';
import UserControl from './Components/UserControl/UserControl';
import ProductControl from './Components/ProductControl/ProductControl';

function App() {

  function RouteGuard({ children }) {
    if (currentUser?.admin) {
      return children
    }
    else {
      return <>
        <div className='text-danger alert alert-danger text-center'>You're not allowed to access this Page</div>
      </>
    }
  }
  function SignedGuard({ children }) {
    if (currentUser) {
      return <Navigate to='/' />
    }
    else {
      return children
    }
  }

  const [currentUser, setCurrentUser] = useState(null)
  const [cart, setCart] = useState([])
  const navigate = useNavigate()


  function handleLogout() {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    navigate('/login')
  }

  useEffect(() => {
    if (localStorage.getItem('currentUser')) {
      setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
    }
  }, [])

  return (
    <>
      <Navbar currentUser={currentUser} handleLogout={handleLogout} cart={cart} />
      <Cart setCart={setCart} cart={cart} />
      <div className='container-fluid p-3 px-5 mt-5'>
        <Routes>

          <Route path="" element={<Home setCart={setCart} cart={cart} currentUser={currentUser} />} />
          <Route path="cp" element={<RouteGuard><CPnav /></RouteGuard>} />
          <Route path="cp/user" element={<RouteGuard><UserControl currentUser={currentUser} /></RouteGuard>} />
          <Route path="cp/product" element={<RouteGuard><ProductControl currentUser={currentUser} /></RouteGuard>} />
          <Route path="login" element={<SignedGuard><Login setCurrentUser={setCurrentUser} /></SignedGuard>} />
          <Route path="register" element={<SignedGuard><Register /></SignedGuard>} />
          <Route path="*" element={
            <div className="alert vh-75 text-danger p-2 display-6 d-flex justify-content-center align-items-center">
              <p>404 page not found</p>
            </div>} />
          {/* <Route path="home" element={<></>}/> */}
          {/* <Route path="" element={<></>}/> */}

        </Routes>
      </div>
    </>
  )
}

export default App