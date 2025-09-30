/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TELEGRAM_SERVER_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
