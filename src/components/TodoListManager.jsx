import { useState } from 'react';

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
    <div className="todo-list-manager">
      <div className="list-selector">
        <h3>Todo Lists</h3>
        <div className="list-tabs">
          {todoLists.map(list => (
            <div 
              key={list.id} 
              className={`list-tab ${list.id === activeListId ? 'active' : ''}`}
            >
              {editingId === list.id ? (
                <div className="edit-list">
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleEditSave(list.id)}
                    onBlur={() => handleEditSave(list.id)}
                    autoFocus
                    className="edit-list-input"
                  />
                  <button 
                    onClick={() => handleEditCancel()}
                    className="edit-cancel-button"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="list-tab-content">
                  <button
                    onClick={() => onSetActiveList(list.id)}
                    className="list-tab-button"
                  >
                    {list.name}
                  </button>
                  <div className="list-actions">
                    <button
                      onClick={() => handleEditStart(list)}
                      className="edit-button"
                      title="Edit list name"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteList(list.id)}
                      className="delete-list-button"
                      title="Delete list"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <form onSubmit={handleAddList} className="add-list-form">
          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="New list name..."
            className="add-list-input"
          />
          <button type="submit" className="add-list-button">
            +
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoListManager; 