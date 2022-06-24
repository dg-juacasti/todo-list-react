import { FC } from 'react'
import './index.scss'

export interface IconButtonProps {
  className?: string
  testid?: string
  onClick?(): void
}

export const IconButton:FC<IconButtonProps> = ({className, onClick = () =>{}, testid}) => {
  return (
    <i data-testid={testid} className={`icon-button ${className}`} onClick={onClick}/>
  )
}
