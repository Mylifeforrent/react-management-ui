import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import AuthButton from './AuthButton'
import { useStore } from '@/store'

vi.mock('react-router-dom', () => ({
  useRouteLoaderData: () => ({
    buttonList: ['user@create'],
    menuList: [],
    menuPathList: []
  })
}))

describe('AuthButton', () => {
  beforeEach(() => {
    useStore.setState({
      userInfo: {
        ...useStore.getState().userInfo,
        role: 3
      }
    })
  })

  it('renders when permission code is included', () => {
    render(<AuthButton auth='user@create'>新增</AuthButton>)

    expect(screen.getByText('新 增')).toBeInTheDocument()
  })

  it('hides when permission code is missing', () => {
    render(<AuthButton auth='user@delete'>删除</AuthButton>)

    expect(screen.queryByRole('button', { name: '删除' })).not.toBeInTheDocument()
  })
})
