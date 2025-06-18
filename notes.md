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





