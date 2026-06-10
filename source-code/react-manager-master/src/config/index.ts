/**
 * 环境配置封装
 */

export type AppEnv = 'dev' | 'stg' | 'prd'

export interface AppConfig {
  env: AppEnv
  baseApi: string
  uploadApi: string
  cdn: string
  mock: boolean
  mockApi: string
}

const modeToEnv = (mode: string): AppEnv => {
  if (mode === 'development') return 'dev'
  if (mode === 'test') return 'dev'
  if (mode === 'stag') return 'stg'
  return 'prd'
}

const getBoolean = (value?: string) => value === 'true'
const localMockDefault = import.meta.env.DEV || import.meta.env.MODE === 'test'

const config: AppConfig = {
  env: modeToEnv(import.meta.env.MODE),
  baseApi: import.meta.env.VITE_BASE_API || '/api',
  uploadApi: import.meta.env.VITE_UPLOAD_API || '',
  cdn: import.meta.env.VITE_CDN || '',
  mock: import.meta.env.VITE_MOCK ? getBoolean(import.meta.env.VITE_MOCK) : localMockDefault,
  mockApi: import.meta.env.VITE_MOCK_API || '/mock'
}

export default config
