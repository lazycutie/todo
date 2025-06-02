document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById("taskInput");
    const addTask = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    const addsTask = (event) => {
        event.preventDefault();
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
        li.querySelector('.deleteButton').addEventListener('click', () => {
            li.remove();
        })
        taskList.appendChild(li);
        taskInput.value = '';
    };

    addTask.addEventListener('click', addsTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'enter') {
            addTask(e)
        }
    });
})