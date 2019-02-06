# Manuscripts Style Guide

React components for Manuscripts applications.

## Example usage

```tsx
import { PrimaryButton } from '@manuscripts/style-guide'

const Example: React.FunctionComponent<{
  handleClick: React.MouseEventHandler<HTMLButtonElement>
}> = ({ handleClick }) => (
  <div>
    <PrimaryButton onClick={handleClick}>Done</PrimaryButton>
  </div>
)
```

## Development

Run `yarn build` to build the `dist` folder for distribution.

Run `yarn dev` to automatically rebuild when a file is changed.

If a component needs new theme properties, add the types to `src/theme.ts` and add the corresponding values to `.storybook/theme.ts`.
