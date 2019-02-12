export interface Theme {
  colors: Palette
  fontFamily: string
  radius: number
  spacing: number
}

export interface PrimaryColorStyle {
  primary: string
}

export interface SecondaryColorStyle {
  secondary: string
}

export interface DefaultColorStyle {
  default: string
}

export interface HoverableColorStyle {
  hovered: string
}

export interface ErrorColorStyle {
  error: string
}

export interface LinkColorStyle {
  link: string
}

export interface SelectableColorStyle {
  selected: string
}

export interface AlertMessageColorStyle {
  background: string
  text: string
  border: string
  dismiss: string
}

export type TextColorStyle = PrimaryColorStyle & SecondaryColorStyle

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
  profile: {
    avatar: string
    date: string
  }
  authors: {
    add: HoverableColorStyle
    searchIcon: string
  }
  sidebar: {
    background: DefaultColorStyle & SelectableColorStyle
    text: TextColorStyle & LinkColorStyle
    dropLine: string
    label: string
    border: string
  }
  dialog: {
    text: string
    background: string
    icon: string
    shadow: string
  }
}
