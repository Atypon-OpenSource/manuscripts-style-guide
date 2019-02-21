import { styled, ThemedStyledComponent } from '../../styled-components'
import { TextField } from '../TextField'

export const Fields = styled.div`
  padding: 16px;
`

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

export const LabelText = styled.div`
  font-size: 14px;
  letter-spacing: -0.2px;
  color: ${props => props.theme.colors.global.text.primary};
`

export const CheckboxField = styled.input.attrs({
  type: 'checkbox',
})<{ type?: string }>``

export const CheckboxLabel = styled.label`
  color: #444;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  margin-bottom: 8px;
  margin-top: 24px;

  & ${LabelText} {
    margin-left: 4px;
  }

  &:not(:last-child) {
    margin-right: 16px;
  }
`

export const Fieldset = styled.fieldset`
  border: none;
`

export const Legend = styled.legend`
  font-size: 20px;
  letter-spacing: -0.4px;
  color: ${props => props.theme.colors.global.text.secondary};
`

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

export interface AuthorFormComponents {
  Legend: ThemedStyledComponent<'legend'>
  CheckboxLabel: ThemedStyledComponent<'label'>
  TextField: ThemedStyledComponent<'input'>
}

export type AuthorFormComponentOverrides = {
  [K in keyof AuthorFormComponents]?: AuthorFormComponents[K]
}

export const defaultAuthorFormComponents: AuthorFormComponents = {
  Legend,
  CheckboxLabel,
  TextField,
}
