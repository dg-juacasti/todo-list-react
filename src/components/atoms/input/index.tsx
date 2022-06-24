import { FC, useEffect, useState } from "react"
import './index.scss'

export interface InputProps {
  initialValue?: string
  placeholder?: string
  width?: string
  type?: string
  onChange?(value: any): void
}

export const Input: FC<InputProps> = ({ initialValue = '', type = 'text', placeholder, width, onChange = () => { } }) => {

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
      <input type={type} placeholder={placeholder} value={value} className='input' onChange={handleOnChange}></input>
    </div>
  )

}