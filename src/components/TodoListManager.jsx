import { useState } from 'react';
import styled from 'styled-components';

const ManagerContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ListSelector = styled.div``;

const AddListForm = styled.form`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

const AddListInput = styled.input`
  flex: 1;
  background: #2a2a2a;
  border: 1px solid #505050;
  border-radius: 4px;
  padding: 8px 12px;
  color: #e0e0e0;
  font-size: 0.9rem;
  outline: none;

  &:focus {
    border-color: #4a9eff;
  }
`;

const AddListButton = styled.button`
  background: #00b894;
  border: none;
  color: white;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover {
    background: #00a085;
    transform: translateY(-1px);
  }
`;

const ListTabs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  overflow-y: auto;

  @media (max-width: 768px) {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
  }
`;

const ListTab = styled.div`
  background: #2a2a2a;
  border: 1px solid #404040;
  border-radius: 4px;
  transition: all 0.2s ease;

  &.active {
    border-color: #4a9eff;
    background: #1a1a1a;
  }

  @media (max-width: 768px) {
    min-width: 150px;
  }
`;

const ListTabContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
`;

const ListTabButton = styled.button`
  background: none;
  border: none;
  color: #e0e0e0;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  text-align: left;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${ListTab}.active & {
    color: #4a9eff;
  }
`;

const ListActions = styled.div`
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s ease;

  ${ListTab}:hover & {
    opacity: 1;
  }
`;

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  font-size: 0.8rem;
  opacity: 0.7;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

const DeleteListButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  font-size: 0.8rem;
  opacity: 0.7;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

const EditList = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
`;

const EditListInput = styled.input`
  flex: 1;
  background: #1a1a1a;
  border: 1px solid #4a9eff;
  border-radius: 3px;
  padding: 4px 8px;
  color: #e0e0e0;
  font-size: 0.9rem;
  outline: none;
`;

const EditCancelButton = styled.button`
  background: #ff4757;
  border: none;
  color: white;
  border-radius: 3px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 0.8rem;
`;

const TodoListManager = ({ 
  todoLists, 
  activeListId, 
  onAddList, 
  onUpdateList, 
  onDeleteList, 
  onSetActiveList 
}) => {
  const [newListName, setNewListName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  const handleAddList = (e) => {
    e.preventDefault();
    if (newListName.trim()) {
      onAddList(newListName);
      setNewListName('');
    }
  };

  const handleEditStart = (list) => {
    setEditingId(list.id);
    setEditingName(list.name);
  };

  const handleEditSave = (id) => {
    if (editingName.trim()) {
      onUpdateList(id, editingName);
      setEditingId(null);
      setEditingName('');
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingName('');
  };

  const handleDeleteList = (id) => {
    if (window.confirm('Are you sure you want to delete this list? This action cannot be undone.')) {
      onDeleteList(id);
    }
  };

  return (
    <ManagerContainer>
      <ListSelector>
        <AddListForm onSubmit={handleAddList}>
          <AddListInput
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="New list name..."
          />
          <AddListButton type="submit">
            +
          </AddListButton>
        </AddListForm>

        <ListTabs>
          {todoLists.map(list => (
            <ListTab 
              key={list.id} 
              className={list.id === activeListId ? 'active' : ''}
            >
              {editingId === list.id ? (
                <EditList>
                  <EditListInput
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleEditSave(list.id)}
                    onBlur={() => handleEditSave(list.id)}
                    autoFocus
                  />
                  <EditCancelButton onClick={() => handleEditCancel()}>
                    ✕
                  </EditCancelButton>
                </EditList>
              ) : (
                <ListTabContent>
                  <ListTabButton onClick={() => onSetActiveList(list.id)}>
                    {list.name}
                  </ListTabButton>
                  <ListActions>
                    <EditButton
                      onClick={() => handleEditStart(list)}
                      title="Edit list name"
                    >
                      ✏️
                    </EditButton>
                    <DeleteListButton
                      onClick={() => handleDeleteList(list.id)}
                      title="Delete list"
                    >
                      🗑️
                    </DeleteListButton>
                  </ListActions>
                </ListTabContent>
              )}
            </ListTab>
          ))}
        </ListTabs>
      </ListSelector>
    </ManagerContainer>
  );
};

export default TodoListManager; 