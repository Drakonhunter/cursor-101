import styled, { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import TodoListManager from './components/TodoListManager';
import TodoForm from './components/TodoForm';
import TodoStats from './components/TodoStats';
import TodoList from './components/TodoList';
import TodoActions from './components/TodoActions';
import ThemeToggle from './components/ThemeToggle';
import useTodos from './hooks/useTodos';
import { useTheme } from './contexts/ThemeContext';

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
    background: ${props => props.$theme.background};
    min-height: 100vh;
    color: ${props => props.$theme.text};
    transition: background 0.3s ease, color 0.3s ease;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  padding-top: 40px;
  background: ${props => props.$theme.background};
  transition: background 0.3s ease;
`;

const MainContainer = styled.div`
  background: ${props => props.$theme.containerBg};
  border-radius: 8px;
  box-shadow: 0 8px 32px ${props => props.$theme.shadow};
  width: 100%;
  max-width: 1200px;
  min-height: 600px;
  border: 1px solid ${props => props.$theme.border};
  display: flex;
  overflow: hidden;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 100%;
    margin: 10px;
  }
`;

const Sidebar = styled.div`
  width: 280px;
  background: ${props => props.$theme.sidebarBg};
  border-right: 1px solid ${props => props.$theme.border};
  padding: 24px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid ${props => props.$theme.border};
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
  color: ${props => props.$theme.textMuted};
  font-style: normal;
  font-size: 0.9rem;
  background: ${props => props.$theme.sidebarBg};
  border-radius: 4px;
  border: 1px solid ${props => props.$theme.border};
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
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
    updateTodoComment,
    importTodos,
    importTodoLists
  } = useTodos();

  const { theme } = useTheme();

  return (
    <>
      <GlobalStyle $theme={theme} />
      <AppContainer $theme={theme}>
        <MainContainer $theme={theme}>
          <Sidebar $theme={theme}>
            <Header />
            <ThemeToggle />
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
                  onUpdateComment={updateTodoComment}
                />
              </>
            ) : (
              <EmptyState $theme={theme}>
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
