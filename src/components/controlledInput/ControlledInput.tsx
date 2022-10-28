import {ChangeEvent} from "react";

type InputType = {
  value?: string
  maxLength?: number
  onInputValueChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const ControlledInput = (props: InputType) => {
  return (
    <input
      type={"text"}
      value={props.value}
      maxLength={props.maxLength}
      onChange={props.onInputValueChange}
    />
  )
}