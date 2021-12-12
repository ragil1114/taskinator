    // The following two variables help reference the dynamically created elements to their respective ID tags.
var buttonEl = document.querySelector("#save-task"); 
var tasksToDoEl = document.querySelector("#tasks-to-do"); 

    // function that creates a task item
var createTaskHandler = function() { 
  var listItemEl = document.createElement("li"); 
  listItemEl.className = "task-item"; 
  listItemEl.textContent = "This is a new task."; 
  tasksToDoEl.appendChild(listItemEl); 
}; 

    // Call for createTaskHandler()
buttonEl.addEventListener("click", createTaskHandler);