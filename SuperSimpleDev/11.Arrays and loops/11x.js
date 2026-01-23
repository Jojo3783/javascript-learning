const todoList = JSON.parse(localStorage.getItem('todoList')) || [{
  name: 'make dinner',
  dueDate: '2022-12-22'
}, {
  name: 'wash dishes',
  dueDate: '2022-12-22'
}];

printTodoList();

function addTodo() {
  const name = document.querySelector('.js-name-input');
  const duedate = document.querySelector('.js-due-date-input');
  todoList.push({
    name:name.value,
    duedate:duedate.value
  });
  name.value = '';//clear input value
  printTodoList();
}
function printTodoList() {
  let todoListHtml = "";
  for (let i = 0; i < todoList.length; i++) {
    const {name, duedate} = todoList[i];
    const html = `
      <div>${name}</div>
      <div>${duedate}</div>
      <button onclick="
          todoList.splice(${i}, 1);
          printTodoList();
          saveToStorage();
      " class = "delete-todo-button">Delete</button>
      `;
    todoListHtml += html;
  }
  document.querySelector('.js-todo-output').innerHTML = todoListHtml;
  saveToStorage();
}
function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}