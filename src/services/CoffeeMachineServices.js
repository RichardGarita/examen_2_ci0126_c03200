import React, { Component } from 'react';
import data from '../data/data.json';

class CoffeeMachineServices extends Component{
    constructor() {
        super();
        // Inicializamos el estado con la información de data.json
        this.state = {
            coffeeTypes: data.coffeeTypes,
            changeCoins: data.changeCoins,
            allowedCurrency: data.allowedCurrency,
        };
    }

    getCoffeeTypes() {
        return this.state.coffeeTypes;
    }

    getAllowedCurrency() {
        return this.state.allowedCurrency;
    }

    getChangeCoins() {
        return this.state.changeCoins;
    }

    setCoffeeTypes(newCoffeeTypes) {
        this.state.coffeeTypes = newCoffeeTypes;
    }

    purchaseCoffee(coffeeType, amount, money) {
        const price = coffeeType.price * amount;
        const name = coffeeType.name;

        if (price > money)
            return "There is not enough money";

        // Actualizamos el estado después de la compra
        const newCoffeeTypes = this.getCoffeeTypes().map(type => {
            if (type.name === name) {
                return {
                    ...type,
                    quantity: type.quantity - amount
                }
            } else {
                return type;
            }
        });

        this.setCoffeeTypes(newCoffeeTypes);
    }
}

export default CoffeeMachineServices;
