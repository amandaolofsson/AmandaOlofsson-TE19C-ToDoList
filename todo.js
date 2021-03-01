"use strict";

const LOCAL_STORAGE_KEY_TODOS = "storageToDo";

let todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TODOS)) || [];

let information = document.querySelector("#information");
let add = document.querySelector("#addbtn");
let input = document.querySelector("[data-input]");

input.addEventListener("keypress", function (e) {
    if(e.keyCode == 13){
        addItem();
    }
});

add.addEventListener("click", (e) =>{
    e.preventDefault();
    addItem();
})

function addItem(){
    if(input.value.trim() == ""){
        return;
    }
    todos.push(create(input.value.trim()));
    update();
    input.value = "";
}

function create(name){
    return{
        id: Date.now().toString(),
        name: name,
        checked: false,
    };
}

function todoList(item){
    let list = document.createElement("ul");
    list.classList.add("list-group");
    todos.forEach((item) => {
        let todoListItem = document.createElement("li");
        todoListItem.classList.add("list-group-item");

        todoListItem.innerText = item.name;
        todoListItem.setAttribute("data-id", item.id);
        todoListItem.classList.add("todo-list-item");
        if(item.checked){
            todoListItem.classList.add("checked");
        }
        todoListItem.addEventListener("click", checkItem);

        let deleteItem = document.createElement("button");
        deleteItem.classList.add("btn-close");
        deleteItem.classList.add("float-end");

        deleteItem.setAttribute("aria-label", "Close")
        deleteItem.setAttribute("type", "button");
        deleteItem.setAttribute("data-id", item.id);
        deleteItem.addEventListener("click", removeItem);
        todoListItem.append(deleteItem);
        list.append(todoListItem);
    });
    return list;
}

function checkItem(event){
    console.log("got here", event.target);
    todos.forEach((item) => {
        if(item.id == event.target.getAttribute("data-id")){
            item.checked = !item.checked;
        }
    });
    update();
}

function removeItem(event){
    let itemToRemove = event.target.getAttribute("data-id");
    todos = todos.filter((item) => item.id !== itemToRemove);
    update();
}

function update(){
    saveList();
    information.innerHTML = "";
    information.append(todoList(todos));
}

function saveList(){
    localStorage.setItem(LOCAL_STORAGE_KEY_TODOS, JSON.stringify(todos));
}

update();