import { useState, useEffect } from 'react';

const useTodos = () => {
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error('Error loading todos from localStorage:', error);
        setTodos([]);
      }
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const importTodos = (importedTodos) => {
    // Validate and clean imported todos
    const validTodos = importedTodos.filter(todo => 
      todo && 
      typeof todo === 'object' && 
      todo.id && 
      todo.text && 
      typeof todo.text === 'string'
    );
    
    if (validTodos.length === 0) {
      alert('No valid todos found in the imported file.');
      return;
    }
    
    setTodos(validTodos);
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    importTodos
  };
};

export default useTodos; 