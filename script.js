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
  secondCardBody.addEventListener("click", removeTodoFromUI);
  clearButton.addEventListener("click", removeAllTodos);
  filterInput.addEventListener("keyup", filterTodo);
}

function pageLoaded() {
  checkTodosFromStorage();
  todos.forEach((todo) => {
    addTodoToUI(todo);
  });
}

function filterTodo(e) {
  const filterValue = e.target.value.toLowerCase().trim();
  const todoListesi = document.querySelectorAll(".list-group-item");
  if (todoListesi.length > 0) {
    todoListesi.forEach((todo) => {
      if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
        todo.setAttribute("style", "display: block");
      } else {
        todo.setAttribute("style", "display: none !important");
      }
    });
  } else {
    alert("Filtreleme yapmak icin en az bir todo olmalidir.");
  }
}

function removeAllTodos() {
  const removenTodos = document.querySelectorAll(".list-group-item");
  if (removenTodos.length > 0) {
    // Ekrandan Silmek
    removenTodos.forEach((todo) => {
      todo.remove();
    });
    //   Storage'den Silmek
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
  } else {
    alert("Silmek icin en az bir todo olmalidir");
  }
}

function addTodo(e) {
  const inputText = addInput.value.trim();
  if (inputText == null || inputText == "") {
    alert("Lutfen bir deger giriniz");
  } else {
    addTodoToUI(inputText);
    addTodoToStorage(inputText);
  }
  e.preventDefault();
}

function addTodoToUI(newTodo) {
  let li = document.createElement("li");
  let a = document.createElement("a");
  let i = document.createElement("i");

  li.className = "list-group-item d-flex justify-content-between";
  li.textContent = newTodo;

  a.href = "#";
  a.className = "delete-item";
  i.className = "fa fa-remove";

  a.appendChild(i);
  li.appendChild(a);
  todoList.appendChild(li);

  addInput.value = "";
}

function addTodoToStorage(newTodo) {
  checkTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

function removeTodoFromUI(e) {
  if (e.target.className === "fa fa-remove") {
    // Ekrandan Silmek
    const todo = e.target.parentElement.parentElement;
    todo.remove();
    // Storage'dan Silmek
    removeTodoFromStorage(todo.textContent);
  }
}

function removeTodoFromStorage(removeTodo) {
  checkTodosFromStorage();
  todos.forEach((todo, index) => {
    if (removeTodo === todo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
