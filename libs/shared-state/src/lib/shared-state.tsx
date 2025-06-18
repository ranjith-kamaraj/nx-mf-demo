import styled from 'styled-components';

const StyledSharedState = styled.div`
  color: pink;
`;
export function SharedState() {
  return (
    <StyledSharedState>
      <h1>Welcome to SharedState!</h1>
    </StyledSharedState>
  );
}

export default SharedState;
