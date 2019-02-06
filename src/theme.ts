export interface Theme {
  colors: Palette
  fontFamily: string
  radius: number
  spacing: number
}

interface DefaultColorStyle {
  default: string
}

interface HoverableColorStyle {
  hovered: string
}

interface ErrorColorStyle {
  error: string
}

interface AlertMessageColorStyle {
  background: string
  text: string
  border: string
  dismiss: string
}

export interface Palette {
  global: {
    background: {
      default: string
      error: string
    }
    text: {
      primary: string
      secondary: string
      error: string
      link: string
    }
  }
  button: {
    primary: string
    secondary: string
    danger: string
  }
  textField: {
    placeholder: DefaultColorStyle & HoverableColorStyle
    border: DefaultColorStyle & ErrorColorStyle
  }
  alertMessage: {
    success: AlertMessageColorStyle
    error: AlertMessageColorStyle
    info: AlertMessageColorStyle
    warning: AlertMessageColorStyle
  }
  modal: {
    overlay: string
    border: string
    shadow: string
  }
}
