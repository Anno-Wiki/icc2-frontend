import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: ${({theme}) => theme.font.text};
    font-size: 27px;
  }

  a {
    text-decoration: none;
    color: ${({theme}) => theme.color.blue};
    transition: color ${({theme}) => theme.transition.short} linear;
    &:hover {
      color: ${({theme}) => theme.color.gray}
    }
  }

  h1, h2, h3 {
    margin: 0.5rem 0;
    font-family: ${({theme}) => theme.font.display};
    font-weight: bold;
  }

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.3rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  p {
    margin: 1rem 0;
  }
`

export default GlobalStyle
