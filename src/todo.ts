document.addEventListener('DOMContentLoaded', () => { //ensures the script runs after the DOM is fully loaded
    
    // Get references to DOM elements:
    const todoInput = document.getElementById('todoInput') as HTMLInputElement; // Input field for new to-dos
    const addTodoButton = document.getElementById('addTodoButton') as HTMLButtonElement; // Button to add new to-dos
    const todoList = document.getElementById('todoList') as HTMLUListElement; // Unordered list to display to-dos

    // Interface to define the shape of a to-do object
    interface Todo {
        text: string;
    }

    // Function to load to-dos from localStorage and display them; localStorage stores data as strings.
    function loadTodos(): void { //void in typescript is the absence of a return value(Explicit intent)
        const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]'); // retrieves the value associated with the key 'todos' from localStorage; converts the JSON string stored in localStorage back into a JavaScript object (because it must be an array of Todo objects!!)
        todos.forEach(todo => {
            createListItem(todo.text); // Create a list item for each to-do
        });
    }

    // Function to save the current list of to-dos to localStorage
    function saveTodos(): void {
        const todos: Todo[] = [];
        todoList.querySelectorAll('li').forEach(item => {
            todos.push({ text: item.textContent || '' }); // Add each list item's text to the to-dos array
        });
        localStorage.setItem('todos', JSON.stringify(todos)); // Save the to-dos array to localStorage
    }

    // Function to create a new list item, add event listeners, and append it to the list
    function createListItem(todoText: string): void {
        const listItem = document.createElement('li'); // Create a new list item element
        listItem.textContent = todoText; // Set the text of the list item

        // Add click event listener to cross out and remove the item
        listItem.addEventListener('click', () => {
            listItem.classList.add('crossed'); //Adds the 'crossed' class to the listItem element; classList provides methods like add, remove, toggle, and contains which make it easy to manipulate classes
            setTimeout(() => {
                todoList.removeChild(listItem); // Remove the item after a delay
                saveTodos(); // Save the updated list to localStorage
            }, 1000);
        });

        todoList.appendChild(listItem); // Append the list item to the list
    }

    // Add event listener to the button to create a new to-do when clicked
    addTodoButton.addEventListener('click', () => {
        const todoText = todoInput.value.trim(); // Get the trimmed value of the input field
        if (todoText !== '') { // Check if the input is not empty
            createListItem(todoText); // Create a new list item
            todoInput.value = ''; // Clear the input field
            saveTodos(); // Save the updated list to localStorage
        }
    });

    // Add event listener to the input field to create a new to-do when the Enter key is pressed
    todoInput.addEventListener('keypress', (event: KeyboardEvent) => {
        if (event.key === 'Enter') { // Check if the pressed key is Enter
            addTodoButton.click(); // Trigger the click event on the add button
        }
    });

    // Load existing to-dos from localStorage when the page is loaded
    loadTodos();
});
