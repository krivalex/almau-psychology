import { ConfigEnv, UserConfig, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import mkcert from 'vite-plugin-mkcert'

const baseConfig = {
  plugins: [vue(), mkcert()],
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  define: {
    __APP_MODE__: JSON.stringify('development'),
    __APP_ENV__: JSON.stringify('development'),
  },
  server: { https: true },
}

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const envFile = loadEnv(mode, process.cwd())
  baseConfig.define.__APP_MODE__ = JSON.stringify(mode)
  baseConfig.define.__APP_ENV__ = JSON.stringify(envFile.VITE_APP_BUILD_ENV)

  return {
    ...baseConfig,
  }
})
