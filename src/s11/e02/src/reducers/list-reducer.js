const INITIAL_STATE = {
  notes: [],
};
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_NOTE":
      return {
        ...state,
        notes: [...state.notes, action.payload.content],
      };
    default:
      return state;
    case "REMOVE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((_, i) => i !== action.payload.index),
      };
  }
}
