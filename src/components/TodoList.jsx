import styled from 'styled-components';
import TodoItem from './TodoItem';

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  overflow-y: auto;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #808080;
  font-style: normal;
  font-size: 0.9rem;
  background: #333333;
  border-radius: 4px;
  border: 1px solid #404040;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TodoList = ({ activeList, onToggle, onDelete, onUpdateComment }) => {
  if (!activeList) {
    return (
      <EmptyState>
        <p>Select or create a todo list to get started!</p>
      </EmptyState>
    );
  }

  if (activeList.todos.length === 0) {
    return (
      <EmptyState>
        <p>No todos in "{activeList.name}" yet! Add one above to get started.</p>
      </EmptyState>
    );
  }

  return (
    <TodoListContainer>
      {activeList.todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdateComment={onUpdateComment}
        />
      ))}
    </TodoListContainer>
  );
};

export default TodoList; 