import path from 'path'
import StyleBundler from 'vite-plugin-vue-style-bundler' // 引入 vue-style-bundler'

function comp() {
  return {
    plugins: [
      StyleBundler({
        sassOptions: {}
      })
    ],
    build: {
      lib: {
        entry: path.resolve(__dirname, './src/components/index.ts'),
        name: 'vue-json-lonlyape',
        fileName: 'vue-json-lonlyape'
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      }
    }
  }
}

export default comp