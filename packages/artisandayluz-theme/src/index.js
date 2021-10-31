import Root from './Root';
import fetchToken from './actions/fetch-token'
import postEvent from "./actions/post-event";
import postImageAction from "./actions/post-image";

export default {
  name: "artisandayluz-theme",
  roots: {
    theme: Root
  },
  state: {
    theme: {

      userName: "",
      userPass: "",
      image : {
        preview: "", 
        raw: "" 
      },
      token: false,
      idImage: "noImage",
      fetchToken,
      postImageAction,
      postEvent,
      categoriesArr: [], 
      objectForm: {},
      bodyPostEvent: {}
    },
    
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

        "/create-event/": {
          isReady: true,
          isFetching: false,
          isCreateEvent: true,
        }
      },
    },
  },

  /**Actions starts*/
  actions: {
    theme: {
      updateField: ({ state }) => (field, value) => {
        state.theme[field] = value;
      },

      fetchToken,

      chooseImage: ({state}) => e => {
        if (e.target.files.length) {          
            state.theme.image.preview = URL.createObjectURL(e.target.files[0]),
            state.theme.image.raw = e.target.files[0]       
        }
      },

      postImageAction,
      postEvent
    }
  }
};
