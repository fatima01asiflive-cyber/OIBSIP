// ==========================================
// OASIS INFOBYTE
// LEVEL 2 - TASK 3
// TO-DO WEB APP
// ==========================================


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const taskForm =
    document.getElementById("task-form");

const taskInput =
    document.getElementById("task-input");

const pendingTasks =
    document.getElementById("pending-tasks");

const completedTasks =
    document.getElementById("completed-tasks");

const pendingCount =
    document.getElementById("pending-count");

const completedCount =
    document.getElementById("completed-count");

const totalCount =
    document.getElementById("total-count");

const pendingBadge =
    document.getElementById("pending-badge");

const completedBadge =
    document.getElementById("completed-badge");

const pendingEmpty =
    document.getElementById("pending-empty");

const completedEmpty =
    document.getElementById("completed-empty");


// ==========================================
// LOAD TASKS FROM LOCAL STORAGE
// ==========================================

let tasks =
    JSON.parse(
        localStorage.getItem("todoTasks")
    ) || [];


// ==========================================
// SAVE TASKS
// ==========================================

function saveTasks() {

    localStorage.setItem(
        "todoTasks",
        JSON.stringify(tasks)
    );
}


// ==========================================
// CREATE UNIQUE ID
// ==========================================

function createTaskId() {

    return Date.now().toString() +
        Math.random()
            .toString(36)
            .substring(2, 9);
}


// ==========================================
// FORMAT DATE
// ==========================================

function formatDate(date) {

    return new Date(date).toLocaleString(
        "en-US",
        {
            dateStyle: "medium",
            timeStyle: "short"
        }
    );
}


// ==========================================
// ADD NEW TASK
// ==========================================

taskForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const text =
            taskInput.value.trim();


        // Don't add empty task
        if (text === "") {

            alert("Please enter a task.");

            return;
        }


        const newTask = {

            id: createTaskId(),

            text: text,

            completed: false,

            createdAt: new Date().toISOString()

        };


        tasks.push(newTask);


        saveTasks();

        renderTasks();

        updateCounts();


        // Clear input
        taskInput.value = "";

        taskInput.focus();
    }
);


// ==========================================
// RENDER ALL TASKS
// ==========================================

function renderTasks() {

    pendingTasks.innerHTML = "";

    completedTasks.innerHTML = "";


    const pending =
        tasks.filter(
            (task) => !task.completed
        );


    const completed =
        tasks.filter(
            (task) => task.completed
        );


    // Render pending
    pending.forEach((task) => {

        pendingTasks.appendChild(
            createTaskElement(task)
        );

    });


    // Render completed
    completed.forEach((task) => {

        completedTasks.appendChild(
            createTaskElement(task)
        );

    });


    // Empty states
    pendingEmpty.style.display =
        pending.length === 0
            ? "block"
            : "none";


    completedEmpty.style.display =
        completed.length === 0
            ? "block"
            : "none";
}


// ==========================================
// CREATE TASK ELEMENT
// ==========================================

function createTaskElement(task) {

    const taskItem =
        document.createElement("article");


    taskItem.classList.add(
        "task-item"
    );


    if (task.completed) {

        taskItem.classList.add(
            "completed"
        );
    }


    // ======================================
    // CHECKBOX
    // ======================================

    const checkbox =
        document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.classList.add(
        "complete-checkbox"
    );

    checkbox.checked =
        task.completed;

    checkbox.setAttribute(
        "aria-label",
        "Complete task"
    );


    checkbox.addEventListener(
        "change",
        () => {

            toggleTask(task.id);

        }
    );


    // ======================================
    // TASK CONTENT
    // ======================================

    const content =
        document.createElement("div");

    content.classList.add(
        "task-content"
    );


    const taskText =
        document.createElement("p");

    taskText.classList.add(
        "task-text"
    );

    taskText.textContent =
        task.text;


    const taskTime =
        document.createElement("small");

    taskTime.classList.add(
        "task-time"
    );

    taskTime.textContent =
        `Added: ${formatDate(task.createdAt)}`;


    content.appendChild(taskText);

    content.appendChild(taskTime);


    // ======================================
    // ACTION BUTTONS
    // ======================================

    const actions =
        document.createElement("div");

    actions.classList.add(
        "task-actions"
    );


    // Edit button
    const editButton =
        document.createElement("button");

    editButton.type = "button";

    editButton.classList.add(
        "edit-btn"
    );

    editButton.textContent = "✎";

    editButton.title = "Edit task";

    editButton.setAttribute(
        "aria-label",
        "Edit task"
    );


    editButton.addEventListener(
        "click",
        () => {

            editTask(
                task.id,
                taskText
            );

        }
    );


    // Delete button
    const deleteButton =
        document.createElement("button");

    deleteButton.type = "button";

    deleteButton.classList.add(
        "delete-btn"
    );

    deleteButton.textContent = "×";

    deleteButton.title = "Delete task";

    deleteButton.setAttribute(
        "aria-label",
        "Delete task"
    );


    deleteButton.addEventListener(
        "click",
        () => {

            deleteTask(task.id);

        }
    );


    actions.appendChild(editButton);

    actions.appendChild(deleteButton);


    // ======================================
    // ADD EVERYTHING TO TASK ITEM
    // ======================================

    taskItem.appendChild(checkbox);

    taskItem.appendChild(content);

    taskItem.appendChild(actions);


    return taskItem;
}


// ==========================================
// COMPLETE / UNCOMPLETE TASK
// ==========================================

function toggleTask(taskId) {

    tasks = tasks.map(
        (task) => {

            if (task.id === taskId) {

                return {
                    ...task,
                    completed: !task.completed
                };
            }

            return task;
        }
    );


    saveTasks();

    renderTasks();

    updateCounts();
}


// ==========================================
// EDIT TASK
// ==========================================

function editTask(taskId, taskTextElement) {

    const task =
        tasks.find(
            (item) => item.id === taskId
        );


    if (!task) {
        return;
    }


    // Create edit input
    const input =
        document.createElement("input");


    input.type = "text";

    input.classList.add(
        "edit-input"
    );

    input.value =
        task.text;

    input.maxLength = 100;


    // Replace text with input
    taskTextElement.replaceWith(input);

    input.focus();

    input.select();


    // Save edited task
    function saveEdit() {

        const newText =
            input.value.trim();


        if (newText === "") {

            renderTasks();

            return;
        }


        task.text = newText;


        saveTasks();

        renderTasks();

        updateCounts();
    }


    // Enter = save
    input.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                saveEdit();
            }


            if (event.key === "Escape") {

                renderTasks();
            }

        }
    );


    // Save when input loses focus
    input.addEventListener(
        "blur",
        saveEdit
    );
}


// ==========================================
// DELETE TASK
// ==========================================

function deleteTask(taskId) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this task?"
        );


    if (!confirmed) {
        return;
    }


    tasks =
        tasks.filter(
            (task) =>
                task.id !== taskId
        );


    saveTasks();

    renderTasks();

    updateCounts();
}


// ==========================================
// UPDATE COUNTS
// ==========================================

function updateCounts() {

    const pending =
        tasks.filter(
            (task) => !task.completed
        ).length;


    const completed =
        tasks.filter(
            (task) => task.completed
        ).length;


    const total =
        tasks.length;


    pendingCount.textContent =
        pending;

    completedCount.textContent =
        completed;

    totalCount.textContent =
        total;


    pendingBadge.textContent =
        pending;

    completedBadge.textContent =
        completed;
}


// ==========================================
// INITIAL LOAD
// ==========================================

renderTasks();

updateCounts();