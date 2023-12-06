// src/App.js
import React, { useState, useEffect } from 'react';
import AvailableCoffeeScreen from './components/AvailableCoffeeList';
import PurchaseBox from './components/PurchaseBox';
import CoffeeMachineServices from './services/CoffeeMachineServices';

const coffeeMachineServices = new CoffeeMachineServices();

function App() {

  const [coffeeTypes, setCoffeeTypes] = useState([]);
  const [changeCoins, setChangeCoins] = useState([]);

  useEffect(() => {
      setCoffeeTypes(coffeeMachineServices.getCoffeeTypes());
      setChangeCoins(coffeeMachineServices.getChangeCoins());
  }, []); 

  const purchaseCoffee = (coffeeType, amount) => {
    coffeeMachineServices.purchaseCoffee(coffeeType, amount, 10000);
    setCoffeeTypes(coffeeMachineServices.getCoffeeTypes());
  }


  return (
    <div className='container'>
      <h1 className='text-center'>Máquina de café</h1>
      <AvailableCoffeeScreen coffeeTypes={coffeeTypes}/>
      <PurchaseBox itemsList={coffeeTypes} purchaseItem={purchaseCoffee}/>
    </div>
  );
}

export default App;
