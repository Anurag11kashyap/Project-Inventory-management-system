
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inventory-form');
    const tableBody = document.querySelector('#inventory-table tbody');

     
    loadInventory();

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const itemName = document.getElementById('item-name').value.trim();
        const itemQuantity = parseInt(document.getElementById('item-quantity').value.trim(), 10);

        if (itemName && !isNaN(itemQuantity)) {
            addItemToTable(itemName, itemQuantity);
            saveItemToLocalStorage(itemName, itemQuantity);
            form.reset();
        }
    });

    function addItemToTable(name, quantity) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td>${quantity}</td>
            <td>
                <button class="edit">Edit</button>
                <button class="remove">Remove</button>
            </td>
        `;
        tableBody.appendChild(row);


        row.querySelector('.remove').addEventListener('click', function() {
            row.classList.add('fade-out');
            setTimeout(() => {
                row.remove();
                removeItemFromLocalStorage(name);
            }, 300);  
        });

        row.querySelector('.edit').addEventListener('click', function() {
            document.getElementById('item-name').value = name;
            document.getElementById('item-quantity').value = quantity;
            row.remove();  
            removeItemFromLocalStorage(name); // Optionally remove the item from the list
        });
    }

    function saveItemToLocalStorage(name, quantity) {
        let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
        inventory.push({ name, quantity });
        localStorage.setItem('inventory', JSON.stringify(inventory));
    }

    function removeItemFromLocalStorage(name) {
        let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
        inventory = inventory.filter(item => item.name !== name);
        localStorage.setItem('inventory', JSON.stringify(inventory));
    }

    function loadInventory() {
        let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
        inventory.forEach(item => addItemToTable(item.name, item.quantity));
    }
});
