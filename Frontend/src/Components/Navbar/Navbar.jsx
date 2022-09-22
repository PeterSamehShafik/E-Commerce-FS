import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar({ currentUser, handleLogout, cart }) {
  const location = useLocation()

  return <>
    <div className="p3 d-flex flex-column">
      <nav className="navbar navbar-expand-lg navbar-dark bg-main fixed-top">
        <div className="container-fluid d-flex justify-content-between">
          <Link to='/' className="navbar-brand hovering" href="#">Shopping</Link>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">

            <ul className="navbar-nav m-0 m-auto">
              {currentUser ?
                <div className="user hovering d-flex align-items-center nav-item text-white my-3 my-lg-0 h5 m-lg-auto me-auto">
                  <i className="fa-solid fa-user-tie me-2 text-info  "></i>
                  <p className='m-0 '>{currentUser.firstName}</p>
                </div> : ''}
            </ul>
            <ul className="navbar-nav">
              {currentUser?.admin ?
                <li className="nav-item me-4 ">
                  <Link to='cp' className="nav-link text-warning" href="#">
                    <p className='hovering m-0 p-0 h5 txt-text-orange'>
                      <i className="fa-solid fa-gear me-1 fa-spin"></i>
                      <i>C.Panel</i>
                    </p>
                  </Link>
                </li> : ''
              }

              {currentUser ?
                <li className="nav-item">
                  <a onClick={handleLogout} className="nav-link" aria-current="page" href="#">Logout</a>
                </li> : <>
                  <li className="nav-item">
                    <Link to='login' className="nav-link" aria-current="page" href="#">Login</Link>
                  </li>

                  <li className="nav-item">
                    <Link to='register' className="nav-link" href="#">Signup</Link>
                  </li>
                </>
              }
            </ul>

          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {currentUser ? currentUser?.admin ? '' :
            <ul className="navbar-nav ">
              <li className="nav-item position-relative bdg ">
                <div className="nav-link cursor-pointer text-white fw-bolder ms-4 d-flex text-orange" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" >
                  <i className="fa-solid fa-bag-shopping h5 my-0  "></i>
                  <p className="ms-1 my-0" >Cart</p>
                </div>

                {cart?.length ?
                  <span className="position-absolute badge bg-danger translate-middle me-2">
                    {cart.length}
                    <span className="visually-hidden">cart length</span>
                  </span> : ''
                }
              </li>

            </ul> : ''}

        </div>


      </nav>
    </div >





  </>
}

export default Navbar