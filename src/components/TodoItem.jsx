import { useState, useEffect, useRef } from 'react';
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
  position: relative;

  &:hover {
    background: #3a3a3a;
    border-color: #505050;
  }

  &.completed {
    opacity: 0.7;
    background: #2a2a2a;
  }
`;

const CommentIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  font-size: 1rem;
  opacity: ${props => props.hasComment ? 0.8 : 0.4};
  transition: all 0.2s ease;
  color: ${props => props.hasComment ? '#4a9eff' : '#808080'};

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
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

const CommentPopup = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #2a2a2a;
  border: 1px solid #404040;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 10;
  margin-top: 4px;
  padding: 12px;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.2s ease;
`;



const CommentInput = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #505050;
  border-radius: 4px;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  outline: none;
  background: #333333;
  color: #e0e0e0;
  resize: vertical;
  min-height: 60px;
  font-family: inherit;
  margin-bottom: 8px;

  &::placeholder {
    color: #808080;
  }

  &:focus {
    border-color: #4a9eff;
    box-shadow: 0 0 0 2px rgba(74, 158, 255, 0.2);
    background: #333333;
  }
`;

const CommentActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const CommentButton = styled.button`
  padding: 4px 8px;
  border: none;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.variant === 'save' ? '#00b894' : props.variant === 'cancel' ? '#ff4757' : '#4a9eff'};
  color: white;

  &:hover {
    background: ${props => props.variant === 'save' ? '#00a085' : props.variant === 'cancel' ? '#ff3742' : '#3a8eef'};
    transform: translateY(-1px);
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

const TodoItem = ({ todo, onToggle, onDelete, onUpdateComment }) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentValue, setCommentValue] = useState(todo.comment || '');
  const containerRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsCommentOpen(false);
        setCommentValue(todo.comment || '');
      }
    };

    if (isCommentOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCommentOpen, todo.comment]);

  const handleCommentSave = () => {
    onUpdateComment(todo.id, commentValue);
    setIsCommentOpen(false);
  };

  const handleCommentToggle = () => {
    setIsCommentOpen(!isCommentOpen);
    if (!isCommentOpen) {
      setCommentValue(todo.comment || '');
    }
  };

  return (
    <TodoItemContainer ref={containerRef} className={todo.completed ? 'completed' : ''}>
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
      <CommentIcon
        onClick={handleCommentToggle}
        hasComment={!!todo.comment}
        title={todo.comment ? 'View/Edit comment' : 'Add comment'}
      >
        💭
      </CommentIcon>
      <DeleteButton
        onClick={() => onDelete(todo.id)}
      >
        ×
      </DeleteButton>
      
             <CommentPopup isOpen={isCommentOpen}>
         <CommentInput
           value={commentValue}
           onChange={(e) => setCommentValue(e.target.value)}
           placeholder="Add a comment or reminder..."
           autoFocus
         />
         <CommentActions>
           <CommentButton variant="save" onClick={handleCommentSave}>
             Save
           </CommentButton>
         </CommentActions>
       </CommentPopup>
    </TodoItemContainer>
  );
};

export default TodoItem; 