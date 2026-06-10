import type { ReactNode } from 'react'
import { Form, Space, Button } from 'antd'
import type { FormInstance } from 'antd'

interface SearchFormProps<T extends object = Record<string, unknown>> {
  form: FormInstance<T>
  initialValues?: Partial<T>
  children: ReactNode
  submit: () => void
  reset: () => void
}

/**
 * 搜索表单容器组件封装
 * @param props
 * @returns
 */
export default function SearchForm<T extends object = Record<string, unknown>>(props: SearchFormProps<T>) {
  return (
    <Form className='search-form' form={props.form} layout='inline' initialValues={props.initialValues}>
      {props.children}
      <Form.Item>
        <Space>
          <Button type='primary' onClick={props.submit}>
            搜索
          </Button>
          <Button type='default' onClick={props.reset}>
            重置
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
