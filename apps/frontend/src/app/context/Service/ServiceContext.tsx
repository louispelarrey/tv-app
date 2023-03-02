import { createContext, useState } from 'react';
import SeasonService from '../../services/season/SeasonService';
import ShowService from '../../services/show/ShowService';


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
