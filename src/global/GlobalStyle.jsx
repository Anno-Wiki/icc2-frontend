import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,700;1,400;1,600&display=swap');
  @import url('http://fonts.cdnfonts.com/css/linux-libertine');
  @import url('http://fonts.cdnfonts.com/css/linux-biolinum');
  
  html, body {
    font-family: ${({theme}) => theme.text};
    font-size: 27px;
  }
  
  a {
    text-decoration: none;
    color: ${({theme}) => theme.blue};
    transition: color 0.2s linear;
  }
  
  a:hover {
    color: grey;
  }
  
  h1, h2, h3 {
    margin: 0.5rem 0;
    font-family: ${({theme}) => theme.display};
    font-weight: bold;
  }
  
  h1 {
    font-size: 2.5rem;
  }
  
  h2 {
    font-size: 1.9rem;
  }
  
  h3 {
    font-size: 1.5rem;
  }
`

export default GlobalStyle
