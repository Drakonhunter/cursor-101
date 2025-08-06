import styled from 'styled-components';

const TodoItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #333333;
  border-radius: 4px;
  transition: all 0.2s ease;
  border: 1px solid #404040;

  &:hover {
    background: #3a3a3a;
    border-color: #505050;
  }

  &.completed {
    opacity: 0.7;
    background: #2a2a2a;
  }
`;

const Checkbox = styled.button`
  width: 18px;
  height: 18px;
  border: 2px solid #505050;
  border-radius: 3px;
  background: #2a2a2a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
  font-size: 0.7rem;
  color: transparent;

  &.checked {
    background: #4a9eff;
    border-color: #4a9eff;
    color: white;
  }

  &:hover {
    border-color: #4a9eff;
  }
`;

const TodoText = styled.span`
  flex: 1;
  font-size: 0.9rem;
  color: #e0e0e0;
  transition: all 0.2s ease;
  font-weight: 400;

  ${TodoItemContainer}.completed & {
    text-decoration: line-through;
    color: #808080;
  }
`;

const StatusTags = styled.div`
  display: flex;
  gap: 8px;
  margin-right: 8px;
`;

const StatusTag = styled.span`
  padding: 4px 8px;
  border-radius: 3px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: white;
  white-space: nowrap;
  background: #00b894;
`;

const DeleteButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background: #ff4757;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  opacity: 0.7;

  &:hover {
    background: #ff3742;
    opacity: 1;
    transform: scale(1.05);
  }
`;

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <TodoItemContainer className={todo.completed ? 'completed' : ''}>
      <Checkbox
        onClick={() => onToggle(todo.id)}
        className={todo.completed ? 'checked' : ''}
      >
        {todo.completed && <span>✓</span>}
      </Checkbox>
      <TodoText>{todo.text}</TodoText>
      <StatusTags>
        {todo.completed && (
          <StatusTag>COMPLETED</StatusTag>
        )}
      </StatusTags>
      <DeleteButton
        onClick={() => onDelete(todo.id)}
      >
        ×
      </DeleteButton>
    </TodoItemContainer>
  );
};

export default TodoItem; 