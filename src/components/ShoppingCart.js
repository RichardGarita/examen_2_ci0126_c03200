import React, {useState, useEffect} from 'react';

export default function ShoppingCart ({cartItems}) {
    const [totalPrice, setTotalPrice] = useState(0);

    // When an items is added, update the cart
    useEffect(() => {
        const newTotalPrice = cartItems.reduce((total, cartItem) => {
            return total + cartItem.price * cartItem.quantity;
        }, 0);
    
        setTotalPrice(newTotalPrice);
    }, [cartItems]);

    return (
        <div className="card col-5 p-2">
                <div className='card-title'>
                    <h3 className='text-center m-0'>Carrito</h3>
                </div>
                {cartItems && cartItems.length > 0 ?
                    cartItems.map(cartItem => (
                        <div key={cartItem.name} >
                            <p className='mb-1'>{cartItem.name} x{cartItem.quantity}</p>
                        </div>
                    ))
                : <p> El carrito está vacío</p>}

                <p className='mt-auto mb-0 ms-auto'><strong>Precio total: {totalPrice} colones</strong></p>
        </div>
    )
}