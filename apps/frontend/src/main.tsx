import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './app/context/UserContext';

import App from './app/App';
import { SuspenseLoader } from './app/Suspense/SuspenseLoader';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <SuspenseLoader>
        <UserProvider>
          <App />
        </UserProvider>
      </SuspenseLoader>
    </BrowserRouter>
  </StrictMode>
);
