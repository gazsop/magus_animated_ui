import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import viteCompression from "vite-plugin-compression";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      deleteOriginFile: false,
    }),
  ],
  server: {
    fs: {
      allow: ["../shared", "./src", "./node_modules", "./dist", "./public"],
    },
    host: "192.168.0.202",
    port: 5173,
    open: true,
  },
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
      "@appTypes": path.resolve(__dirname, "../shared"),
      //  "@css": path.resolve(__dirname, "./src/assets/css"),
      //  "@components": path.resolve(__dirname, "./src/components"),
      //  "@images": path.resolve(__dirname, "./src/assets/imgs"),
      //  "@constants": path.resolve(__dirname, "./src/assets/constants"),
      //  "@config": path.resolve(__dirname, "./src/assets/config"),
    },
  },
  build: {
    cssMinify: true,
    outDir: "../dist/client",
  },
});
//server: {
//	host: "192.168.0.190",
//	//host: "localhost",
//	port: 5173,
//	open: true,
//},
