import { FC, useEffect, useState } from "react"
import './index.scss'

export interface InputProps {
  initialValue?: string
  placeholder?: string
  width?: string
  type?: string
  onChange?(value: any): void
  required?: boolean 
}

export const Input: FC<InputProps> = ({ initialValue = '', type = 'text', placeholder, width, onChange = () => { }, required = true }) => {

  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState(false)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleOnChange = (event: any) => {
    const val = event.target.value
      setValue(val)
      onChange(val)
      error && setError(false)
  }

  const handleBlur = (event: any) => {
    const val = event.target.value
    if(val === '') setError(true)
  }

  return (
    <div style={{ width }}>
      <input type={type} data-testid="inputtest" placeholder={placeholder} value={value} className='input' onChange={handleOnChange} onBlur={handleBlur}></input>
      { error &&
        <p data-testid="errorlabel" className="input__error">{`${placeholder} es requerido`}</p>
      }
    </div>
  )

}