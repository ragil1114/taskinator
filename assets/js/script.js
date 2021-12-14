var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
    // counter that increments by one each time a task is created
var taskIdCounter = 0; 


    // function that creates a task item
var taskFormHandler = function(event) {
    event.preventDefault();
        // Variable allowing us to read task name input.
    var taskNameInput = document.querySelector("input[name='task-name']").value;
        // Variable allowing us to read task type selection.
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
        // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
        // to clear form entries after submission
    formEl.reset();
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

        // add task id as a custom data attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

        // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

        // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

        // increase task counter for next unique id
    taskIdCounter++;
}


    // Call for taskFormHandler()
formEl.addEventListener("submit", taskFormHandler);