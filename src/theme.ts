export interface Theme {
  colors: Palette
  fontFamily: string
  radius: number
  spacing: number
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
}
