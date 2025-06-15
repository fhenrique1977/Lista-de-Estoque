"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');
    const stockTableBody = document.querySelector('#stock-table tbody');
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

const generatePdfButton = document.getElementById('generate-pdf');

    if (generatePdfButton) {
        generatePdfButton.addEventListener('click', () => {
            // Cria um novo documento jsPDF
            const doc = new window.jspdf.jsPDF();

            // Prepara os dados para a tabela
            const tableData = stockList.map(item => [item.item, item.quantity]);
            const tableHeaders = [['Item', 'Quantidade']];

            // Adiciona a tabela ao PDF
            doc.autoTable({
                head: tableHeaders,
                body: tableData,
                startY: 10, // Posição inicial da tabela
                headStyles: { fillColor: [200, 200, 200] }, // Estilo do cabeçalho
                altRowStyles: { fillColor: [245, 245, 245] }, // Estilo das linhas alternadas
                margin: { top: 10 }
            });

            // Salva o PDF
            doc.save('lista_de_estoque.pdf');
        });
    }
