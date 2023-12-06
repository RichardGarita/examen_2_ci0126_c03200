// src/App.js
import React from 'react';
import AvailableCoffeeScreen from './components/AvailableCoffeeList';

function App() {
  return (
    <div className='container'>
      <h1 className='text-center'>Máquina de café</h1>
      <AvailableCoffeeScreen/>
    </div>
  );
}

export default App;
