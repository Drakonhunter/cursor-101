import { useRef } from 'react';
import styled from 'styled-components';

const ActionsContainer = styled.div`
  margin-bottom: 20px;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-bottom: 8px;
`;

const ActionButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
`;

const ExportButton = styled(ActionButton)`
  background: #00b894;
  color: white;

  &:hover:not(:disabled) {
    background: #00a085;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 184, 148, 0.3);
  }

  &:disabled {
    background: #505050;
    color: #808080;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ImportButton = styled(ActionButton)`
  background: #4a9eff;
  color: white;

  &:hover {
    background: #3a8eef;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(74, 158, 255, 0.3);
  }
`;

const ExportInfo = styled.div`
  text-align: center;
  color: #b0b0b0;
  font-size: 0.8rem;
`;

const HiddenInput = styled.input`
  display: none;
`;

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
    <ActionsContainer>
      <ActionButtons>
        <ImportButton onClick={handleImportClick}>
          📥 Import
        </ImportButton>
        <ExportButton 
          onClick={exportTodoLists} 
          disabled={!todoLists || todoLists.length === 0}
        >
          📤 Export
        </ExportButton>
      </ActionButtons>
      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={importTodoLists}
      />
      {todoLists && todoLists.length > 0 && (
        <ExportInfo>
          <small>Share all your todo lists by exporting and sending the file to others!</small>
        </ExportInfo>
      )}
    </ActionsContainer>
  );
};

export default TodoActions; 