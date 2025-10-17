import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const ToggleButton = styled.button`
  background: ${props => props.$isDark ? '#4a9eff' : '#ffd93d'};
  border: none;
  color: ${props => props.$isDark ? 'white' : '#2a2a2a'};
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 20px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${props => props.$isDark ? 'rgba(74, 158, 255, 0.3)' : 'rgba(255, 217, 61, 0.3)'};
  }
`;

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <ToggleButton onClick={toggleTheme} $isDark={isDark}>
      {isDark ? '☀️' : '🌙'} {isDark ? 'Light Mode' : 'Dark Mode'}
    </ToggleButton>
  );
}

export default ThemeToggle;
