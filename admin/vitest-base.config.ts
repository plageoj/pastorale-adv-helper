import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    {
      // Angular CLI merges the root (Node) project's `resolve.conditions` into the
      // browser project, so packages such as Firebase resolve to their Node builds.
      name: 'browser-resolve-conditions',
      enforce: 'post',
      config(config) {
        if (!config.test?.browser?.enabled) return;
        config.resolve ??= {};
        config.resolve.conditions = config.resolve.conditions?.filter(
          (condition) => condition !== 'node'
        );
      },
    },
  ],
  test: {
    browser: {
      // Firebase API key only accepts requests from the referer used by Karma.
      api: { port: 9876, strictPort: true },
    },
  },
});
