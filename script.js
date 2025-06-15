"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');
    const stockTableBody = document.querySelector('#stock-table tbody');
    let stockList = [];
    function addItem() {
        var _a;
        const itemName = (_a = itemInput === null || itemInput === void 0 ? void 0 : itemInput.value) === null || _a === void 0 ? void 0 : _a.trim();
        if (itemName !== '' && itemInput) {
            stockList.push({ item: itemName, quantity: 1 });
            updateTable();
            itemInput.value = '';
        }
    }
    function removeItem(index) {
        stockList.splice(index, 1);
        updateTable();
    }
    function updateTable() {
        if (!stockTableBody)
            return;
        stockTableBody.innerHTML = '';
        stockList.forEach((itemObj, index) => {
            const row = document.createElement('tr');
            const itemCell = document.createElement('td');
            itemCell.textContent = itemObj.item;
            row.appendChild(itemCell);
            const quantityCell = document.createElement('td');
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = itemObj.quantity.toString();
            quantityInput.min = '1';
            quantityInput.addEventListener('change', () => {
                itemObj.quantity = Number(quantityInput.value);
            });
            quantityCell.appendChild(quantityInput);
            row.appendChild(quantityCell);
            const actionsCell = document.createElement('td');
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.addEventListener('click', () => removeItem(index));
            actionsCell.appendChild(removeButton);
            row.appendChild(actionsCell);
            stockTableBody.appendChild(row);
        });
    }
    if (addButton) {
        addButton.addEventListener('click', addItem);
    }
    if (itemInput) {
        itemInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                addItem();
            }
        });
    }
});
