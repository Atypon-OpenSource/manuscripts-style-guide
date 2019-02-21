import React from 'react'
import { AuthorName, AuthorNameProps } from '../AuthorName'

export interface AuthorItemComponents {
  AuthorName: React.FunctionComponent<AuthorNameProps>
}

export type AuthorItemComponentOverrides = {
  [K in keyof AuthorItemComponents]?: AuthorItemComponents[K]
}

export const defaultAuthorItemComponents: AuthorItemComponents = {
  AuthorName,
}
