import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
          markdown: ["react-markdown", "remark-gfm", "rehype-highlight", "rehype-slug"],
          // mermaid is dynamic-imported so it auto-splits
        },
      },
    },
  },
});
