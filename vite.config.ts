// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // This sandbox is E2B-based, not a "Lovable sandbox" (no LOVABLE_SANDBOX / DEV_SERVER__PROJECT_PATH
  // env vars), so the package's own sandbox auto-detection never relaxes Vite's host checking.
  // Allow all hosts here so the sandbox's public proxy hostname isn't rejected with a 403.
  vite: {
    server: {
      allowedHosts: true,
    },
  },
});
