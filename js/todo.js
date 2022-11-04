const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY ="todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
}

function deleteToDo(event){
  const li = event.target.parentElement;
  console.log(li.id);
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  console.log(toDos);
  saveToDos();
  li.remove();
}

function paintToDo(newTodoObj) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  button.innerText = "X"; 
  button.addEventListener("click",deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  li.id = newTodoObj.id;
  span.innerText = newTodoObj.text;
  console.log(li);

  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = `${toDoInput.value}  `;
  toDoInput.value =""; 
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  }
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
 
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
console.log(savedToDos);

if(savedToDos) {
  const parsedToDos = JSON.parse(savedToDos); 
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

 

