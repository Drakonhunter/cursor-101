import './App.css';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoStats from './components/TodoStats';
import TodoList from './components/TodoList';
import TodoActions from './components/TodoActions';
import useTodos from './hooks/useTodos';

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, importTodos } = useTodos();

  return (
    <div className="app">
      <div className="container">
        <Header />
        <TodoForm onAddTodo={addTodo} />
        <TodoStats todos={todos} />
        <TodoActions todos={todos} onImportTodos={importTodos} />
        <TodoList 
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;
