document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');
    const stockTableBody = document.querySelector('#stock-table tbody');

    let stockList = [];

    function addItem() {
        const itemName = itemInput.value.trim();
        if (itemName !== '') {
            stockList.push(itemName);
            updateTable();
            itemInput.value = '';
        }
    }

    function removeItem(index) {
        stockList.splice(index, 1);
        updateTable();
    }

    function updateTable() {
        stockTableBody.innerHTML = '';
        stockList.forEach((item, index) => {
            const row = document.createElement('tr');
            const itemCell = document.createElement('td');
            itemCell.textContent = item;
            row.appendChild(itemCell);

            const actionsCell = document.createElement('td');
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.addEventListener('click', () => removeItem(index));
            actionsCell.appendChild(removeButton);
            row.appendChild(actionsCell);

            stockTableBody.appendChild(row);
        });
    }

    addButton.addEventListener('click', addItem);

    itemInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addItem();
        }
    });
});