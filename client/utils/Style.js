// @flow

import { css } from 'styled-components'

export default {
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
    black: 900,
  },
  inputSizes: {
    regular: { width: 208, height: 32 },
    large: { width: 224, height: 32 },
  },
  borderRadius: '4px',
  animations: {
    swift: '.45s cubic-bezier(0.3, 1, 0.4, 1) 0s',
    rotation: css`
      animation: rotate 2s infinite linear;
      @keyframes rotate {
        from {transform: rotate(0deg);}
        to {transform: rotate(360deg);}
      }
    `,
  },
  exactWidth: (width: string) => css`
    min-width: ${width};
    max-width: ${width};
  `,
  exactHeight: (height: string) => css`
    min-height: ${height};
    max-height: ${height};
  `,
  exactSize: (size: string) => css`
    min-width: ${size};
    max-width: ${size};
    min-height: ${size};
    max-height: ${size};
  `,
  palette: {
    primary: '#280E4C',
    primaryLight: '#000EA9',
    primaryHighlight: '#FD9727',
    secondary: '#D9DCE3',
    secondaryLight: '#777A8B',
    black: '#202134',
    alert: '#F91661',
    success: '#4CD964',
    warning: '#FDC02F',
    grayscale: [
      '#D8DBE2', // 0
      '#ECEDF1', // 1
      '#C8CCD7', // 2
      '#A4AAB5', // 3
      '#616770', // 4
      '#7F8795', // 5
      '#1B2733', // 6
      '#F2F3F4', // 7
      '#858B93', // 8
    ],
  },
}
