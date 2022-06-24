import { ChangeEvent, FC, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { setform } from "../../../store/slices/form"
import { filteredList } from "../../../store/slices/lists"


import './index.scss'

export interface InputProps {
  initialValue?: string
  placeholder?: string
  values?: string
  width?: string
  type?: string
  property?: string
  onChange?(value: any): void
}

export const Input: FC<InputProps> = ({ initialValue = '', values, property, type = 'text', placeholder, width, onChange = () => { } }) => {

  const [value, setValue] = useState(initialValue)
  const dispatch = useDispatch();
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])



  const onchange = (event: ChangeEvent<HTMLInputElement>) => {
    if (values === 'filter') {
      const value = event.target.value;
      dispatch(filteredList(value));
    } else {
      const value = { value: event?.target.value, name: property };
      dispatch(setform(value))
    }

  };

  return (
    <div style={{ width }} >
      <input style={{ width }} value={initialValue} onChange={(event) => onchange(event)} type={type} placeholder={placeholder} className='input' />
    </div>
  )

}