import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';

import { ReduxProvider } from '@nx-mf-demo/shared-state';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
    <ReduxProvider>
      <App />
      </ReduxProvider>
    </BrowserRouter>
  </StrictMode>
);
