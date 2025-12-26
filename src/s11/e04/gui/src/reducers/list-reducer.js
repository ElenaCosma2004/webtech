const INITIAL_STATE = {
  notes: [],
  error: null,
  fetching: false,
  fetched: false,
};
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_NOTES_PENDING":
      return {
        ...state,
        fetching: true,
        fetched: false,
      };
    case "GET_NOTES_FULFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        notes: action.payload.content,
      };
    case "GET_NOTES_REJECTED":
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.payload.error,
      };
    case "ADD_NOTE":
      return {
        ...state,
        notes: [...state.notes, action.payload.content],
      };

    case "REMOVE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((n) => n.id !== action.payload),
      };

    default:
      return state;
  }
}
