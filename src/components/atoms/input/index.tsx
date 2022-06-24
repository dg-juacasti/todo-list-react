import { FC, useEffect, useState } from "react"
import './index.scss'

export interface InputProps {
  id?:string
  initialValue?: string
  placeholder?: string
  width?: string
  type?: string
  onChange?(value: any): void
}

export const Input: FC<InputProps> = ({ id = '', initialValue = '', type = 'text', placeholder, width, onChange = () => { } }) => {

  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleOnChange = (event: any) => {
    const val = event.target.value
    setValue(val)
    onChange(val)
  }

  return (
    <div style={{ width }}>
      <input id={id} type={type} placeholder={placeholder} value={value} className='input' onChange={handleOnChange}></input>
    </div>
  )

}