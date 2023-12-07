import React, { Component } from 'react';
import data from '../data/data.json';
import { ErrorMessages } from '../utils/ErrorMessages';

class CoffeeMachineServices extends Component{
    constructor() {
        super();
        // The initial state from the simulated database
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

    purchaseCoffees(coffeeTypes, credit) {
        const totalPrice = coffeeTypes.reduce((total, coffeeType) => {
            return total + coffeeType.price * coffeeType.quantity;
        }, 0);

        if (totalPrice > credit)
            return {
                error: ErrorMessages.NOT_ENOUGH_MONEY,
                change: null
            };

        const change = this.calculateChange(totalPrice, credit, this.getChangeCoins());
        if (change === null)
            return {
                error: ErrorMessages.INSUFFICIENT_CHANGE,
                change: null
            };

        // Update coffee inventory
        const newCoffeeTypes = [...this.state.coffeeTypes];

        coffeeTypes.forEach(coffeeType => {
            const index = newCoffeeTypes.findIndex(type => type.name === coffeeType.name);
            if (index !== -1) {
                newCoffeeTypes[index] = {
                    ...newCoffeeTypes[index],
                    quantity: newCoffeeTypes[index].quantity - coffeeType.quantity,
                };
            }
        });

        this.setCoffeeTypes(newCoffeeTypes);
        return {
            error: null,
            change: change
        };
    }

    calculateChange(totalPrice, payment, changeCoins) {
        let remainingChange = payment - totalPrice;
        const change = [];
    
        for (const coin of changeCoins) {
            const quantityToUse = Math.min(Math.floor(remainingChange / coin.denomination), coin.quantity);
    
            if (quantityToUse > 0) {
                change.push({
                    denomination: coin.denomination,
                    type: coin.type,
                    quantity: quantityToUse,
                });
    
                remainingChange -= coin.denomination * quantityToUse;
            }
    
            if (remainingChange === 0) {
                break;
            }
        }
    
        if (remainingChange > 0) {
            // There is not enough change
            return null;
        }
        return change;
    }
    
}

export default CoffeeMachineServices;
