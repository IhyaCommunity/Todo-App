'use strict'

document.getElementById('add-button').addEventListener('click', (e) => {
    
    var li = document.createElement('li');

    li.innerText = document.getElementById('add-input').value;

    li.addEventListener('click', (e) => {
        
    });

    var ul = document.querySelector('.list ul');
    ul.insertBefore(li, ul.firstChild);

});