import { useState } from 'react'
import './App.css'

const intitialTodos = localStorage.getItem('todos');

function App() {
  const [todos, setTodos] = useState(JSON.parse(intitialTodos) || [])
  const [inputValue, setInputValue] = useState('')

  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        priority: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
      }
      var newTodos = [...todos, newTodo];
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
      setInputValue('');
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>Task Manager</h1>
          <p className="subtitle">Organize your workflow efficiently</p>
        </header>

        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What needs to be done?"
            className="todo-input"
          />
          <button type="submit" className="add-button">
            Add Todo
          </button>
        </form>

        {totalCount > 0 && (
          <div className="stats">
            <span>{completedCount} of {totalCount} completed</span>
            {completedCount > 0 && (
              <span className="progress">
                {Math.round((completedCount / totalCount) * 100)}% done
              </span>
            )}
          </div>
        )}

        <div className="todo-list">
          {todos.length === 0 ? (
            <div className="empty-state">
              <p>No todos yet! Add one above to get started.</p>
            </div>
          ) : (
            todos.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`checkbox ${todo.completed ? 'checked' : ''}`}
                >
                  {todo.completed && <span>✓</span>}
                </button>
                <span className="todo-text">{todo.text}</span>
                <div className="status-tags">
                  {todo.completed ? (
                    <span className="status-tag completed-tag">COMPLETED</span>
                  ) : (
                    <span className={`status-tag priority-tag ${todo.priority || 'low'}`}>
                      {(todo.priority || 'low').toUpperCase()}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-button"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App
