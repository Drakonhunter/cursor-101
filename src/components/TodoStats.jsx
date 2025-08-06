const TodoStats = ({ activeList }) => {
  if (!activeList) return null;
  
  const completedCount = activeList.todos.filter(todo => todo.completed).length;
  const totalCount = activeList.todos.length;

  if (totalCount === 0) return null;

  return (
    <div className="stats">
      <span>{completedCount} of {totalCount} completed</span>
      {completedCount > 0 && (
        <span className="progress">
          {Math.round((completedCount / totalCount) * 100)}% done
        </span>
      )}
    </div>
  );
};

export default TodoStats; 