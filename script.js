const newTaskInput = document.getElementById("newTask");
const taskDateInput = document.getElementById("taskDate");
const completionMeter = document.querySelector(".meter");
const marks25 = document.querySelector(".task-mark-25");
const marks50 = document.querySelector(".task-mark-50");
const marks75 = document.querySelector(".task-mark-75");

function updateCompletionPercentage() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    const totalTasks = checkboxes.length;
    const completedTasks = checkedCheckboxes.length;
    const percentage = (completedTasks / totalTasks) * 100;

    completionMeter.style.width = percentage + '%';

    if (percentage <= 25) {
        completionMeter.style.backgroundColor = "#f44336"; 
    } else if (percentage <= 50) {
        completionMeter.style.backgroundColor = "#ff9800";
    } else if (percentage <= 75) {
        completionMeter.style.backgroundColor = "#2196F3";
    } else {
        completionMeter.style.backgroundColor = "#4caf50";
    }

    marks25.style.bottom = percentage + '%';
    marks50.style.bottom = percentage + '%';
    marks75.style.bottom = percentage + '%';

    document.getElementById("percentage").textContent = percentage.toFixed(2) + "%";
}

function addTask() {
    const taskText = newTaskInput.value.trim();
    const taskDate = taskDateInput.value;

    if (taskText !== "") {
        const todoItems = document.querySelector(".todo-items");

        const todoItem = document.createElement("div");
        todoItem.className = "todo-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "item" + (todoItems.childElementCount + 1);

        const label = document.createElement("label");
        label.htmlFor = "item" + (todoItems.childElementCount + 1);
        label.textContent = taskText;

        const dateLabel = document.createElement("span");
        dateLabel.className = "task-date";

        if (taskDate !== "") {
            dateLabel.textContent = "Deadline: " + taskDate;
        } else {
            dateLabel.textContent = "Not added";
        }

        const updateButton = document.createElement("button");
        updateButton.className = "update-button";
        updateButton.innerHTML = "✏️"; 
        updateButton.addEventListener("click", function () {
            updateTask(this.parentElement);
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerHTML = "❌"; 
        deleteButton.addEventListener("click", function () {
            deleteTask(this.parentElement);
        });

        todoItem.appendChild(checkbox);
        todoItem.appendChild(label);
        todoItem.appendChild(dateLabel);
        todoItem.appendChild(updateButton);
        todoItem.appendChild(deleteButton);

        todoItems.appendChild(todoItem);

        newTaskInput.value = "";
        taskDateInput.value = "";

        checkbox.addEventListener("change", updateCompletionPercentage); 

        updateCompletionPercentage();
    } else {
        alert("Please enter a task.");
    }
}

function updateTask(todoItem) {
    const label = todoItem.querySelector("label");
    const dateLabel = todoItem.querySelector(".task-date");
    const taskText = prompt("Update the task:", label.textContent);
    const taskDate = prompt("Update the deadline (YYYY-MM-DD):", dateLabel.textContent === "Not added" ? "" : dateLabel.textContent.split(" ")[1]);

    if (taskText !== null) {
        label.textContent = taskText;

        if (taskDate !== null && taskDate !== "") {
            dateLabel.textContent = "Deadline: " + taskDate;
        } else {
            dateLabel.textContent = "Not added";
        }
    }

    updateCompletionPercentage();
}

function deleteTask(todoItem) {
    todoItem.remove();
    updateCompletionPercentage();
}

newTaskInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});