// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions
function addTodo(e) {

    // Prevent from submitting
    e.preventDefault();
    
    // Create todo Div 
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create li
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);

    // Add todo to localStorage
    saveLocalTodos(todoInput.value);

    // Check mark button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);

    // Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // Append to list
    todoList.appendChild(todoDiv);

    // Clear input form
    todoInput.value = '';

}

function deleteCheck(e) {
    const item = e.target;
    
    // Delete todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }

    // Check mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        
        // Filter todo list based on input selected (flex to show or none to hide)
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'incomplete':
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
        
    })
    
}

function saveLocalTodos(todo) {
    //Check to see if todos is already saved
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

}

function getTodos() {
    let todos;
    // If todos is null, create new array, otherwise load from localStorage via JSON
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        
        todos.forEach((todo) => {
            // Create todo Div 
            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo');

            // Create li
            const newTodo = document.createElement('li');
            newTodo.classList.add('todo-item');
            newTodo.innerText = todo;
            todoDiv.appendChild(newTodo);

            // Check mark button
            const completeButton = document.createElement('button');
            completeButton.innerHTML = '<i class="fas fa-check"></i>';
            completeButton.classList.add('complete-btn');
            todoDiv.appendChild(completeButton);

            // Trash button
            const trashButton = document.createElement('button');
            trashButton.innerHTML = '<i class="fas fa-trash"></i>';
            trashButton.classList.add('trash-btn');
            todoDiv.appendChild(trashButton);

            // Append to list
            todoList.appendChild(todoDiv);
        });
        
    }
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // Find index of todo to be deleted and remove from localStorage via splice
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}