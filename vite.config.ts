import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// 根据环境变量动态设置 base 路径
const isGithubPages = process.env.GITHUB_PAGES === '1';
export default defineConfig({
  base: isGithubPages ? '/easytools/' : '/',
  plugins: [react()],
  server: {
    fs: {
      allow: ['..']
    }
  },
  optimizeDeps: {
    exclude: ['@astral-sh/ruff-wasm-web']
  },
  // 确保 WASM 文件被正确处理
  assetsInclude: ['**/*.wasm']
})
