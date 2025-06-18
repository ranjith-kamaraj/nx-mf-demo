import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'shop',
  remotes: ['products', 'cart', 'checkout'],

  shared: (libraryName, sharedConfig) => {
    if (libraryName === 'react') {
      return { ...sharedConfig, singleton: true, requiredVersion: '^19.0.0' };
    }
    if (libraryName === 'react-dom') {
      return { ...sharedConfig, singleton: true, requiredVersion: '^18.2.0' };
    }
    return sharedConfig;
  }
  
};

export default config;
