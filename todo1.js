  document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    const saveLocal = () => {
        const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
            text: li.querySelector('span').textContent,
            completed: li.querySelector('.checkbox').checked,
             
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const loadLocal = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        savedTasks.forEach(({ text, completed  }) => listTask(text, completed ));
    };

    const listTask = (text, completed = false) => {
        const taskTest = text || taskInput.value.trim();
        

        if (!taskTest) {
            alert('Enter some tasks');
            return;
        }

        const li = document.createElement('li');
        const d = new Date();
        const ghanta = d.getHours().toString().padStart(2, '0');
        const min = d.getMinutes().toString().padStart(2, '0')
         
        if(ghanta > 12){
        var timee = (ghanta-12).toString().padStart(2,'0') + ":" +  min;   
    }
    else{
        var timee = ghanta + ":" + min;
    } 
        

        li.innerHTML = `
            
                <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>
                <span>${taskTest}</span>
                <button class="deleteButton"><i class="bi bi-trash3"></i></button>
            
            
        `;

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
            saveLocal();
        });

        li.querySelector('.deleteButton').addEventListener('click', () => {
            li.remove();
            saveLocal();
        });

        taskList.appendChild(li);
        taskInput.value = '';
        saveLocal();
    };

    addTaskButton.addEventListener('click', () => listTask());

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
             e.preventDefault();
            listTask();
        }
    });

    loadLocal();
});
