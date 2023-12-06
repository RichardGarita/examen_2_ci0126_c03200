// OtroComponente.js
import React, { useState, useRef } from 'react';
import Modal from './Modal';


function PaymentBox ({currentCredit, setCurrentCredit, allowedCurrency}) {
    const buttonRef = useRef();
    const [newCredit, setNewCredit] = useState(0);

    const openModal = () => {
        buttonRef.current.click();
    }

    const addCredit = () => {
        setCurrentCredit(currentCredit + newCredit);
        setNewCredit(0);
    }

    return (
        <div className=' row col-4'>
            <div className='col-7'>
                <p><strong>Saldo actual: {currentCredit? currentCredit : 0} colones</strong></p>
            </div>
            <div className='col-5'>
                <button type="button" className="btn btn-primary" onClick={openModal}>
                    Ingresar crédito
                </button>
            </div>

            <div ref={buttonRef} 
            data-bs-toggle="modal" data-bs-target={`#exampleModal`}/>
            <Modal 
            title={"Ingresar crédito"}
            buttonRef={buttonRef}
            id={'exampleModal'}
            content={modalContent(allowedCurrency, newCredit, setNewCredit)}
            button={<button className='btn btn-primary' onClick={addCredit}>Agregar</button>}/>
        </div>
    );
};

const modalContent = ( allowedCurrency, newCredit, setNewCredit ) => {
    const allowedCoins = allowedCurrency?.filter(currency => currency.type === "coin");
    const allowedBills = allowedCurrency?.filter(currency => currency.type === "bill");

    const handleCurrencyClick = (denomination) => {
        setNewCredit(prevCredit => prevCredit + denomination);
    };

    const handleResetClick = () => {
        setNewCredit(0);
    };
  
    return (
      <div>
         <button className='btn btn-primary col-2 me-1' onClick={() => handleResetClick()}>Reiniciar</button>
        <p className='mb-1 mt-1'><strong>Monedas: </strong></p>
        {allowedCoins ? allowedCoins.map(coin => (
          <button onClick={() => handleCurrencyClick(coin.denomination)} key={coin.denomination} className='btn btn-primary col-2 me-1'>{coin.denomination}</button>
        )) : ''}
        <p className='mb-1 mt-1'><strong>Billetes: </strong></p>
        {allowedBills ? allowedBills.map(bill => (
          <button onClick={() => handleCurrencyClick(bill.denomination)} key={bill.denomination} className='btn btn-primary col-2 me-1'>{bill.denomination}</button>
        )) : ''}
        <p className='mt-2 mb-0'>Total a agregar: {newCredit}</p>
      </div>
    );
};


export default PaymentBox;
