export interface AlertOptions {
  title?: string
  message?: string
  icon?: IconOptions
  //inputs?: AlertInputOptions[]
  buttons?: (AlertButton|string)[]
  //enableBackdropDismiss?: boolean
}

export interface AlertInputOptions {
  type?: string
  name?: string | number
  placeholder?: string
  value?: string
  label?: string
  checked?: boolean
  disabled?: boolean
  id?: string
  handler?: Function
  min?: string | number
  max?: string | number
}

export interface AlertButton {
  text?: string
  solid?: boolean
  handler?: (value: any) => boolean|void
}

export interface IconOptions {
  align?: string
  flip?: string
  icon?: string
  rotate?: string
  size?: string
}