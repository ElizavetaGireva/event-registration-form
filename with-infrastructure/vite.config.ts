import { defineConfig } from 'vite'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    root: 'src',
    server: {
        port: 7777,
        open: true,
        strictPort: true
    }
})
