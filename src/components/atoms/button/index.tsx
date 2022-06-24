import { FC } from "react"
import './index.scss'

export interface ButtonProps {
  id?: string
  width?: string
  className?: string
  onClick?(): void
  variant?: 'primary' | 'secondary',
  disabled?: boolean
}

export const Button: FC<ButtonProps> = ({ id, width, className = '', onClick, children, variant = 'primary', disabled = false }) => {
  return <button id={id} className={`button button-${variant} ${className}`} disabled={disabled} style={{ width }} onClick={onClick}>
    {children}
  </button>

}