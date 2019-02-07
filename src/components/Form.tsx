import { Form } from 'formik'
import { styled } from '../styled-components'

export const CenteredForm = styled(Form)`
  width: 100%;
  max-width: 450px;
`

export const FormHeader = styled.div`
  padding: 40px;
  text-align: center;
  @media (max-width: 450px) {
    padding: 40px 0;
  }
`

export const FormActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.51);
`

export const FormError = styled.div`
  background: ${props => props.theme.colors.alertMessage.error.background};
  color: ${props => props.theme.colors.alertMessage.error.text};
  border-radius: ${props => props.theme.radius}px;
  margin-top: 5px;
  margin-bottom: 5px;
  position: relative;
  padding: 12px;
`

export interface FormErrors {
  submit?: string
}

export interface ErrorProps {
  error?: string | null | object
}

export const submitEvent = {
  preventDefault: () => {
    // NOOP
  },
}
