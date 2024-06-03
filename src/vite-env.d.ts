/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'primevue/toasteventbus' {
  import { EventBus } from 'primevue/utils'
  const toasteventbus = EventBus()
  export default toasteventbus
}
