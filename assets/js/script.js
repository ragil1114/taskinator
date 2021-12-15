var formEl = document.querySelector("#task-form");      // reference task-form
var tasksToDoEl = document.querySelector("#tasks-to-do");       // reference tasks-to-do column
var pageContentEl = document.querySelector("#page-content");    // references the <main> element content's ID tags
var taskIdCounter = 0;      // counter that increments by one each time a task is created (gives each task a unique id)
var tasksInProgressEl = document.querySelector("#tasks-in-progress");   // reference tasks-in-progress column
var tasksCompletedEl = document.querySelector("#tasks-completed");      // reference tasks-completed column

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

    var isEdit = formEl.hasAttribute("data-task-id");

        // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
        // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };
            // send it as an argument to createTaskEl()
        createTaskEl(taskDataObj);
    }
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


    // Function for edit task
var completeEditTask = function(taskName, taskType, taskId) {
        // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
        // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");
        // to reset the form after edit submission
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};


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


    // Function to change status of tasks
var taskStatusChangeHandler = function(event) {
        // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

        // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

        // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } 
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } 
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
};


    // Function to edit task.
var editTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
    
};


    // Function to delete a task.
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};



    // create a new task
formEl.addEventListener("submit", taskFormHandler);
    // for edit & delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);
    // for task status change 
pageContentEl.addEventListener("change", taskStatusChangeHandler);