import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import deepmerge from 'deepmerge'

import compConfig from './vite.comp.config'

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  let config = {
    plugins: [
      vue()
    ],
  }

  if (mode === 'comp'){
    config = deepmerge(
      config,
      compConfig()
    )
  }

  return config
})
