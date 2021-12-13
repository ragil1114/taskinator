var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do"); 

    // function that creates a task item
var createTaskHandler = function(event) {
  event.preventDefault();
    // Variable allowing us to read task name input.
  var taskNameInput = document.querySelector("input[name='task-name']").value;
    // Variable allowing us to read task type selection.
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
    // create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

    // create div to hold task info and add to list item^
  var taskInfoEl = document.createElement("div");
    // give it a class name
  taskInfoEl.className = "task-info";
    // add HTML content to div
  taskInfoEl.innerHTML = 
    "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    // place div content in li element
  listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
  tasksToDoEl.appendChild(listItemEl);
}; 

    // Call for createTaskHandler()
formEl.addEventListener("submit", createTaskHandler);