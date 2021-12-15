var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");    // references the <main> element content's ID tags
var taskIdCounter = 0;      // counter that increments by one each time a task is created (gives each task a unique id)


    // Function that declares actions for form user input.
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


    // Function that declares actions for task items.
var createTaskEl = function(taskDataObj) {
        // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    
        // add task id as a custom data attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

        // create <div> to hold the task info
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    listItemEl.appendChild(taskInfoEl);

        // used to store the DOM element returned by the createTaskActions()
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
        // add entire list item to <li>
    tasksToDoEl.appendChild(listItemEl);

        // increase task counter for next unique id
    taskIdCounter++;
}

    // Function to declare actions for dynamically created form elements.
var createTaskActions = function(taskId) {
        // Variable to create a new <div> element. 
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
        // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

        // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

        // create task status dropdown
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
        // Array that declares the dropdown <option> elements
    var statusChoices = ["To Do", "In Progress", "Completed"];
        // to create <option> elements
    for (var i = 0; i < statusChoices.length; i++) {
            // store data for <option>
        var statusOptionEl = document.createElement("option");
            // returns the value of the array at the given index
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
      
            // append <option> to <select>
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};


    // Call for taskFormHandler()
formEl.addEventListener("submit", taskFormHandler);


    // Function to declare action for delete button clicks.
var taskButtonHandler = function(event) {
        // get target element from event
    var targetEl = event.target;
        // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    } 
        // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};


var editTask = function(taskId) {
    console.log("editing task #" + taskId);
        // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
};


    // Function to delete a task.
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};


    // allows for ability to delete a task
pageContentEl.addEventListener("click", taskButtonHandler);