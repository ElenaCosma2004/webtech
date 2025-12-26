import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { use, useEffect } from "react";

import { getNotes } from "../actions/actions";
const noteListSelector = (state) => state.list.notes;

function NoteList(props) {
  const notes = useSelector(noteListSelector, shallowEqual);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  return (
    <div>
      <div>
        <h3>List of notes</h3>
        {notes.map((e) => (
          <div key={e.id}>{e.content}</div>
        ))}
      </div>
      <div>
        <h3>List of notes</h3>
        {notes.map((e) => (
          <div key={e.id}>
            {e.content}
            <button onClick={() => dispatch(removeNote(e.id))}>remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default NoteList;
