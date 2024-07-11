"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addTodoButton = document.getElementById('addTodoButton');
    const todoList = document.getElementById('todoList');
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos') || '[]');
        todos.forEach(todo => {
            createListItem(todo.text);
        });
    }
    function saveTodos() {
        const todos = [];
        todoList.querySelectorAll('li').forEach(item => {
            todos.push({ text: item.textContent || '' });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    function createListItem(todoText) {
        const listItem = document.createElement('li');
        listItem.textContent = todoText;
        listItem.addEventListener('click', () => {
            listItem.classList.add('crossed');
            setTimeout(() => {
                todoList.removeChild(listItem);
                saveTodos();
            }, 1000);
        });
        todoList.appendChild(listItem);
    }
    addTodoButton.addEventListener('click', () => {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            createListItem(todoText);
            todoInput.value = '';
            saveTodos();
        }
    });
    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTodoButton.click();
        }
    });
    loadTodos();
});
