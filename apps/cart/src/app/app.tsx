import styled from 'styled-components';
import NxWelcome from './nx-welcome';

import {get} from 'lodash';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <NxWelcome title="cart" />
    </StyledApp>
  );
}

export default App;
