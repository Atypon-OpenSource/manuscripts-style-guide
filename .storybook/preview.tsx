import type { Preview } from '@storybook/react'
import React from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {ThemeProvider} from "styled-components";
import {theme} from "./theme";

const preview: Preview = {
  decorators: [
    (Story) => {
      return (
        <DndProvider backend={HTML5Backend}>
          <ThemeProvider theme={theme}>
            <Story />
          </ThemeProvider>
        </DndProvider>
      )
    }
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
