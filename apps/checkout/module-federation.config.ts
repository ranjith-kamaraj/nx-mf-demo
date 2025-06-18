import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'checkout',
  exposes: {
    './Module': './src/remote-entry.ts',
  },

  shared: (libraryName, sharedConfig) => {
    if (libraryName === 'react') {
      return { ...sharedConfig, singleton: true, requiredVersion: '^19.0.0' };
    }
    // if (libraryName === 'react-dom') {
    //   return { ...sharedConfig, singleton: true, requiredVersion: '^18.2.0' };
    // }
    return sharedConfig;
  }
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
