import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), svgr()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@components': path.resolve(__dirname, './src/components'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@layout': path.resolve(__dirname, './src/layout'),
			'@routes': path.resolve(__dirname, './src/routes'),
		},
	},
});
