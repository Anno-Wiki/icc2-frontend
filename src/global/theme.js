export const theme = {
  font: {
    nav: 'Roboto',
    display: 'Linux Biolinum',
    text: 'Linux Libertine',
    sans: 'Roboto',
  },
  color: {
    black: '#212529',
    white: '#FFFCFF', // Snow
    gray: '#50514F', // Davys Grey
    lightGray: '#ddd',

    blue: '#247BA0', // Celadon Blue
    red: '#FF686B', // Light Coral

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
    },
  },
  transition: {
    short: '0.1s',
    medium: '0.3s',
  },
};
