import React from 'react'
import './CPnav.css'
import { Link } from 'react-router-dom';
function CPnav() {
    return <>
        <div className="cpnav ">

            <div className="d-flex vh-75 justify-content-evenly align-items-center">
                <Link to='product' className="panel shadow-lg bg-main  p-3 text-center d-flex flex-column justify-content-center align-items-center">
                    <i className="fa-brands fa-product-hunt display-2 mb-5 rounded-circle text-success"></i>
                    <h2 className='text-white-50'>Product Control</h2>
                </Link>
                <Link to='user' className="panel shadow-lg bg-main  p-3 text-center d-flex flex-column justify-content-center align-items-center">
                    <i className="fa-solid fa-user display-2 mb-5 rounded-circle text-warning"></i>
                    <h2 className='text-white-50'>User Control</h2>
                </Link>
            </div>
        </div>

    </>
}

export default CPnav