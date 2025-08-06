import { useRef } from 'react';

const TodoActions = ({ todos, onImportTodos }) => {
  const fileInputRef = useRef(null);

  const exportTodos = () => {
    const dataStr = JSON.stringify(todos, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `todo-list-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importTodos = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTodos = JSON.parse(e.target.result);
        if (Array.isArray(importedTodos)) {
          onImportTodos(importedTodos);
        } else {
          alert('Invalid file format. Please select a valid todo list file.');
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
          onClick={exportTodos} 
          className="action-button export-button"
          disabled={todos.length === 0}
        >
          📤 Export Todos
        </button>
        <button 
          onClick={handleImportClick} 
          className="action-button import-button"
        >
          📥 Import Todos
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={importTodos}
        style={{ display: 'none' }}
      />
      {todos.length > 0 && (
        <div className="export-info">
          <small>Share your todo list by exporting and sending the file to others!</small>
        </div>
      )}
    </div>
  );
};

export default TodoActions; 