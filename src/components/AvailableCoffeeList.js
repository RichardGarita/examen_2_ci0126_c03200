import React from 'react';
import CoffeeTypeCard from './CoffeeTypeCard';

function AvailableCoffeeScreen ({coffeeTypes}) {

    return (
        <div className='card mb-3'>
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