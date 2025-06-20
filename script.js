document.addEventListener('DOMContentLoaded', function () {
    var itemInput = document.getElementById('item-input');
    var addButton = document.getElementById('add-button');
    var stockTableBody = document.querySelector('#stock-table tbody');
    var stockList = [];
    function addItem() {
        var _a;
        var itemName = (_a = itemInput === null || itemInput === void 0 ? void 0 : itemInput.value) === null || _a === void 0 ? void 0 : _a.trim();
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
        stockList.forEach(function (itemObj, index) {
            var row = document.createElement('tr');
            var itemCell = document.createElement('td');
            itemCell.textContent = itemObj.item;
            row.appendChild(itemCell);
            var quantityCell = document.createElement('td');
            var quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = itemObj.quantity.toString();
            quantityInput.min = '1';
            quantityInput.addEventListener('change', function () {
                itemObj.quantity = Number(quantityInput.value);
            });
            quantityCell.appendChild(quantityInput);
            row.appendChild(quantityCell);
            var actionsCell = document.createElement('td');
            var removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.addEventListener('click', function () { return removeItem(index); });
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
    // Função para gerar PDF da tabela de estoque
    var generatePdfButton = document.getElementById('generate-pdf');
    if (generatePdfButton) {
        generatePdfButton.addEventListener('click', function () {
            // @ts-ignore
            var doc = new window.jspdf.jsPDF();
            doc.text('Relatório de Estoque', 14, 15);
            var tableData = stockList.map(function (itemObj) { return [
                itemObj.item,
                itemObj.quantity.toString()
            ]; });
            var headers = [['Item', 'Quantidade']];
            // @ts-ignore
            doc.autoTable({
                head: headers,
                body: tableData,
                startY: 20,
                theme: 'plain',
                styles: {
                    textColor: 0,
                    lineColor: 0,
                    lineWidth: 0.1
                },
                headStyles: {
                    fillColor: 255,
                    textColor: 0,
                    fontStyle: 'bold'
                },
                bodyStyles: {
                    fillColor: 255,
                    textColor: 0
                },
                didDrawTable: function (data) {
                    doc.setDrawColor(0);
                    var x = data.table.position.x;
                    var y = data.table.position.y;
                    var width = data.table.width;
                    var height = data.table.height;
                    if (typeof x === 'number' && typeof y === 'number' && typeof width === 'number' && typeof height === 'number' &&
                        !isNaN(x) && !isNaN(y) && !isNaN(width) && !isNaN(height)) {
                        doc.rect(x, y, width, height);
                    }
                    else {
                        console.warn("Argumentos inv\u00E1lidos para doc.rect: x=".concat(x, ", y=").concat(y, ", width=").concat(width, ", height=").concat(height));
                    }
                }
            });
            doc.save('estoque.pdf');
        });
    }
});