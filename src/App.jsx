import './App.css';
import Header from './components/Header';
import TodoListManager from './components/TodoListManager';
import TodoForm from './components/TodoForm';
import TodoStats from './components/TodoStats';
import TodoList from './components/TodoList';
import TodoActions from './components/TodoActions';
import useTodos from './hooks/useTodos';

function App() {
  const { 
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
  } = useTodos();

  return (
    <div className="app">
      <div className="container">
        <div className="sidebar">
          <Header />
          <TodoActions todoLists={todoLists} onImportTodoLists={importTodoLists} />
          <TodoListManager 
            todoLists={todoLists}
            activeListId={activeListId}
            onAddList={addList}
            onUpdateList={updateList}
            onDeleteList={deleteList}
            onSetActiveList={setActiveList}
          />
        </div>
        <div className="main-content">
          {activeList ? (
            <>
              <TodoForm onAddTodo={addTodo} />
              <TodoStats activeList={activeList} />
              <TodoList 
                activeList={activeList}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            </>
          ) : (
            <div className="empty-state">
              <p>Select or create a todo list to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
