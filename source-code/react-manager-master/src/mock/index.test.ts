import { describe, expect, it } from 'vitest'
import { Dashboard, Menu } from '@/types/api'
import { getMockResponse } from './index'

interface PermissionMockData {
  buttonList: string[]
  menuList: Menu.MenuItem[]
}

describe('local mock api', () => {
  it('returns permission data used by protected routes', async () => {
    const data = await getMockResponse<PermissionMockData>('/users/getPermissionList', 'get')

    expect(data.code).toBe(0)
    expect(data.data.menuList.length).toBeGreaterThan(0)
    expect(data.data.buttonList).toContain('user@create')
  })

  it('returns ECharts-compatible radar data', async () => {
    const data = await getMockResponse<Dashboard.RadarData>('/order/dashboard/getRadarData', 'get')

    expect(data.code).toBe(0)
    expect(Array.isArray(data.data.data)).toBe(true)
    expect(data.data.data[0]).toEqual({
      name: '司机模型诊断',
      value: [92, 88, 95, 78]
    })
  })
})
