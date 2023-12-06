// src/App.js
import React, { useState, useEffect } from 'react';
import AvailableCoffeeScreen from './components/AvailableCoffeeList';
import PurchaseBox from './components/PurchaseBox';
import CoffeeMachineServices from './services/CoffeeMachineServices';
import ShoppingCart from './components/ShoppingCart';
import PaymentBox from './components/PaymentBox';

const coffeeMachineServices = new CoffeeMachineServices();

function App() {

  const [coffeeTypes, setCoffeeTypes] = useState([]);
  const [cartCoffees, setCartItems] = useState([]);
  const [changeCoins, setChangeCoins] = useState([]);
  const [currentCredit, setCurrentCredit] = useState(0);

  const allowedCurrency = coffeeMachineServices.getAllowedCurrency();

  useEffect(() => {
      setCoffeeTypes(coffeeMachineServices.getCoffeeTypes());
      setChangeCoins(coffeeMachineServices.getChangeCoins());
  }, []); 

  const addCoffeeToCart = (coffeeType, amount) => {
    // TODO: This should only add to the cart, not make purchase
    coffeeMachineServices.purchaseCoffee(coffeeType, amount, 10000);
    setCoffeeTypes(coffeeMachineServices.getCoffeeTypes());
    
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
        <PaymentBox currentCredit={currentCredit} setCurrentCredit={setCurrentCredit} allowedCurrency={allowedCurrency}/>
      </div>
    </div>
  );
}

export default App;
