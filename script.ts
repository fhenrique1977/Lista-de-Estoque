document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');
    const stockTableBody = document.querySelector('#stock-table tbody');
    let stockList: Array<{ item: string; quantity: number }> = [];

    function addItem() {
        const itemName = (itemInput as HTMLInputElement)?.value?.trim();
        if (itemName !== '' && itemInput) {
            stockList.push({ item: itemName, quantity: 1 });
            updateTable();
            (itemInput as HTMLInputElement).value = '';
        }
    }

    function removeItem(index: number) {
        stockList.splice(index, 1);
        updateTable();
    }

    function updateTable() {
        if (!stockTableBody) return;
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

    // Função para gerar PDF
    const generatePdfButton = document.getElementById('generate-pdf');
    if (generatePdfButton) {
        generatePdfButton.addEventListener('click', () => {
            // @ts-ignore
            const doc = new window.jspdf.jsPDF();

            doc.text('Relatório de Estoque', 14, 15);

            const tableData = stockList.map(itemObj => [
                itemObj.item,
                itemObj.quantity.toString()
            ]);

            const headers = [['Item', 'Quantidade']];

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
                didDrawTable: function (data: any) {
                    doc.setDrawColor(0);
                    const x = data.table.position.x;
                    const y = data.table.position.y;
                    const width = data.table.width;
                    const height = data.table.height;

                    if (
                        typeof x === 'number' &&
                        typeof y === 'number' &&
                        typeof width === 'number' &&
                        typeof height === 'number' &&
                        !isNaN(x) && !isNaN(y) && !isNaN(width) && !isNaN(height)
                    ) {
                        doc.rect(x, y, width, height);
                    } else {
                        console.warn(`Argumentos inválidos para doc.rect: x=${x}, y=${y}, width=${width}, height=${height}`);
                    }
                }
            });

            doc.save('estoque.pdf');
        });
    }
});