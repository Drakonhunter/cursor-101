import styled from 'styled-components';

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #333333;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 0.85rem;
  color: #b0b0b0;
  border: 1px solid #404040;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 6px;
    text-align: center;
  }
`;

const Progress = styled.span`
  color: #4a9eff;
  font-weight: 500;
`;

const TodoStats = ({ activeList }) => {
  if (!activeList) return null;
  
  const completedCount = activeList.todos.filter(todo => todo.completed).length;
  const totalCount = activeList.todos.length;

  if (totalCount === 0) return null;

  return (
    <StatsContainer>
      <span>{completedCount} of {totalCount} completed</span>
      {completedCount > 0 && (
        <Progress>
          {Math.round((completedCount / totalCount) * 100)}% done
        </Progress>
      )}
    </StatsContainer>
  );
};

export default TodoStats; 