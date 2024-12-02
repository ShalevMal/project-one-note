function collectData() {
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const index = getNumberOfTasksInLocalStorage();
    return { index, description, date, time };
}

function generateHTML(data) {
    const newHTML = `
        <div class="task" data-index="${data.index}" style="background-image: url('./assets/images/notebg.png');">
            <div class="task-header">
                <i class="bi bi-x-circle" onclick="deleteTask(${data.index})"></i>
            </div>
            <div class="task-description">${data.description}</div>
            <div class="task-date-time">
                <div>${data.date}</div>
                <div>${data.time}</div>
            </div>
        </div>
    `;
    return newHTML;
}

function renderHTML(newHTML) {
    const tasksContainer = document.getElementById('taskBoard');
    tasksContainer.innerHTML += newHTML;
}

function clearForm() {
    const tasksForm = document.getElementById('tasksForm');
    tasksForm.reset();

    const descriptionInput = document.getElementById('description');
    descriptionInput.focus();
}

function saveTaskToStorage(taskObject) {
    const currentTasksInStorage = getTasksFromStorage();
    currentTasksInStorage.push(taskObject);
    localStorage.setItem('tasks', JSON.stringify(currentTasksInStorage));
}

function loadTasksFromLocalStorage() {
    const tasks = getTasksFromStorage();
    tasks.forEach(task => {
        const newHTML = generateHTML(task);
        renderHTML(newHTML);
    });
}

function initStorage() {
    const currentTasksInStorageJSON = localStorage.getItem('tasks');
    if (!currentTasksInStorageJSON) {
        localStorage.setItem('tasks', JSON.stringify([]));
    }
}

function getNumberOfTasksInLocalStorage() {
    return getTasksFromStorage().length;
}

function getTasksFromStorage() {
    const tasksJSON = localStorage.getItem('tasks');
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}

function addTask(event) {
    event.preventDefault();
    const data = collectData();
    if (data.description && data.date && data.time) {
        const newHTML = generateHTML(data);
        renderHTML(newHTML);
        saveTaskToStorage(data);
        clearForm();
    } else {
        alert("Fill in all the fields you fucking idiot!!!");
    }
}

function deleteTask(index) {
    const tasks = getTasksFromStorage();
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const taskElement = document.querySelector(`.task[data-index="${index}"]`);
    taskElement.remove();
}

initStorage();
loadTasksFromLocalStorage();
