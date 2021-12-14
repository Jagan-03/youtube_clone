export const comments = (
    state = {
      loading: true,
      comments: null,
    },
    action
  ) => {
    switch (action.type) {
      case "COMMENT_LIST_REQUEST":
        return { ...state, loading: true };
      case "COMMENT_LIST_SUCCESS":
        return { ...state, loading: false, comments: action.payload };
      case "COMMENT_LIST_FAIL":
        return { ...state, loading: false, error: action.payload };
      
      default:
        return state;
    }
  };
  