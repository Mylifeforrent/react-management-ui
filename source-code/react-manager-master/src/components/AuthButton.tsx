import { IAuthLoader } from '@/router/AuthLoader'
import { useStore } from '@/store'
import { Button } from 'antd'
import type { ButtonProps } from 'antd'
import type { ReactNode } from 'react'
import { useRouteLoaderData } from 'react-router-dom'

interface AuthButtonProps extends ButtonProps {
  auth?: string
  children?: ReactNode
}

export default function AuthButton({ auth, children, ...buttonProps }: AuthButtonProps) {
  const data = useRouteLoaderData('layout') as IAuthLoader
  const role = useStore(state => state.userInfo.role)
  if (!auth) return <Button {...buttonProps}>{children}</Button>
  if (data.buttonList.includes(auth) || role === 1) {
    return <Button {...buttonProps}>{children}</Button>
  }
  return <></>
}
