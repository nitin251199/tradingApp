const initialState = {
  user: {},
  isLoggedIn: false,
  isDarkTheme: false,
  newsCount: 0,
  prevNewsCount: 0,
};

export const RootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PREV_NEWS_COUNT':
      return {
        ...state,
        prevNewsCount: action.payload,
      };
    case 'SET_NEWS_COUNT':
      return {
        ...state,
        newsCount: action.payload,
      };
    case 'SET_DARK_THEME':
      state.isDarkTheme = action.payload;
      return {
        ...state,
        theme: state.isDarkTheme,
      };
    case 'SET_USER':
      state.user = action.payload;
      state.isLoggedIn = true;
      return {
        ...state,
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      };
    case 'LOGOUT':
      state.user = {};
      state.isLoggedIn = false;
      return {
        ...state,
      };
    default:
      return state;
  }
};
