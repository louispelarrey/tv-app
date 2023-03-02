import App from './app/App';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './app/context/User/UserContext';
import { SuspenseLoader } from './app/components/Suspense/SuspenseLoader';
import { ServiceProvider } from './app/context/Service/ServiceContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <SuspenseLoader>
        <UserProvider>
          <ServiceProvider>
            <App />
          </ServiceProvider>
        </UserProvider>
      </SuspenseLoader>
    </BrowserRouter>
  </StrictMode>
);
