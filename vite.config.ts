import path from "node:path";
import { defineConfig } from "vite";
import copy from "rollup-plugin-copy"

const config = defineConfig(() => {
  return {
    root: path.resolve("src"),
    build: {
      outDir: path.resolve("dist"),
      emptyOutDir: true,
      rollupOptions: {
        plugins: [
          copy({
            targets: [
              { src: "src/assets/*", dest: "dist/assets" },
            ],
            // Copy after all files are written. https://rollupjs.org/guide/en/#writebundle
            hook: "writeBundle",
          }),
        ],
      },
    },
    server: {
      port: 4200,
    }
  }
});

export default config;
