import React, {useState, useEffect} from 'react';

export default function ({itemsList, purchaseItem}) {
    const [selectedItem, setSelectedItem] = useState(null);

    // When a purchase is made, the max amount must change
    useEffect(() => {
        if (selectedItem) {
            const selectedOption = itemsList.find((item) => item.name === selectedItem.name);
            const quantityInput = document.getElementById('itemQuantity');
            quantityInput.max = selectedOption.quantity;
        }
    }, [itemsList]);

    const handleItemChange = (event) => {
        const selectedOption = event.target.value;
        const selectedItem = itemsList.find((item) => item.name === selectedOption);
        setSelectedItem(selectedItem);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const selectedQuantity = formData.get('itemQuantity');
        const selectedItem = itemsList.find((item) => item.name === formData.get('itemSelector'));

        purchaseItem(selectedItem, selectedQuantity);
    };

    return (
        <form className="card col-4 me-1" onSubmit={handleSubmit}>
            <div className='form-floating col-11 mx-auto my-2'>
                <select id="itemSelector" className="form-select"
                    onChange={handleItemChange} name="itemSelector"
                    value={selectedItem ? selectedItem.name : ''}
                    required>
                    <option value="" disabled>
                        Elegir...
                    </option>
                    {itemsList.map((item, index) => (
                        <option key={index} value={item.name}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="itemSelector"> Seleccione el item </label>
            </div>

            <div className='form-floating col-11 mx-auto my-2'>
                <input id='itemQuantity' className='form-control' type='number'
                    max={selectedItem ? selectedItem.quantity : ''}
                    min={1} name='itemQuantity'
                    disabled={!selectedItem}></input>
                <label htmlFor="itemQuantity"> Cantidad </label>
            </div>

            <button type='submit' className='btn btn-primary col-4 mb-2 ms-auto me-4'>Comprar</button>
        </form>
    )
}