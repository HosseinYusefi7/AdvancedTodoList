import { createContext, useEffect, useReducer, useState } from 'react';
import './styles.css';
import { NewTodoForm } from './NewTodoForm';
import { TodoList } from './TodoList';
import { TodoFilterForm } from './TodoFilterForm';
import GoogleFonts from 'react-google-fonts';
const LOCAL_STORAGE_KEY = 'TODOS';
const ACTIONS = {
  ADD: 'ADD',
  TOGGLE: 'TOGGLE',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
};
export const TodoContext = createContext();
function reducer(todos, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD:
      return [
        ...todos,
        { name: payload.name, id: crypto.randomUUID(), completed: false },
      ];
    case ACTIONS.TOGGLE:
      return todos.map((todo) => {
        if (todo.id === payload.id)
          return { ...todo, completed: payload.completed };
        return todo;
      });
    case ACTIONS.DELETE:
      return todos.filter((todo) => todo.id !== payload.id);
    case ACTIONS.UPDATE:
      return todos.map((todo) => {
        if (todo.id === payload.id) {
          return { ...todo, name: payload.name };
        }
        return todo;
      });
    default:
      throw new Error('No Actions Found');
  }
}
function App() {
  const [filterName, setFilterName] = useState('');
  const [hideCompleted, setHideCompleted] = useState(false);
  const [todos, dispatch] = useReducer(reducer, [], (initValue) => {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (value === null) return initValue;
    return JSON.parse(value);
  });
  const filteredTodo = todos.filter((todo) => {
    if (hideCompleted && todo.completed) return false;
    return todo.name.includes(filterName);
  });
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addNewTodo(name) {
    dispatch({ type: ACTIONS.ADD, payload: { name } });
  }

  function toggleTodo(todoId, completed) {
    dispatch({ type: ACTIONS.TOGGLE, payload: { id: todoId, completed } });
  }

  function deleteTodo(todoId) {
    dispatch({ type: ACTIONS.DELETE, payload: { id: todoId } });
  }
  function updateTodoName(id, name) {
    dispatch({ type: ACTIONS.UPDATE, payload: { id, name } });
  }

  return (
    <TodoContext.Provider
      value={{
        todos: filteredTodo,
        addNewTodo,
        toggleTodo,
        updateTodoName,
        deleteTodo,
      }}
    >
      <NewTodoForm />
      <TodoFilterForm
        filterName={filterName}
        setFilterName={setFilterName}
        hide={hideCompleted}
        setHide={setHideCompleted}
      />
      <TodoList />
    </TodoContext.Provider>
  );
}

export default App;
