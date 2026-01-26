const todoList = [
  {
  name : 'make dinner',
  duedate : '2026-01-23'
  } , {
  name : 'wash dishes',
   duedate : '2026-01-24'
  }];
  
printTodoList();
document.querySelector('.js-add-todo-button').addEventListener('click', () => {
  addTodo();
});
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
  todoList.forEach((todoObject, index) => {
    const {name, duedate} = todoObject;
    const html = `
      <div>${name}</div>
      <div>${duedate}</div>
      <button class = "delete-todo-button js-delete-todo-button">Delete</button>
      `;
    todoListHtml += html;
  });
  document.querySelector('.js-todo-output').innerHTML = todoListHtml;

  document.querySelectorAll('.js-delete-todo-button').forEach((deletebutton, index) => {
    deletebutton.addEventListener('click', () => {
      todoList.splice(index, 1);
      printTodoList();
    })
  });
}
