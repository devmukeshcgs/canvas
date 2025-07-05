import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: 'dist',
        minify: 'terser', // Now works since terser is installed
        sourcemap: false, // Disable sourcemaps in production
        terserOptions: {
            compress: {
                drop_console: true, // Remove console.log in production
                drop_debugger: true, // Remove debugger
            },
            format: {
                comments: false, // Remove comments
            },
        },
        rollupOptions: {
            output: {
                chunkFileNames: 'js/[name]-[hash].js',
                entryFileNames: 'js/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash][extname]',
            },
        },
    },
});