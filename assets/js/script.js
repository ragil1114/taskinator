var formEl = document.querySelector("#task-form");      // reference task-form
var tasksToDoEl = document.querySelector("#tasks-to-do");       // reference tasks-to-do column
var pageContentEl = document.querySelector("#page-content");    // references the <main> element content's ID tags
var taskIdCounter = 0;      // counter that increments by one each time a task is created (gives each task a unique id)
var tasksInProgressEl = document.querySelector("#tasks-in-progress");   // reference tasks-in-progress column
var tasksCompletedEl = document.querySelector("#tasks-completed");      // reference tasks-completed column
var tasks = [];     // tasks array variable to reference for localStorage


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
            type: taskTypeInput,
            status: "to do"
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
    taskInfoEl.innerHTML =
      "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);
        // used to store the DOM element returned by the createTaskActions()
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
  
    switch (taskDataObj.status) {
      case "to do":
        taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 0;
        tasksToDoEl.append(listItemEl);
        break;
      case "in progress":
        taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 1;
        tasksInProgressEl.append(listItemEl);
        break;
      case "completed":
        taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 2;
        tasksCompletedEl.append(listItemEl);
        break;
      default:
        console.log("Something went wrong!");
    }
  
    // save task as an object with name, type, status, and id properties then push it into tasks array
    taskDataObj.id = taskIdCounter;
  
    tasks.push(taskDataObj);
  
    // save tasks to localStorage
    saveTasks();
  
    // increase task counter for next unique task id
    taskIdCounter++;
};

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

        // loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    alert("Task Updated!");
        // remove data attribute from form
    formEl.removeAttribute("data-task-id");
        // update formEl button to go back to saying "Add Task" instead of "Edit Task"
    document.querySelector("#save-task").textContent = "Add Task";

    saveTasks();
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

        // update task's in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    saveTasks();
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

        // Create a new array to hold updated list of tasks after deletion (all tasks included except for the deleted one).
    var updatedTaskArr = [];

        // loop through current tasks (to find the one to be deleted)
    for (var i = 0; i < tasks.length; i++) {
            // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

        // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;

    saveTasks();
};


    // Function to save tasks to localStorage
var saveTasks = function() {
        // JSON.stringify converts the objects in the array into strings to be saved into localStorage.
    localStorage.setItem("tasks", JSON.stringify(tasks));
};


// 1. Gets task items from localStorage.

// 2. Converts tasks from the string format back into an array of objects.

// 3. Iterates through a tasks array and creates task elements on the page from it.
var loadTasks = function() {
    var savedTasks = localStorage.getItem("tasks");
        // if there are no tasks, set tasks to an empty array and return out of the function
    if (!savedTasks) {
        return false;
    }
        // parse into array of objects
    savedTasks = JSON.parse(savedTasks);

        // loop through savedTasks array
    for (var i = 0; i < savedTasks.length; i++) {
            // pass each task object into the `createTaskEl()` function
        createTaskEl(savedTasks[i]);
    }
};


    // create a new task
formEl.addEventListener("submit", taskFormHandler);
    // for edit & delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);
    // for task status change 
pageContentEl.addEventListener("change", taskStatusChangeHandler);
    // Call to retreive task data from localStorage
loadTasks();