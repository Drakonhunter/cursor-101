import TodoItem from './TodoItem';

const TodoList = ({ activeList, onToggle, onDelete }) => {
  if (!activeList) {
    return (
      <div className="empty-state">
        <p>Select or create a todo list to get started!</p>
      </div>
    );
  }

  if (activeList.todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos in "{activeList.name}" yet! Add one above to get started.</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {activeList.todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList; 