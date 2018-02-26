'use strict'

document.getElementById('add-button').addEventListener('click', (e) => {
    
    addItem();

    e.preventDefault();
});

document.getElementById('add-input').addEventListener('keyup', (e) => {
    
    if (e.key == 'Enter') {
        addItem();
    }

    return false;

    e.preventDefault();
});

function addItem() {
    var li = document.createElement('li');

    li.innerText = document.getElementById('add-input').value;

    li.addEventListener('click', (e) => {
        li.parentNode.removeChild(li);
    });

    var ul = document.querySelector('.list ul');
    ul.insertBefore(li, ul.firstChild);
}