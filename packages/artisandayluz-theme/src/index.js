import Root from './Root';
import tribeEventsHandler from './components/handler'

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

        "/mainevent/": {
          isReady: true,
          isFetching: false,
          isMainEvent: true,
        },
      },
    },
  },

  actions: {
    theme: {
      init: ({ libraries }) => {
        libraries.source.handlers.push(tribeEventsHandler);
      },
    }, 
  }
};
