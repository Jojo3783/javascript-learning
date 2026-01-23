const todoList = [
  {
  name : 'make dinner',
  duedate : '2026-01-23'
  } , {
  name : 'wash dishes',
   duedate : '2026-01-24'
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
      " class = "delete-todo-button">Delete</button>
      `;
    todoListHtml += html;
  }
  document.querySelector('.js-todo-output').innerHTML = todoListHtml;
}
