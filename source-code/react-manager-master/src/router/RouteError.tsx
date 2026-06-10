import { Button, Result } from 'antd'
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom'

const getErrorMessage = (error: unknown) => {
  if (isRouteErrorResponse(error)) return `${error.status} ${error.statusText}`
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return '页面初始化失败，请稍后重试'
}

export default function RouteError() {
  const error = useRouteError()
  const navigate = useNavigate()

  return (
    <Result
      status='warning'
      title='页面加载失败'
      subTitle={getErrorMessage(error)}
      extra={[
        <Button type='primary' key='retry' onClick={() => window.location.reload()}>
          重新加载
        </Button>,
        <Button key='login' onClick={() => navigate('/login')}>
          返回登录
        </Button>
      ]}
    />
  )
}
