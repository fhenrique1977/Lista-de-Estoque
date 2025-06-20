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
            // Monta os dados da tabela
            var tableData = stockList.map(function (itemObj) { return [
                itemObj.item,
                itemObj.quantity.toString()
            ]; });
            // Cabeçalhos
            var headers = [['Item', 'Quantidade']];
            // @ts-ignore
            doc.autoTable({
                head: headers,
                body: tableData,
                theme: 'plain', // Usar tema 'plain' para remover estilos padrão
                styles: {
                    textColor: 0, // Preto para o texto
                    lineColor: 0, // Preto para as linhas da borda
                    lineWidth: 0.1 // Espessura da linha da borda
                },
                headStyles: {
                    fillColor: 255, // Branco para o fundo do cabeçalho
                    textColor: 0, // Preto para o texto do cabeçalho
                    fontStyle: 'bold' // Texto do cabeçalho em negrito
                },
                bodyStyles: {
                    fillColor: 255, // Branco para o fundo do corpo
                    textColor: 0 // Preto para o texto do corpo
                },
                didDrawPage: function (data) {
                    // Adicionar borda externa à tabela
                    doc.setDrawColor(0); // Cor da borda preta
                    doc.rect(data.settings.margin.left, data.startY, data.table.width, data.table.height);
                }
            });
            doc.save('estoque.pdf');
        });
    }
});
