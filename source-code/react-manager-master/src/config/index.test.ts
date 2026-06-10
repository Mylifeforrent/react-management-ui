import { describe, expect, it } from 'vitest'
import env from './index'

describe('env config', () => {
  it('uses Vite environment variables for local mock mode', () => {
    expect(env.baseApi).toBe('/api')
    expect(env.mock).toBe(true)
    expect(env.mockApi).toBe('/mock')
  })
})
