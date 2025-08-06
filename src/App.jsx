import styled, { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import TodoListManager from './components/TodoListManager';
import TodoForm from './components/TodoForm';
import TodoStats from './components/TodoStats';
import TodoList from './components/TodoList';
import TodoActions from './components/TodoActions';
import useTodos from './hooks/useTodos';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #1a1a1a;
    min-height: 100vh;
    color: #e0e0e0;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  padding-top: 40px;
  background: #1a1a1a;
`;

const MainContainer = styled.div`
  background: #2a2a2a;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 1200px;
  min-height: 600px;
  border: 1px solid #404040;
  display: flex;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 100%;
    margin: 10px;
  }
`;

const Sidebar = styled.div`
  width: 280px;
  background: #333333;
  border-right: 1px solid #404040;
  padding: 24px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #404040;
    padding: 16px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 32px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 20px;
  }
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

function App() {
  const { 
    todoLists, 
    activeList, 
    activeListId,
    addList, 
    updateList, 
    deleteList, 
    setActiveList,
    addTodo, 
    toggleTodo, 
    deleteTodo, 
    importTodos, 
    importTodoLists 
  } = useTodos();

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <MainContainer>
          <Sidebar>
            <Header />
            <TodoActions todoLists={todoLists} onImportTodoLists={importTodoLists} />
            <TodoListManager 
              todoLists={todoLists}
              activeListId={activeListId}
              onAddList={addList}
              onUpdateList={updateList}
              onDeleteList={deleteList}
              onSetActiveList={setActiveList}
            />
          </Sidebar>
          <MainContent>
            {activeList ? (
              <>
                <TodoForm onAddTodo={addTodo} />
                <TodoStats activeList={activeList} />
                <TodoList 
                  activeList={activeList}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              </>
            ) : (
              <EmptyState>
                <p>Select or create a todo list to get started!</p>
              </EmptyState>
            )}
          </MainContent>
        </MainContainer>
      </AppContainer>
    </>
  );
}

export default App;
