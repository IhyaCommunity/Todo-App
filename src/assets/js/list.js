'use strict';

(function () {

    var listInput = document.getElementById("add-input");

    document.getElementById('add-button').addEventListener('click', (e) => {
    
        addItem();
        listInput.value = null;        
    
        e.preventDefault();
    });
    
    listInput.addEventListener('keyup', (e) => {
        
        if (e.key == 'Enter') {
            addItem();
            listInput.value = null;
        }
    
        return false;
    
        e.preventDefault();
    });
    
    function addItem() {
        var li = document.createElement('li');
    
        li.innerText = listInput.value;
    
        li.addEventListener('click', (e) => {
            li.parentNode.removeChild(li);
        });
    
        var ul = document.querySelector('.list ul');
        ul.insertBefore(li, ul.firstChild);
    }

})();