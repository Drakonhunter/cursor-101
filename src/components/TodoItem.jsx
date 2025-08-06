const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <button
        onClick={() => onToggle(todo.id)}
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
        onClick={() => onDelete(todo.id)}
        className="delete-button"
      >
        ×
      </button>
    </div>
  );
};

export default TodoItem; 