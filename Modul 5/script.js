function savelocal(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadlocal() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    return Array.isArray(storedTasks) ? storedTasks : [];
}

function savestatus(taskId, completed) {
    let tasks = loadlocal();
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = completed;
        }
        return task;
    });
    savelocal(tasks);
}

function removetask(taskId) {
    let tasks = loadlocal();
    tasks = tasks.filter(task => task.id !== taskId);
    savelocal(tasks);
    loadtaskboard(tasks);
}

function loadtaskboard(tasks) {
    const taskboards = document.getElementById('taskboards');
    taskboards.innerHTML = '';

    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';

        const nameParagraph = document.createElement('p');
        nameParagraph.className = 'name';
        nameParagraph.textContent = task.name;

        const statusParagraph = document.createElement('p');
        statusParagraph.textContent = 'Выполнено ';

        const statusCheckbox = document.createElement('input');
        statusCheckbox.type = 'checkbox';
        statusCheckbox.className = 'status';
        statusCheckbox.checked = task.completed;

        // Добавляем обработчик события для чекбокса
        statusCheckbox.addEventListener('change', () => {
            savestatus(task.id, statusCheckbox.checked);
        });

        const removeButton = document.createElement('button');
        removeButton.className = 'remove';
        removeButton.textContent = 'Удалить';
        removeButton.addEventListener('click', () => {
            removetask(task.id);
        });

        statusParagraph.appendChild(statusCheckbox);
        taskDiv.appendChild(nameParagraph);
        taskDiv.appendChild(statusParagraph);
        taskDiv.appendChild(removeButton);

        taskboards.appendChild(taskDiv);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const taskboards = document.getElementById('taskboards');
    const addTaskButton = document.getElementById('addTaskButton');
    const modal = document.getElementById('myModal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const createTaskButton = document.getElementById('createTaskButton');
    const taskNameInput = document.getElementById('taskName');

    let tasks = loadlocal();
    if (tasks.length === 0) {
        tasks = [
            { id: 1, name: "Задача 1", completed: false },
            { id: 2, name: "Задача 2", completed: true },
            { id: 3, name: "Задача 3", completed: false }
        ];
        savelocal(tasks);
    }
    loadtaskboard(tasks);

    addTaskButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    createTaskButton.addEventListener('click', () => {
        const taskName = taskNameInput.value.trim();
        if (taskName) {
            const newTask = {
                id: tasks.length + 1,
                name: taskName,
                completed: false
            };
            tasks.push(newTask);
            savelocal(tasks);
            modal.style.display = 'none';
            taskNameInput.value = '';
            loadtaskboard(tasks);
        } else {
            alert('Введите название задачи');
        }
    });
});