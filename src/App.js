import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function fetchTodoList() {
      try {
        const reponse = await fetch('https://restapi.fr/api/todo');
        if (reponse.ok) {
          const todos = await reponse.json();
          if (!ignore) {
            if (Array.isArray(todos)) {
              setTodoList(todos);
            } else {
              setTodoList([todos]);
            }
          }
        } else {
          console.error('Oops, une erreur');
        }
      } catch (e) {
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    fetchTodoList();
    return () => {
      ignore = true;
    };
  }, []);

  function addTodo(todo) {
    setTodoList([...todoList, todo]);
  }

  function deleteTodo(id) {
    setTodoList(todoList.filter((todo) => todo._id !== id));
  }

  function toggleTodo(id) {
    setTodoList(
      todoList.map((todo) =>
        todo._id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  function toggleTodoEdit(id) {
    setTodoList(
      todoList.map((todo) =>
        todo._id === id ? { ...todo, edit: !todo.edit } : todo
      )
    );
  }

  function editTodo(id, content) {
    setTodoList(
      todoList.map((todo) =>
        todo._id === id ? { ...todo, edit: false, content } : todo
      )
    );
  }

  function selectTodo(id) {
    setTodoList(
      todoList.map((todo) =>
        todo._id === id
          ? { ...todo, selected: !todo.selected }
          : { ...todo, selected: false }
      )
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center p-20">
      <div className="card container p-20">
        <h1 className="mb-20">Liste de tâches</h1>
        <AddTodo addTodo={addTodo} />
        {loading ? (
          <p>Chargement en cours...</p>
        ) : (
          <TodoList
            todoList={todoList}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
            toggleTodoEdit={toggleTodoEdit}
            editTodo={editTodo}
            selectTodo={selectTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;
