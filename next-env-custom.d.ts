// Extend the Next.js types to fix the PageProps issue
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    readonly DATABASE_URL: string
  }
}

// Override Next.js page props to fix the type error
declare module 'next' {
  export interface PageProps {
    params?: Record<string, string>
    searchParams?: Record<string, string | string[] | undefined>
  }
} 