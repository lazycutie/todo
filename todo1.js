 document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const dateInputEl = document.getElementById("timeR");
 
    const saveLocal = () => {
        const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
            text: li.querySelector('span').textContent,
            completed: li.querySelector('.checkbox').checked,
            date: li.getAttribute('data-date') || null,
            recorded_date: li.getAttribute('cur-date')
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

  
    const loadLocal = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (!savedTasks) return;
        savedTasks.forEach(({ text, completed, date ,currDate}) => listTask(text, completed, date,currDate));
    };

 
    const listTask = (text = '', completed = false, savedDate = null,  ) => {
        const taskText = text || taskInput.value.trim();
        const dateInput = savedDate || dateInputEl.value;
        

        if (!taskText) {
            alert('Enter some tasks');
            return;
        }

        if (!dateInput || isNaN(new Date(dateInput))) {
            alert('Please select a valid date and time');
            return;
        }

        const selectedDate = new Date(dateInput);
        const now = new Date();
        const diffInMs = selectedDate - now;

        const totalDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const remainingHours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

        const li = document.createElement('li');
         
        li.setAttribute('data-date', dateInput);

        li.innerHTML = `
            <div>
                <input type="checkbox" class="checkbox" ${completed ? 'checked' : ' '}>
                <span>${taskText}</span>
                <button class="deleteButton"><i class="bi bi-trash3"></i></button>
            </div>  
        <div class= DandT>
        <span>   
        ${totalDays===0?" ":` ${totalDays===1? `${totalDays} day` : `${totalDays} days `}`} ${remainingHours} hours and ${remainingMinutes} minutes remaining
        </span>    
        </div>`
        const checkbox = li.querySelector('.checkbox');
        if (completed) li.classList.add('completed');

        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed', checkbox.checked);
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
