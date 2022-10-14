const uri = 'api/Car';
let cars = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addManufacturer = document.getElementById('add-manufacturer');
    const addType = document.getElementById('add-type')
    const addSalesprice = document.getElementById('add-salesprice')
    const addNextCheck = document.getElementById('add-nextcheck')
    const addPower = document.getElementById('add-power')
    const addKm = document.getElementById('add-km')
    
    const item = {
        manufacturer: addManufacturer.value.trim(),
        type: addType.value.trim(),
        salesprice: addSalesprice.value.trim(),
        nextcheck: addNextCheck.value.trim(),
        power: addPower.value.trim(),
        km: addKm.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addSalesprice.value = ''
            addPower.value = ''
            addNextCheck.value = ''
            addKm.value = ''
            addManufacturer.value = ''
            addType.value = ''
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = cars.find(item => item.id === id);
    
    document.getElementById('edit-manufacturer').value = item.manufacturer;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-type').value = item.type;
    document.getElementById('edit-km').value = item.km;
    document.getElementById('edit-power').value = item.power;
    document.getElementById('edit-nextcheck').value = new Date(item.nextCheck).toISOString().substring(0,10);
    document.getElementById('edit-salesprice').value = item.salesprice;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        manufacturer: document.getElementById('edit-manufacturer').value.trim(),
        salesprice: document.getElementById('edit-salesprice').value.trim(),
        type: document.getElementById('edit-type').value.trim(),
        km: document.getElementById('edit-km').value.trim(),
        power: document.getElementById('edit-power').value.trim(),
        nextcheck: document.getElementById('edit-nextcheck').value.trim()
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'car' : 'cars';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('cars');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(document.createTextNode(item.id));
        
        let td2 = tr.insertCell(1);
        td2.appendChild(document.createTextNode(item.manufacturer));

        let td3 = tr.insertCell(2);
        let textNode = document.createTextNode(item.type);
        td3.appendChild(textNode);

        let td4 = tr.insertCell(3);
        td4.appendChild(editButton);

        let td5 = tr.insertCell(4);
        td5.appendChild(deleteButton);
    });

    cars = data;
}