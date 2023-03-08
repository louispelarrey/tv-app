import App from './app/App';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './app/context/User/UserContext';
import { SuspenseLoader } from './app/components/Suspense/SuspenseLoader';
import { ServiceProvider } from './app/context/Service/ServiceContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <BrowserRouter>
      <SuspenseLoader>
        <UserProvider>
          <ServiceProvider>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </ServiceProvider>
        </UserProvider>
      </SuspenseLoader>
    </BrowserRouter>
  </StrictMode>
);
