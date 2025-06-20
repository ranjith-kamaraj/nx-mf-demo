import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'cart',
  exposes: {
    './Module': './src/remote-entry.ts',
  },

  shared: (libraryName, sharedConfig) => {
    if (libraryName === 'react') {
      return { ...sharedConfig, singleton: true, requiredVersion: '^19.0.0' };
    }
    if (libraryName === 'react-dom') {
      return { ...sharedConfig, singleton: true, requiredVersion: '^19.0.0' };
    }
    /* Not sharing with other pakages */
    if (libraryName === 'lodash') return false;
    return sharedConfig;
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
