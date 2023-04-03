import App from './app/App';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SuspenseLoader } from '@tv-app/ui';
import { UserProvider, ServiceProvider } from '@tv-app/utility';
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
