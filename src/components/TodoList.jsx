import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, addTodo, deleteTodo } from '../api';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';

const TodoList = () => {
  const queryClient = useQueryClient();

  // Fetch todos from the API
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    onError: (error) => {
      console.error("Error loading todos:", error); // Log the error
    },
  });

  // Get todos or set it to an empty array
  const todos = data?.todos || [];

  const [newTodo, setNewTodo] = useState('');

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Task added successfully');
      setNewTodo('');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Task deleted');
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading tasks: {error.message}</p>; // Display the actual error message

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">To-Do List</h2>

      <div className="flex mb-4">
        <input
          type="text"
          className="border p-2 w-full rounded-l-lg"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
          onClick={() => addMutation.mutate({ title: newTodo })}
        >
          Add
        </button>
      </div>

      <ul className="space-y-3">
        {todos.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          todos.map((todo) => (
            <li key={todo._id} className="flex justify-between items-center border p-2 rounded-lg">
              <span>{todo.title}</span>
              <FaTrash
                className="text-red-500 cursor-pointer"
                onClick={() => deleteMutation.mutate(todo._id)}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;