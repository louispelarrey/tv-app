import { createContext } from 'react';
import {ShowService, SeasonService} from '@tv-app/show/data-access';

const services = {
  ShowService: new ShowService(),
  SeasonService: new SeasonService()
};

/**
 * The context for the services
 *
 * usage:
 * const {
    services: {
      ExampleService,
      ...
    }
  } = useContext(ServiceContext);
 */
const ServiceContext = createContext({ services });

const { Provider } = ServiceContext;
const ServiceProvider = ({ children }: any) => {
  return <Provider value={{ services }}>{children}</Provider>;
};
export { ServiceContext, ServiceProvider }
