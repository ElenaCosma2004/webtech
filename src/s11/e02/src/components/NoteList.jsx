import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useState } from "react";

import { addNote, removeNote } from "../actions/actions";
const noteListSelector = (state) => state.list.notes;

function NoteList(props) {
  const notes = useSelector(noteListSelector, shallowEqual);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <h3>List of notes</h3>
        {notes.map((e, i) => (
          <div key={i}>
            {e.content}{" "}
            <button onClick={() => dispatch(removeNote(i))}>remove</button>
          </div>
        ))}
      </div>
      <div>
        <h3>add a note</h3>
        <input
          type="text"
          placeholder="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></input>
        <input
          type="button"
          value="add"
          onClick={() => dispatch(addNote(content))}
        ></input>
      </div>
    </div>
  );
}
export default NoteList;
