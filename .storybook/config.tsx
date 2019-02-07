import { addDecorator, configure } from '@storybook/react'
import React from 'react'
import { styled, ThemeProvider } from '../src/styled-components'
import { GlobalStyle, theme } from './theme'

const Story = styled.div`
  background-color: ${props => props.theme.colors.global.background.default};
  color: ${props => props.theme.colors.global.text.primary};
  font-family: ${props => props.theme.fontFamily};
  padding: 3rem;

  & h1,
  & h2 {
    font-weight: 200;
  }
`

addDecorator(story => (
  <ThemeProvider theme={theme}>
    <Story>
      <GlobalStyle suppressMultiMountWarning={true} />
      <div>{story()}</div>
    </Story>
  </ThemeProvider>
))

const req = require.context('../stories', true, /.stories.tsx$/)

const loadStories = () => {
  req.keys().forEach(req)
}

configure(loadStories, module)
