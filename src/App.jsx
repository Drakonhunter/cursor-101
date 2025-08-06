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
        {activeList && (
          <>
            <TodoForm onAddTodo={addTodo} />
            <TodoStats activeList={activeList} />
          </>
        )}
        <TodoList 
          activeList={activeList}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;
