import React, { useState, useEffect } from 'react';
import CoffeeTypeCard from './CoffeeTypeCard';
import {
    initializeCoffeeTypes,
    initializeChangeCoins
} from '../services/CoffeeMachineServices';

function AvailableCoffeeScreen () {
    const [coffeeTypes, setCoffeeTypes] = useState([]);
    const [changeCoins, setChangeCoins] = useState([]);

    useEffect(() => {
        setCoffeeTypes(initializeCoffeeTypes());
        setChangeCoins(initializeChangeCoins());
    }, []); 

    return (
        <div className='card'>
            <div className="card-header">
                <h2 className='text-center'>Productos Disponibles</h2>
            </div>
            <div className='card-body row text-center'>
                {coffeeTypes.map(coffeeType => (
                    <div className='col-6 mb-3' key={coffeeType.name}>
                        <CoffeeTypeCard coffeeType={coffeeType}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AvailableCoffeeScreen;