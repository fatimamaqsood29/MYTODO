import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TodoList = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editTodoId, setEditTodoId] = useState(null); // Track editing todo

  const { data: todos, refetch } = useQuery('todos', api.getTodos);

  const { mutate: createTodo } = useMutation(api.createTodo, {
    onSuccess: () => {
      toast.success('Todo Created');
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || 'Error creating todo');
    },
  });

  const { mutate: updateTodo } = useMutation(api.updateTodo, {
    onSuccess: () => {
      toast.success('Todo Updated');
      refetch();
      setEditTodoId(null); // Reset edit mode
    },
    onError: (error) => {
      toast.error(error.message || 'Error updating todo');
    },
  });

  const { mutate: deleteTodo } = useMutation(api.deleteTodo, {
    onSuccess: () => {
      toast.success('Todo Deleted');
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || 'Error deleting todo');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTodoId) {

      updateTodo({ id: editTodoId, title, description });
    } else {
    
      createTodo({ title, description, completed: false });
    }
    setTitle('');
    setDescription('');
  };

  const handleEditTodo = (todo) => {
    setEditTodoId(todo.id);
    setTitle(todo.title);
    setDescription(todo.description);
  };

  const handleDeleteTodo = (id) => {
    if (!id) {
      toast.error("Error: Todo ID is missing");
      return;
    }
    deleteTodo(id);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-md shadow-md">
      <h2 className="text-xl mb-4">Todo List</h2>
      <form onSubmit={handleSubmit} className="mb-4">
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
        >
          {editTodoId ? 'Update Todo' : 'Add Todo'}
        </button>
      </form>

      <ul>
        {todos?.map((todo) => (
          <li key={todo.id} className="p-2 border-b flex items-center justify-between">
            <div>
              <span>{todo.title} - {todo.description}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditTodo(todo)}
                className="text-yellow-500 hover:text-yellow-700"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;