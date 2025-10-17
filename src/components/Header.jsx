import styled from 'styled-components';

const HeaderContainer = styled.header`
  text-align: center;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #404040;
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 8px;
  letter-spacing: -0.025em;
`;

const Subtitle = styled.p`
  color: #b0b0b0;
  font-size: 0.95rem;
  font-weight: 400;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>Task Manager</Title>
      <Subtitle>Organize your workflow efficiently</Subtitle>
    </HeaderContainer>
  );
};

export default Header; 