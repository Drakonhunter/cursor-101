import { useState, useEffect } from 'react';

const useTodos = () => {
  const [todoLists, setTodoLists] = useState([]);
  const [activeListId, setActiveListId] = useState(null);

  // Load todo lists from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('todoLists');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setTodoLists(parsed.lists || []);
        setActiveListId(parsed.activeListId || null);
      } catch (error) {
        console.error('Error loading todo lists from localStorage:', error);
        setTodoLists([]);
        setActiveListId(null);
      }
    }
  }, []);

  // Save todo lists to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todoLists', JSON.stringify({
      lists: todoLists,
      activeListId
    }));
  }, [todoLists, activeListId]);

  // Get the active list
  const activeList = todoLists.find(list => list.id === activeListId) || null;

  // List management functions
  const addList = (name) => {
    const newList = {
      id: Date.now(),
      name: name.trim(),
      todos: [],
      createdAt: new Date().toISOString()
    };
    setTodoLists(prev => [...prev, newList]);
    setActiveListId(newList.id);
  };

  const updateList = (id, name) => {
    setTodoLists(prev => 
      prev.map(list => 
        list.id === id ? { ...list, name: name.trim() } : list
      )
    );
  };

  const deleteList = (id) => {
    setTodoLists(prev => prev.filter(list => list.id !== id));
    if (activeListId === id) {
      const remainingLists = todoLists.filter(list => list.id !== id);
      setActiveListId(remainingLists.length > 0 ? remainingLists[0].id : null);
    }
  };

  const setActiveList = (id) => {
    setActiveListId(id);
  };

  // Todo management functions (for active list)
  const addTodo = (newTodo) => {
    if (!activeListId) return;
    
    setTodoLists(prev => 
      prev.map(list => 
        list.id === activeListId 
          ? { ...list, todos: [...list.todos, newTodo] }
          : list
      )
    );
  };

  const toggleTodo = (id) => {
    if (!activeListId) return;
    
    setTodoLists(prev => 
      prev.map(list => 
        list.id === activeListId 
          ? { 
              ...list, 
              todos: list.todos.map(todo => 
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
              )
            }
          : list
      )
    );
  };

  const deleteTodo = (id) => {
    if (!activeListId) return;
    
    setTodoLists(prev => 
      prev.map(list => 
        list.id === activeListId 
          ? { ...list, todos: list.todos.filter(todo => todo.id !== id) }
          : list
      )
    );
  };

  const importTodos = (importedTodos) => {
    if (!activeListId) return;
    
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
    
    setTodoLists(prev => 
      prev.map(list => 
        list.id === activeListId 
          ? { ...list, todos: validTodos }
          : list
      )
    );
  };

  const importTodoLists = (importedLists) => {
    // Validate and clean imported lists
    const validLists = importedLists.filter(list => 
      list && 
      typeof list === 'object' && 
      list.id && 
      list.name && 
      typeof list.name === 'string' &&
      Array.isArray(list.todos)
    );
    
    if (validLists.length === 0) {
      alert('No valid todo lists found in the imported file.');
      return;
    }
    
    setTodoLists(validLists);
    setActiveListId(validLists[0].id);
  };

  return {
    todoLists,
    activeList,
    activeListId,
    addList,
    updateList,
    deleteList,
    setActiveList,
    addTodo,
    toggleTodo,
    deleteTodo,
    importTodos,
    importTodoLists
  };
};

export default useTodos; 