import CoffeeMachineServices from '../../services/CoffeeMachineServices';
import { ErrorMessages } from '../../utils/ErrorMessages';

// Mocking simulated databas
const originalMockedData = {
    coffeeTypes: [
        { name: "Café Americano", quantity: 10, price: 850 },
        { name: "Capuchino", quantity: 8, price: 950 },
        { name: "Latte", quantity: 10, price: 1150 },
        { name: "Mocachino", quantity: 15, price: 1300 }
    ],
    changeCoins: [
        {denomination: 500, quantity: 20, type: "moneda"},
        {denomination: 100, quantity: 30, type: "moneda"},
        {denomination: 50, quantity: 50, type: "moneda"},
        {denomination: 25, quantity: 25, type: "moneda"}
    ],
    allowedCurrency: [
        {denomination: 500, type: "moneda"},
        {denomination: 100, type: "moneda"},
        {denomination: 50, type: "moneda"},
        {denomination: 25, type: "moneda"},
        {denomination: 1000, type: "billete"}
    ],
}

jest.mock('../../data/data.json', () => (originalMockedData));

describe('CoffeeMachineServices', () => {
  let coffeeMachine;

  beforeEach(() => {
    coffeeMachine = new CoffeeMachineServices();
  });

  describe('Get and set for coffeeTypes and changeCoins', () => {
    it('should return coffeeTypes correctly', () => {
        // Act
        const result = coffeeMachine.getCoffeeTypes();
    
        // Assert the result
        expect(result).toEqual(originalMockedData.coffeeTypes);
      });
    
      it('should return changeCoins correctly', () => {
        // Act
        const result = coffeeMachine.getChangeCoins();
    
        // Assert the result
        expect(result).toEqual(originalMockedData.changeCoins);
      })
    
      it('should set the coffeTypes correctly', () => {
        // Prepare
        const newCoffeeTypes = [
            { name: "Café Americano", quantity: 10, price: 850 },
            { name: "Capuchino", quantity: 8, price: 950 },
        ];
    
        // Act
        coffeeMachine.setCoffeeTypes(newCoffeeTypes);
    
        // Assert
        expect(coffeeMachine.getCoffeeTypes()).toEqual(newCoffeeTypes)
      });
    
      it('should set the changeCoins correctly', () => {
        // Prepare
        const newChangeCoins = [
            {denomination: 500, quantity: 20, type: "moneda"},
            {denomination: 200, quantity: 10, type: "moneda"},
        ];
    
        // Act
        coffeeMachine.setChangeCoins(newChangeCoins);
    
        // Assert
        expect(coffeeMachine.getChangeCoins()).toEqual(newChangeCoins)
      });
  })

  describe('Change calculation', () => {
    it('should reduce the changeCoins correctly', () => {
        // Prepare
        const change = [
            {denomination: 500, quantity: 5, type: "moneda"},
            {denomination: 100, quantity: 2, type: "moneda"},
        ];
    
        const expectedChangeCoins = [
            {denomination: 500, quantity: 15, type: "moneda"},
            {denomination: 100, quantity: 28, type: "moneda"},
            {denomination: 50, quantity: 50, type: "moneda"},
            {denomination: 25, quantity: 25, type: "moneda"}
        ]
    
        // Act
        coffeeMachine.reduceChangeCoins(change);
    
        // Assert
        expect(coffeeMachine.getChangeCoins()).toEqual(expectedChangeCoins)
      });
    
      it('should calculate change correctly when there is enough change', () => {
        // Mock data
        const totalPrice = 1250;
        const payment = 2000;
        const expectedChange = [
          { denomination: 500, quantity: 1, type: 'moneda'},
          { denomination: 100, quantity: 2, type: 'moneda' },
          { denomination: 50, quantity: 1, type: 'moneda' }
        ];
    
        // Perform the calculation
        const result = coffeeMachine.calculateChange(totalPrice, payment);
    
        // Assert the result
        expect(result).toEqual(expectedChange);
      });
    
      it('should return null when there is not enough change', () => {
        // Mock data
        const totalPrice = 1150;
        const payment = 1200;
    
        const mockedChangeCoins = [
            { denomination: 100, quantity: 1, type: "moneda" },
        ];
            
        coffeeMachine.setChangeCoins(mockedChangeCoins);
    
        // Perform the calculation
        const result = coffeeMachine.calculateChange(totalPrice, payment);
    
        // Assert the result
        expect(result).toBeNull();
    });
  })

  describe('Purchase coffee', () => {
    it('should handle coffee purchase correctly', () => {
        // Mock data
        const coffeeTypes = [{ name: 'Capuchino', quantity: 2, price: 950 }];
        const credit = 2000;

        const expectedRemainingChange = [
          {denomination: 500, quantity: 20, type: "moneda"},
          {denomination: 100, quantity: 29, type: "moneda"},
          {denomination: 50, quantity: 50, type: "moneda"},
          {denomination: 25, quantity: 25, type: "moneda"}
        ]
    
        // Act
        const result = coffeeMachine.purchaseCoffees(coffeeTypes, credit);
    
        // Assert the result
        expect(result.error).toBeNull();
        expect(result.change).toEqual([{ denomination: 100, type: 'moneda', quantity: 1 }]);
    
        // Assert the state changes (update in coffee inventory)
        expect(coffeeMachine.getCoffeeTypes()).toEqual([
            { name: "Café Americano", quantity: 10, price: 850 },
            { name: "Capuchino", quantity: 6, price: 950 },
            { name: "Latte", quantity: 10, price: 1150 },
            { name: "Mocachino", quantity: 15, price: 1300 }
        ]);

        expect(coffeeMachine.getChangeCoins()).toEqual(expectedRemainingChange);

        expect
      });
    
      it('should handle not enough money error', () => {
        // Mock data
        const coffeeTypes = [{ name: 'Cappuccino', quantity: 1, price: 950 }];
        const credit = 600;
    
        // Act
        const result = coffeeMachine.purchaseCoffees(coffeeTypes, credit);
    
        // Assert the error
        expect(result.error).toEqual(ErrorMessages.NOT_ENOUGH_MONEY);
        expect(result.change).toBeNull();
    
        // Assert no state changes
        expect(coffeeMachine.getCoffeeTypes()).toEqual(originalMockedData.coffeeTypes);
      });
    
      it('should handle insufficient change error', () => {
        // Mock data
        const coffeeTypes = [{ name: 'Latte', quantity: 1, price: 1150 }];
        const credit = 1200;
    
        const mockedChangeCoins = [
            { denomination: 100, quantity: 1, type: "moneda" },
            { denomination: 50, quantity: 0, type: "moneda" },
        ];
            
        coffeeMachine.setChangeCoins(mockedChangeCoins);
    
        // Act
        const result = coffeeMachine.purchaseCoffees(coffeeTypes, credit);
    
        // Assert the error
        expect(result.error).toEqual(ErrorMessages.INSUFFICIENT_CHANGE);
        expect(result.change).toBeNull();
    
        // Assert no state changes
        expect(coffeeMachine.getCoffeeTypes()).toEqual(originalMockedData.coffeeTypes);
    });
  })
});
