export const theme = {
  font: {
    display: 'Linux Biolinum',
    text: 'Linux Libertine'
  },
  color: {
    black: '#212529',
    white: '#FFFCFF',         // Snow
    gray: '#50514F',          // Davys Grey
    grey: '#50514F',          // Davys Grey
    lightGray: '#CBD4C2',     // Ash grey
    lightGrey: '#CBD4C2',     // Ash grey

    blue: '#247BA0',          // Celadon Blue
    red: '#FF686B',           // Light Coral

    get iconfg() {
      return this.white;
    },
    get iconbg() {
      return this.gray;
    },
    get iconfgalt() {
      return this.lightGray;
    },
    get iconbgalt() {
      return this.blue;
    }
  },
  transition: {
    short: '0.1s',
  },
  transitionShort: '0.2s',
}
