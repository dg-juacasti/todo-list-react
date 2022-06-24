import { FC } from 'react'
import './index.scss'

export interface IconButtonProps {
  className?: string
  onClick?(): any
}

export const IconButton:FC<IconButtonProps> = ({className, onClick = () =>{console.log("eli")}}) => {
  return (
    <i className={`icon-button ${className}`} onClick={()=>onClick()}></i>
  )
}
