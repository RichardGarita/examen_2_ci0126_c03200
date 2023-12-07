// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import AvailableCoffeeScreen from './components/AvailableCoffeeList';
import PurchaseBox from './components/PurchaseBox';
import CoffeeMachineServices from './services/CoffeeMachineServices';
import ShoppingCart from './components/ShoppingCart';
import PaymentBox from './components/PaymentBox';
import Modal from './components/Modal';

const coffeeMachineServices = new CoffeeMachineServices();

function App() {

  const [coffeeTypes, setCoffeeTypes] = useState([]);
  const [cartCoffees, setCartItems] = useState([]);
  const [changeCoins, setChangeCoins] = useState([]);
  const [currentCredit, setCurrentCredit] = useState(0);

  const buttonRef = useRef();
  const [modalContent, setModalContent] = useState('');

  const allowedCurrency = coffeeMachineServices.getAllowedCurrency();

  useEffect(() => {
      setCoffeeTypes(coffeeMachineServices.getCoffeeTypes());
      setChangeCoins(coffeeMachineServices.getChangeCoins());
  }, []); 

  const buyCoffees = () => {
    if (cartCoffees.length === 0) {
      setModalContent("No hay cafés en el carrito");
      buttonRef.current.click();
      return;
    }
    const result = coffeeMachineServices.purchaseCoffees(cartCoffees, currentCredit);
    if (result.error) {
      setModalContent(result.error.message);
    } else {
      var totalChange = 0;
      const change = result.change.map(currency => {
        totalChange += (currency.denomination * currency.quantity);
        return (
          <p key={currency.denomination}>
            {currency.quantity} {currency.type}{currency.quantity > 1 ? 's' : ''} de {currency.denomination}
          </p>
        )
      });

      setModalContent(
        <>
          <p>Su vuelto es de {totalChange} colones.</p>
          <p>Desglose:</p>
          <div>{change}</div>
        </>
      );

      setCoffeeTypes(coffeeMachineServices.getCoffeeTypes());
      setCartItems([]);
      setCurrentCredit(0);
    }
    buttonRef.current.click();
  }

  const addCoffeeToCart = (coffeeType, amount) => {
    const coffeeIndex = cartCoffees.findIndex((coffee) => coffee.name === coffeeType.name);

    if (coffeeIndex !== -1) {
      const updatedCartCoffees = cartCoffees.map((coffee, index) =>
        index === coffeeIndex ? { ...coffee, quantity: amount } : coffee
      );
      setCartItems(updatedCartCoffees);
    } else {
      setCartItems([...cartCoffees, { ...coffeeType, quantity: amount }]);
    }
  }


  return (
    <div className='container'>
      <h1 className='text-center'>Máquina de café</h1>
      <AvailableCoffeeScreen coffeeTypes={coffeeTypes}/>
      <div className='row m-0'>
        <PurchaseBox itemsList={coffeeTypes} purchaseItem={addCoffeeToCart}/>
        <ShoppingCart cartItems={cartCoffees}/>
        <PaymentBox currentCredit={currentCredit} setCurrentCredit={setCurrentCredit} allowedCurrency={allowedCurrency} makePayment={buyCoffees}/>
      </div>

      <div ref={buttonRef} 
        data-bs-toggle="modal" data-bs-target={`#notificationModal`}/>
        <Modal 
        title={"Compra"}
        buttonRef={buttonRef}
        id={'notificationModal'}
        content={modalContent}/>
    </div>
  );
}

export default App;
