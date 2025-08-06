import { useRef } from 'react';

const TodoActions = ({ todoLists, onImportTodoLists }) => {
  const fileInputRef = useRef(null);

  const exportTodoLists = () => {
    if (!todoLists || todoLists.length === 0) return;
    
    const dataStr = JSON.stringify(todoLists, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `todo-lists-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importTodoLists = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedLists = JSON.parse(e.target.result);
        if (Array.isArray(importedLists)) {
          onImportTodoLists(importedLists);
        } else {
          alert('Invalid file format. Please select a valid todo lists file.');
        }
      } catch (error) {
        alert('Error reading file. Please make sure it\'s a valid JSON file.');
      }
    };
    reader.readAsText(file);
    
    // Reset the input so the same file can be selected again
    event.target.value = '';
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="todo-actions">
      <div className="action-buttons">
        <button 
          onClick={exportTodoLists} 
          className="action-button export-button"
          disabled={!todoLists || todoLists.length === 0}
        >
          📤 Export All Lists
        </button>
        <button 
          onClick={handleImportClick} 
          className="action-button import-button"
        >
          📥 Import All Lists
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={importTodoLists}
        style={{ display: 'none' }}
      />
      {todoLists && todoLists.length > 0 && (
        <div className="export-info">
          <small>Share all your todo lists by exporting and sending the file to others!</small>
        </div>
      )}
    </div>
  );
};

export default TodoActions; 