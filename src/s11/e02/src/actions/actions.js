export function addNote(content) {
  return {
    type: "ADD_NOTE",
    payload: {
      content,
    },
  };
}
export function removeNote(index) {
  return {
    type: "REMOVE_NOTE",
    payload: {
      index,
    },
  };
}
