import Root from './Root';

export default {
  name: "artisandayluz-theme",
  roots: {
    theme: Root
  },
  state: {
    theme: {},
    source: {
      data: {

        "/": {
          isReady: true,
          isFetching: false,
          isHomePage: true,
        },

        "/fullprogram/": {
          isReady: true,
          isFetching: false,
          isFullProgram: true,
        },
      },
    },
  },
};
