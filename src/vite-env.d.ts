// vite-env.d.ts
interface ImportMetaEnv {
  readonly VITE_BASE_API: string;
  // 更多变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
