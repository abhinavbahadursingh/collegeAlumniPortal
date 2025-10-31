/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string
  readonly VITE_CLERK_PUBLISHABLE_KEY: string
  readonly CLERK_SECRET_KEY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}