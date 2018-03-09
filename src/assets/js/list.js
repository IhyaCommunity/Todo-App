'use strict';

(function () {

    var listInput = document.getElementById("add-input");

    listInput.onfocus = function () {
        this.removeAttribute("placeholder");
    }

    listInput.onblur = function () {
        this.placeholder = "Write Your Task Here!";
    }

    document.getElementById('add-button').addEventListener('click', (e) => {
        AddTask();
        e.preventDefault();
    });

    listInput.addEventListener('keyup', (e) => {

        if (e.key == 'Enter') {
            AddTask();
            
        }

        return false;

        e.preventDefault();
    });

    function addItem() {

        var li = document.createElement('li');

        li.innerText = listInput.value;
        li.setAttribute("class", "listItem");

        li.addEventListener('click', (e) => {
            li.parentNode.removeChild(li);
        });

        var ul = document.querySelector('.list ul');
        ul.insertBefore(li, ul.firstChild);
    }

    function checkDuplicateTask(inputValue, list) {
        var status = 'false';

        for (var i = 0; i < list.length; i++) {
            var name = list[i].innerText;
            if (name == inputValue) {
                status = 'true';
                break;
            }
        }

        return status;
    }

    function AddTask() {

        var listItems = document.getElementsByClassName("listItem");

        if (listItems.length < 1) {
            addItem();
            listInput.value = null;
        }
        else {
            var status = checkDuplicateTask(listInput.value, listItems);

            switch (status) {
                case 'true':
                    alert("TASK Already Exist!");
                    listInput.value = null;
                    listInput.placeholder = "Write Your Task Here!";
                    break;

                case 'false':
                    addItem();
                    listInput.value = null;
                    listInput.placeholder = "Write Your Task Here!";
            }
        }
    }

})();