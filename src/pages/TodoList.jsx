import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { api } from '../utils/api';
import { toast } from 'react-toastify';

const TodoList = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { data: todos, refetch } = useQuery('todos', api.getTodos);

  const { mutate: createTodo, isLoading } = useMutation(api.createTodo, {
    onSuccess: () => {
      toast.success('Todo Created');
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || 'Error creating todo');
    },
  });

  const handleCreateTodo = (e) => {
    e.preventDefault();
    createTodo(title, description, false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-md shadow-md">
      <h2 className="text-xl mb-4">Todo List</h2>
      <form onSubmit={handleCreateTodo} className="mb-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 mb-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 mb-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
          disabled={isLoading}
        >
          Add Todo
        </button>
      </form>

      <ul>
        {todos?.map((todo) => (
          <li key={todo._id} className="p-2 border-b">
            {todo.title} - {todo.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;