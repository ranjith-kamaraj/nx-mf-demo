#!/bin/bash

# --------------------------------------------

# 1. Create Nx Workspace with Module Federation (React Example)

# --------------------------------------------

npx create-nx-workspace@latest nx-mf-demo --preset=react --appName=host --style=css --nxCloud=false --no-interactive

cd nx-mf-demo

# --------------------------------------------

# 2. Add Host and Remotes

# --------------------------------------------

nx g @nx/react:host host --remotes=cart,products,checkout

# --------------------------------------------

# 3. Run Apps Individually or Host

# --------------------------------------------

# Serve a remote app individually:

nx serve cart

# Serve the host app (loads remotes if configured):

nx serve host

# Serve with custom port (if needed):

nx serve cart --port=4300

# --------------------------------------------

# 4. Sharing and Not Sharing Dependencies (Module Federation Config)

# --------------------------------------------

# In apps/cart/module-federation.config.ts, for example:

# A. Share lodash as singleton:

: '
shared: (lib, config) =>
lib === "lodash"
? { ...config, singleton: true, requiredVersion: "^4.17.21" }
: config,
'

# B. Do NOT share lodash (bundle separately in this remote):

: '
shared: (lib, config) => lib === "lodash" ? false : config,
'

# C. Share lodash from only one remote (e.g., cart), opt out everywhere else:

: '

# In cart/module-federation.config.ts

shared: (lib, config) =>
lib === "lodash"
? { ...config, singleton: true, requiredVersion: "^4.17.21" }
: config,

# In other apps

shared: (lib, config) => lib === "lodash" ? false : config,
'

# --------------------------------------------

# 5. Library Creation and Import Logic

# --------------------------------------------

# Create a shared UI library:

nx g @nx/react:library shared-ui

# Create a shared state library:

nx g @nx/react:library shared-state

# Example import in a remote app (e.g., cart/src/app/app.tsx):

: '
import { MyComponent } from "@nx-mf-demo/shared-ui";
import { useSharedState } from "@nx-mf-demo/shared-state";
import { get } from "lodash";

export function CartPage() {
const state = useSharedState();
return <MyComponent />;
}
'

# --------------------------------------------

# 6. Build Apps

# --------------------------------------------

nx build host
nx build cart
nx build products
nx build checkout

# --------------------------------------------

# 7. Move or Remove a Library (optional)

# --------------------------------------------

# Move a library:

nx g move --project shared-ui shared/ui

# Remove a library:

nx g remove shared-ui

# --------------------------------------------

# End of Nx Module Federation Workflow Summary

# --------------------------------------------

echo "Nx Module Federation workflow commands and config summary complete!"

Import logic: check the paths in tsconfig.base.json file
Libs:
"@nx-mf-demo/shared-state": ["libs/shared-state/src/index.ts"],
"@nx-mf-demo/shared-ui": ["libs/shared-ui/src/index.ts"],

import { someStateHook } from '@nx-mf-demo/shared-state';
import { SharedButton } from '@nx-mf-demo/shared-ui';

Importing Remote Entry Modules:
"cart/Module": ["apps/cart/src/remote-entry.ts"],
"checkout/Module": ["apps/checkout/src/remote-entry.ts"],
"products/Module": ["apps/products/src/remote-entry.ts"]

const CartModule = await import('cart/Module');

Default Readme:

# NxMfDemo

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/getting-started/intro#learn-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Finish your CI setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/HPDG666aYx)

## Run tasks

To run tasks with Nx use:

```sh
npx nx <target> <project-name>
```

For example:

```sh
npx nx build myproject
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

To install a new plugin you can use the `nx add` command. Here's an example of adding the React plugin:

```sh
npx nx add @nx/react
```

Use the plugin's generator to create new projects. For example, to create a new React app or library:

```sh
# Generate an app
npx nx g @nx/react:app demo

# Generate a library
npx nx g @nx/react:lib some-lib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/intro#learn-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
