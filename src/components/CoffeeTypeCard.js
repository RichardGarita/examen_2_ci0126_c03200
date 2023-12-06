import React from 'react';

export default function CoffeeTypeCard ({ coffeeType }) {
    return (
      <div className="card mx-auto" style={{ width: '25rem' }}>
        <div className="card-body">
          <h5 className="card-title">{coffeeType.name}</h5>
          <p className="card-text">
            <strong>Restantes:</strong> {coffeeType.quantity}
          </p>
          <p className="card-text">
            <strong>Precio:</strong> {coffeeType.price} colones
          </p>
        </div>
      </div>
    );
};