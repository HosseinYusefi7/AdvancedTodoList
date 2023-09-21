import { useContext, useRef, useState } from 'react';
import { TodoContext } from './App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashCan,
  faPenToSquare,
  faFloppyDisk,
} from '@fortawesome/free-regular-svg-icons';
export function TodoItem({ id, name, completed }) {
  const { deleteTodo, toggleTodo, updateTodoName } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const nameRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    if (nameRef.current.value === '') return;
    updateTodoName(id, nameRef.current.value);
    setIsEditing(false);
  }
  return (
    <li className="list-item">
      {isEditing ? (
        <form className="save-form" onSubmit={handleSubmit}>
          <input type="text" autoFocus defaultValue={name} ref={nameRef} />
          <button className="save-btn btn" data-button-save>
            <FontAwesomeIcon icon={faFloppyDisk} size="lg" />
          </button>
        </form>
      ) : (
        <>
          <label className="list-item-label">
            <input
              checked={completed}
              type="checkbox"
              data-list-item-checkbox
              onChange={(e) => toggleTodo(id, e.target.checked)}
            />
            <span data-list-item-text>{name}</span>
          </label>
          <section>
            <button
              className="trash-btn btn"
              onClick={() => deleteTodo(id)}
              data-button-delete
            >
              <FontAwesomeIcon icon={faTrashCan} size="lg" />
            </button>
            <button
              className="edit-btn btn"
              onClick={() => setIsEditing(true)}
              data-button-edit
            >
              <FontAwesomeIcon icon={faPenToSquare} size="lg" />
            </button>
          </section>
        </>
      )}
    </li>
  );
}
