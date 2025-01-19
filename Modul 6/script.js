document.addEventListener('DOMContentLoaded', () => {
    loadUserName();
    loadTasks();
});

function saveUserName() {
    const username = document.getElementById('username').value;
    if (username) {
        localStorage.setItem('username', username);
        document.getElementById('displayUsername').innerText = username;
        alert('Имя пользователя сохранено!');
    } else {
        alert('Введите имя пользователя.');
    }
}

function loadUserName() {
    const username = localStorage.getItem('username');
    document.getElementById('displayUsername').innerText = username ? username : '';
    document.getElementById('username').value = username ? username : '';
}

function openModal() {
    const username = localStorage.getItem('username');
    document.getElementById('editUsername').value = username ? username : '';
    document.getElementById('userModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('userModal').style.display = 'none';
}

function updateUserName() {
    const newUsername = document.getElementById('editUsername').value;
    if (newUsername) {
        localStorage.setItem('username', newUsername);
        document.getElementById('displayUsername').innerText = newUsername;
        document.getElementById('username').value = newUsername;
        alert('Имя пользователя обновлено!');
        closeModal();
    } else {
        alert('Введите новое имя пользователя.');
    }
}

function deleteUserName() {
    if (confirm('Вы уверены, что хотите удалить имя пользователя?')) {
        localStorage.removeItem('username');
        document.getElementById('displayUsername').innerText = '';
        document.getElementById('username').value = '';
        alert('Имя пользователя удалено!');
        closeModal();
    }
}

// Task management functions
function addNewTask() {
    let taskList = document.getElementById('tasklist');
    let nametask = document.getElementById('newtask').value;
    if (nametask === '') return;
    let newTaskLI = document.createElement('li');
    newTaskLI.style.listStyle = 'none';
    let counttasks = taskList.children.length + 1;
    const newTaskHTML = `
        <div class="task" id="task${counttasks}">
            <p class="nametask">${nametask}</p>
            <button class="removetask" onclick='removeTask(${counttasks})'>🗑️</button>
            <button class="edittask" onclick='editTask(${counttasks})'>✍️</button>
            <input class="checktask" onclick='checkTask(${counttasks})' type="checkbox">
        </div>
    `;
    
    newTaskLI.innerHTML = newTaskHTML;
    taskList.appendChild(newTaskLI);
    saveTasks();
    document.getElementById('newtask').value = ''; // Clear the input field
}

function editTask(taskId) {
    let taskDiv = document.getElementById(`task${taskId}`);
    let taskName = taskDiv.querySelector('.nametask').innerText;
    let newName = prompt('Редактировать название задачи:', taskName);
    if (newName === null || newName === '') return;
    taskDiv.querySelector('.nametask').innerText = newName;
    saveTasks();
}

function removeTask(taskId) {
    let taskList = document.getElementById('tasklist');
    let taskDiv = document.getElementById(`task${taskId}`).parentElement;
    taskList.removeChild(taskDiv);
    saveTasks();
}

function checkTask(taskId) {
    let taskDiv = document.getElementById(`task${taskId}`);
    let checkbox = taskDiv.querySelector('.checktask');
    if (checkbox.checked) {
        taskDiv.classList.add('completed');
    } else {
        taskDiv.classList.remove('completed');
    }
    saveTasks();
}

function saveTasks() {
    let taskList = document.getElementById('tasklist');
    let tasks = [];
    for (let task of taskList.children) {
        let taskDiv = task.querySelector('.task');
        let taskName = taskDiv.querySelector('.nametask').innerText;
        let isChecked = taskDiv.querySelector('.checktask').checked;
        tasks.push({ name: taskName, checked: isChecked });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let taskList = document.getElementById('tasklist');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = ''; // Clear the current list
    tasks.forEach((task, index) => {
        let newTaskLI = document.createElement('li');
        newTaskLI.style.listStyle = 'none';
        const newTaskHTML = `
            <div class="task ${task.checked ? 'completed' : ''}" id="task${index + 1}">
                <p class="nametask">${task.name}</p>
                <button class="removetask" onclick='removeTask(${index + 1})'>🗑️</button>
                <button class="edittask" onclick='editTask(${index + 1})'>✍️</button>
                <input class="checktask" onclick='checkTask(${index + 1})' type="checkbox" ${task.checked ? 'checked' : ''}>
            </div>
        `;
        newTaskLI.innerHTML = newTaskHTML;
        taskList.appendChild(newTaskLI);
    });
}