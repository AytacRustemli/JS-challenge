const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");
let todos = [];

runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    secondCardBody.addEventListener("click", removeTodoToUI);
    clearButton.addEventListener("click", allTodos);
    filterInput.addEventListener("keyup", filter);
}

function filter(e) {
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item");
    if (todoListesi.length > 0) {
        todoListesi.forEach(function (todo) {
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
                todo.setAttribute("style", "display : block");
            }
            else {
                todo.setAttribute("style", "display : none !important");
            }
        })
    }
    else {
        showAlert("warning", "Filtrelemek icin en az bir todo olmali.");
    }
}

function allTodos() {
    const todoListesi = document.querySelectorAll(".list-group-item");
    if (todoListesi.length > 0) {
        todoListesi.forEach(function (params) {
            params.remove();
        })
        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos));
        showAlert("success", "Basariyla silindi.");
    }
    else {
        showAlert("warning", "Silmek icin en az bir todo olmalidir.")
    }

}

function pageLoaded() {
    checkTodosfromStorage();
    todos.forEach(function (todo) {
        addTodoUI(todo);
    })
}

function removeTodoToUI(e) {
    if (e.target.className == "fa fa-remove") {
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        removeTodoToStorage(todo.textContent);
        showAlert("success", "Todo basariyla silindi..");
    }
}

function removeTodoToStorage(removeTodo) {
    checkTodosfromStorage();
    todos.forEach(function (todo, index) {
        if (removeTodo === todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(e) {
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        showAlert("warning", "Lutfen bos birakmayiniz..");
    }
    else {
        addTodoUI(inputText);
        addTodoStorage(inputText);
        showAlert("success", "Todo eklendi");
    }
    e.preventDefault();
}

function addTodoUI(newTodo) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.className = "delete-item";
    a.href = "#";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";
}

function addTodoStorage(newTodo) {
    checkTodosfromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosfromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type, message) {
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent = message;
    firstCardBody.appendChild(div);
    setTimeout(() => {
        div.remove();
    }, 2500);
}



// let check = true;
// function createPromise(){
//     return new Promise((resolve,reject) =>{
//         if (check) {
//             resolve("resolve oldu");
//         }
//         else{
//             reject("olmadi");
//         }
//     })
// }

// createPromise()
// .then((response) => {
//     console.log(response);
// })
// .catch((error) => console.log(error))
// .finally(() => console.log("her zaman isler"));

// function readStudents(url){
//     return new Promise((resolve,reject)=>{
//         const xhr = new XMLHttpRequest();
//         try{
//             xhr.addEventListener("readystatechange", ()=>{
//                 if(xhr.readyState === 4 && xhr.status === 200){
//                     resolve(JSON.parse(xhr.responseText));
//                 }
//             })
//         }
//         catch(error){
//             reject(error);
//         }

//         xhr.open("GET", url);
//         xhr.send();
//     })
// }

// readStudents("https://jsonplaceholder.typicode.com/posts").then((data) => console.log(data))
// .catch((err) => console.log(err));

// function getUsers(url) {
//     return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.addEventListener("readystatechange", () => {
//             try {
//                 if (xhr.readyState === 4 && xhr.status === 200) {
//                     resolve(JSON.parse(xhr.responseText));
//                 }
//             }
//             catch (error) {
//                 reject(error);
//             }
//         })

//         xhr.open("GET", url);
//         xhr.send();

//     })
// }

// getUsers("https://jsonplaceholder.typicode.com/users")
//     .then((data) => {
//         console.log(data)
//         data.forEach((user) =>
//             console.log(user.name));
//     }
//     )
//     .catch((err) => console.log(err));