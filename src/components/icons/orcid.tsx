import React from 'react'
import { IconProps } from './types'

// https://orcid.org/trademark-and-id-display-guidelines

// tslint:disable:max-line-length

const Orcid = (props: IconProps) => (
  <svg viewBox="0 0 256 256" width={props.size} height={props.size} {...props}>
    <path
      d="M256 128c0 70.7-57.3 128-128 128S0 198.7 0 128 57.3 0 128 0s128 57.3 128 128z"
      fill="#a6ce39"
    />
    <path
      d="M86.3 186.2H70.9V79.1h15.4v107.1zm22.6-107.1h41.6c39.6 0 57 28.3 57 53.6 0 27.5-21.5 53.6-56.8 53.6h-41.8V79.1zm15.4 93.3h24.5c34.9 0 42.9-26.5 42.9-39.7C191.7 111.2 178 93 148 93h-23.7v79.4zM88.7 56.8c0 5.5-4.5 10.1-10.1 10.1s-10.1-4.6-10.1-10.1c0-5.6 4.5-10.1 10.1-10.1s10.1 4.6 10.1 10.1z"
      fill="#fff"
    />
  </svg>
)

export default Orcid
