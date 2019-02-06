export interface Theme {
  colors: {
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
  fontFamily: string
  radius: number
  spacing: number
}
