import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    sourcemap: true,
    minify: true,
    lib: {
      entry: resolve(__dirname, "src/vue/index.ts"),
      name: "index",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["vue", "@graffiti-garden/wrapper-vue"],
    },
    outDir: resolve(__dirname, "dist/vue"),
  },
});
