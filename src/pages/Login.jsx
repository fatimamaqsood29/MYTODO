import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(api.login, {
    onSuccess: () => {
      toast.success('Login Successful');
      navigate('/todos');
    },
    onError: (error) => {
      toast.error(error.message || 'Login Failed');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the email and password together in an object
    mutate({ email, password });
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-md shadow-md">
      <h2 className="text-xl mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;