import { fireEvent, render, screen } from '@testing-library/react'
import { Form, Input } from 'antd'
import { describe, expect, it, vi } from 'vitest'
import SearchForm from './SearchForm'

function Harness({ onSubmit, onReset }: { onSubmit: () => void; onReset: () => void }) {
  const [form] = Form.useForm()

  return (
    <SearchForm form={form} submit={onSubmit} reset={onReset} initialValues={{ userName: 'demo' }}>
      <Form.Item name='userName' label='用户名称'>
        <Input placeholder='请输入用户名称' />
      </Form.Item>
    </SearchForm>
  )
}

describe('SearchForm', () => {
  it('renders children and dispatches submit/reset actions', () => {
    const onSubmit = vi.fn()
    const onReset = vi.fn()

    render(<Harness onSubmit={onSubmit} onReset={onReset} />)
    fireEvent.click(screen.getByText('搜 索'))
    fireEvent.click(screen.getByText('重 置'))

    expect(screen.getByPlaceholderText('请输入用户名称')).toBeInTheDocument()
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onReset).toHaveBeenCalledTimes(1)
  })
})
