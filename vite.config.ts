import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// 根据环境变量动态设置 base 路径
const isGithubPages = process.env.GITHUB_PAGES === '1';
export default defineConfig({
  base: isGithubPages ? '/easytools/' : '/',
  plugins: [react()],
})
