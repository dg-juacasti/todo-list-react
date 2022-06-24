import { FC } from "react"
import './index.scss'

export interface ButtonProps {
  id?: string
  width?: string
  className?: string
  onClick?: any
  variant?: 'primary' | 'secondary'
}

export const Button: FC<ButtonProps> = ({ id, width, className = '', onClick, children, variant = 'primary' }) => {
  return <button id={id}  data-testid={id}  className={`button button-${variant} ${className}`} style={{ width }} onClick={onClick}>
    {children}
  </button>

}