document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById("taskInput");
    const addTask = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const saveTaskToLocalStorage = () => {
        const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
            text: li.querySelector('span').textContent,
            completed: li.querySelector('.checkbox').checked
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const loadTasksFromLocalStorage = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        savedTasks.forEach(({ text, completed }) => addTaskToList(text, completed));
    };

    const addTaskToList = (text, completed = false) => {
        const taskTest = text || taskInput.value.trim();
        if (!taskTest) {
            alert('Enter some tasks');
            return;
        }
     
        if (taskInput.value === '') {
            alert('Enter some tasks')
        }
        else {
            var taskTest = taskInput.value.trim();
            var li = document.createElement('li');
            li.innerHTML = `
    <input type = "checkbox" class = "checkbox"> 
    <span>${taskTest}</span>
    <button class="deleteButton"><i class="bi bi-trash3"></i></button>
    `;
        }
        const checkbox = li.querySelector('.checkbox');

        if (completed) {
            li.classList.add('completed');
        }

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                li.classList.add('completed');
            } else {
                li.classList.remove('completed');
            }
            saveTaskToLocalStorage();
        });

        li.querySelector('.deleteButton').addEventListener('click', () => {
            li.remove();
            saveTaskToLocalStorage();
        });

        taskList.appendChild(li);
        taskInput.value = '';
        saveTaskToLocalStorage();
    };

    addTaskButton.addEventListener('click', () => addTaskToList());

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTaskToList();
        }
    });

    loadTasksFromLocalStorage();
});
