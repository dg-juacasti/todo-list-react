import { FC } from 'react'
import './index.scss'

export interface IconButtonProps {
  testId: string,
  className?: string
  onClick?(): void
}

export const IconButton:FC<IconButtonProps> = ({className, onClick = () =>{}, testId}) => {
  return (
    <i data-testid={testId} className={`icon-button ${className}`} onClick={onClick}></i>
  )
}
