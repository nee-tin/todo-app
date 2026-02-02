// Load tasks from localStorage (or start with empty array)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// App state: which tasks to show
let currentFilter = "all";

// Cache input element
const input = document.getElementById("taskInput");


  function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  // Decide which tasks to show
  let filteredTasks = tasks;

  if (currentFilter === "active") {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  if (currentFilter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  }
  
const emptyMessage = document.getElementById("emptyMessage");

// Show / hide empty message using class
if (tasks.length === 0) {
  emptyMessage.classList.add("show");
} else {
  emptyMessage.classList.remove("show");
}

  
  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    // Toggle completed
    li.onclick = function () {
      task.completed = !task.completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    };

    if (task.completed) li.classList.add("completed");

    // EDIT BUTTON
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";

    editBtn.onclick = function (e) {
      e.stopPropagation();
      const newText = prompt("Edit task:", task.text);
      if (newText && newText.trim() !== "") {
        task.text = newText.trim();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
      }
    };

    // DELETE BUTTON
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.onclick = function (e) {
      e.stopPropagation();
      tasks.splice(tasks.indexOf(task), 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    };

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Change filter
function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

// Add new task
function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") return;

  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks();
  input.value = "";
  input.focus();
}

// Enter key support
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

// Initial render
renderTasks();
