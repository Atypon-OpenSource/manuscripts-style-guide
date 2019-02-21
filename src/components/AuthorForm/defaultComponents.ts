import { styled } from '../../styled-components'
import { TextField } from '../TextField'

const LabelText = styled.div`
  font-size: 14px;
  letter-spacing: -0.2px;
  color: ${props => props.theme.colors.global.text.primary};
`

const CheckboxLabel = styled.label`
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

const Legend = styled.legend`
  font-size: 20px;
  letter-spacing: -0.4px;
  color: ${props => props.theme.colors.global.text.secondary};
`

export default {
  TextField,
  LabelText,
  CheckboxLabel,
  Legend,
}
