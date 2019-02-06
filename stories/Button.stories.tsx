import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import {
  Button,
  DangerButton,
  GreyButton,
  MiniButton,
  PrimaryButton,
  PrimaryMiniButton,
} from '../src'

storiesOf('Buttons', module)
  .add('Button', () => <Button onClick={action('clicked')}>Example</Button>)
  .add('Primary Button', () => (
    <PrimaryButton onClick={action('clicked')}>Done</PrimaryButton>
  ))
  .add('Danger Button', () => (
    <DangerButton onClick={action('clicked')}>Delete</DangerButton>
  ))
  .add('Grey Button', () => (
    <GreyButton onClick={action('clicked')}>Example</GreyButton>
  ))
  .add('Mini Button', () => (
    <MiniButton onClick={action('clicked')}>Example</MiniButton>
  ))
  .add('Primary Mini Button', () => (
    <PrimaryMiniButton onClick={action('clicked')}>Example</PrimaryMiniButton>
  ))
