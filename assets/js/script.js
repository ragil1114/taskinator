var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do"); 


    // function that creates a task item
var taskFormHandler = function(event) {
    event.preventDefault();
        // Variable allowing us to read task name input.
    var taskNameInput = document.querySelector("input[name='task-name']").value;
        // Variable allowing us to read task type selection.
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
        // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
        // send it as an argument to createTaskEl()
    createTaskEl(taskDataObj);
};


    // Function that executes input data from user.
var createTaskEl = function(taskDataObj) {
        // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

        // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

        // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
}


    // Call for taskFormHandler()
formEl.addEventListener("submit", taskFormHandler);