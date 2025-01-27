const BASE_URL = import.meta.env.VITE_BASE_URL;

console.log("API URL:", BASE_URL);  // Log to check the value

export const api = {
  signup: async ({ email, password }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Signup error:', error);  // Log the error
      throw new Error(error.message || 'Signup request failed');
    }
  },

  login: async ({ email, password }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      // Assuming the response contains a token field
      if (data.token) {
        // Store the token in localStorage
        localStorage.setItem('token', data.token);
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);  // Log the error
      throw new Error(error.message || 'Login request failed');
    }
  },

  createTodo: async ({ title, description = '', completed = false }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/todos/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Get token from localStorage
        },
        body: JSON.stringify({ title, description, completed }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create todo');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Create todo request failed');
    }
  },

  getTodos: async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/todos/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Get token from localStorage
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch todos');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Get todos request failed');
    }
  },
};