function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value;

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    

    const taskList = document.getElementById('task-list');

    const taskItem = document.createElement('li');
    taskItem.innerText = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = () => {
        taskList.removeChild(taskItem);
    };

    taskItem.appendChild(deleteButton);

    taskItem.onclick = () => {
        taskItem.classList.toggle('completed');
    };

    taskList.appendChild(taskItem);

    taskInput.value = '';
}
