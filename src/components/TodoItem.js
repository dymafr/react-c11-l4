import React from 'react';

export default function TodoItem({ todo, deleteTodo, updateTodo }) {
  async function updateTodo(newTodo) {
    try {
      setLoading(true);
      setError(null);
      const reponse = await fetch('https://restapi.fr/api/todo', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: value,
          edit: false,
          done: false,
        }),
      });
      if (reponse.ok) {
        const todo = await reponse.json();
        addTodo(todo);
        setValue('');
      } else {
        setError('Oops, une erreur');
      }
    } catch (e) {
      setError('Oops, une erreur');
    } finally {
      setLoading(false);
    }
  }

  return (
    <li
      className={
        'mb-10 d-flex flex-row justify-content-center align-items-center p-10'
      }
    >
      <span className="flex-fill">
        {todo.content} {todo.done && '✅'}
      </span>
      <button
        className="btn btn-primary mr-15"
        onClick={(e) => {
          e.stopPropagation();
          updateTodo({ ...todo, done: !todo.done });
        }}
      >
        Valider
      </button>
      <button
        className="btn btn-primary mr-15"
        onClick={(e) => {
          e.stopPropagation();
          updateTodo({ ...todo, edit: true });
        }}
      >
        Modifier
      </button>
      <button
        className="btn btn-reverse-primary"
        onClick={(e) => {
          e.stopPropagation();
          deleteTodo();
        }}
      >
        Supprimer
      </button>
    </li>
  );
}
