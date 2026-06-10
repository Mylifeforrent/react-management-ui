import { Button, Card, Form, Input, Modal, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useState } from 'react'

interface UserRow {
  userId: number
  userName: string
  userEmail: string
}

const initialRows: UserRow[] = [
  { userId: 100001, userName: '教学管理员', userEmail: 'admin@mars.com' },
  { userId: 100002, userName: '运营同学', userEmail: 'operator@mars.com' }
]

export default function FormTableDemo() {
  const [rows, setRows] = useState(initialRows)
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm<UserRow>()
  const columns: ColumnsType<UserRow> = [
    { title: '用户 ID', dataIndex: 'userId' },
    { title: '用户名称', dataIndex: 'userName' },
    { title: '邮箱', dataIndex: 'userEmail' }
  ]

  const handleOk = async () => {
    const values = await form.validateFields()
    setRows(rows.concat(values))
    form.resetFields()
    setOpen(false)
  }

  return (
    <main style={{ padding: 24, background: '#f5f7fb', minHeight: '100vh' }}>
      <Card title='阶段 5：表单与表格实战' extra={<Button onClick={() => setOpen(true)}>新增</Button>}>
        <Table rowKey='userId' columns={columns} dataSource={rows} pagination={false} />
      </Card>
      <Modal title='新增用户' open={open} onOk={handleOk} onCancel={() => setOpen(false)}>
        <Form form={form} labelCol={{ span: 5 }}>
          <Form.Item name='userId' label='用户 ID' rules={[{ required: true, message: '请输入用户 ID' }]}>
            <Input type='number' />
          </Form.Item>
          <Form.Item name='userName' label='用户名称' rules={[{ required: true, message: '请输入用户名称' }]}>
            <Input />
          </Form.Item>
          <Form.Item name='userEmail' label='邮箱' rules={[{ type: 'email', message: '请输入正确邮箱' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </main>
  )
}
