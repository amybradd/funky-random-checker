import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173, // Ensure the port matches your setup
        hmr: {
            protocol: 'ws', // Use WebSocket protocol
            host: 'localhost',
        },
    },
});
