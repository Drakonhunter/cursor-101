import { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  padding: 20px;
  background: #333333;
  border-radius: 6px;
  border: 1px solid #404040;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 16px;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #505050;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  outline: none;
  background: #2a2a2a;
  color: #e0e0e0;

  &::placeholder {
    color: #808080;
  }

  &:focus {
    border-color: #4a9eff;
    box-shadow: 0 0 0 2px rgba(74, 158, 255, 0.2);
    background: #2a2a2a;
  }
`;

const AddButton = styled.button`
  padding: 12px 20px;
  background: #4a9eff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #3a8eef;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(49, 130, 206, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      onAddTodo(newTodo);
      setInputValue('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="What needs to be done?"
      />
      <AddButton type="submit">
        Add Todo
      </AddButton>
    </Form>
  );
};

export default TodoForm; 