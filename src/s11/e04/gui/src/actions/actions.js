const SERVER = "http://localhost:8080";
export function getNotes() {
  return {
    type: "GET_NOTES",
    payload: async () => {
      const response = await fetch(`${SERVER}/notes`);
      const data = await response.json();
      return data;
    },
  };
}

export const removeNote = (id) => async (dispatch) => {
  await fetch(`${SERVER}/notes/${id}`, {
    method: "DELETE",
  });
  dispatch({
    type: "REMOVE_NOTE",
    payload: {
      id,
    },
  });
};
