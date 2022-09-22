import React, { useEffect, useState } from 'react'
import './Cart.css'

function Cart({ setCart, cart }) {

    const [total, setTotal] = useState(0)

    function checkCart() {
        if (localStorage.getItem('cart')) {
            setCart(JSON.parse(localStorage.getItem('cart')))
        }
        calcTotal()
        // console.log(cart)
    }

    function incrementCart(item) {
        let idx;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].productID == item.productID) {
                idx = i
                break;
            }
        }
        let tempCart = [...cart]
        let obj = { ...cart[idx] }
        obj.cartNumber++
        tempCart.splice(idx, 1, obj)
        setCart(tempCart)
        localStorage.setItem('cart', JSON.stringify(tempCart));
        calcTotal()
    }

    function decrementCart(item) {
        let idx;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].productID == item.productID) {
                idx = i
                break;
            }
        }
        let tempCart = [...cart]
        let obj = { ...cart[idx] }
        if (obj.cartNumber <= 1) {
            obj.cartNumber = 0
            tempCart.splice(idx, 1)
        } else {
            obj.cartNumber--
            tempCart.splice(idx, 1, obj)
        }
        setCart(tempCart)
        localStorage.setItem('cart', JSON.stringify(tempCart));
        calcTotal()
    }

    function calcTotal() {
        let result = 0;
        let tempCart = JSON.parse(localStorage.getItem('cart'))
        for (let i = 0; i < cart.length; i++) {
            result += tempCart[i] ? tempCart[i].cartNumber * tempCart[i].price : 0
        }
        setTotal(result)

    }

    useEffect(() => {
        checkCart()
    }, [localStorage.getItem('cart')])


    return <>

        <div className="offcanvas bg-main text-white offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">My Cart</h5>
                <button type="button" className="text-dark btn btn-close rounded-circle bg-white hovering" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body d-flex flex-column justify-content-between">
                <div className="games-list">
                    {cart?.map((item) =>
                        <div key={item.productID} className="game-check my-2 p-1 rounded-4 text-dark d-flex justify-content-between align-items-center bg-light">
                            <img src={item.imageURL} alt="" className='img-fluid me-2 cart-img' />
                            <h6 className="game-name m-0 h5">{item.name}</h6>
                            <div className="h5 cart-control d-flex flex-column justify-content-between align-items-center p-2 px-3">
                                <button onClick={() => incrementCart(item)} className='btn btn-success px-2 py-1 hovering'>
                                    <i className="fa-solid cursor-pointer my-1 m-0 p-0 fa-angles-up"></i>
                                </button>
                                <p className='p-0 m-0 my-2'>{item.cartNumber}</p>
                                <button onClick={() => decrementCart(item)} className='btn btn-danger px-2 py-1 hovering'>
                                    <i  className="fa-solid cursor-pointer m-0 p-0 fa-angles-down"></i>
                                </button>
                            </div>
                            <div className="lefted d-flex align-items-center">
                                <p className='p-0 m-0 d-inline me-2 fw-bolder h6'>${item.price}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="checkout d-flex justify-content-between align-items-center">

                    <h5 className=" fw-bolder m-0">Total: ${total}</h5>
                    <p className="p-o m-0 cart text-muted fw-bolder cursor-pointer">Checkout <strong>✚</strong></p>

                </div>

            </div>
        </div>

    </>
}

export default Cart