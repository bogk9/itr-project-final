const initialState = { 
    collections: [],
    items: [],
    error: ""
   };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case "FETCH_COLLECTIONS_SUCCESS":
        return {
          ...state,
          collections: payload,
        };
      case "FETCH_ITEMS_SUCCESS":
        return {
          ...state,
          items: payload
        }
      case "FETCH_FAILED":
        return {
          ...state,
        };
      default:
        return state;
    }
  }
  