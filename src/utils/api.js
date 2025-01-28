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
  
      // Check if the response is OK
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
  
      // Parse the response body as JSON
      const data = await response.json();
  
      // Log the data to check what is being returned
      console.log("Login response data:", data);
  
      // Check if token is in the response and store it
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        console.log("Token saved to localStorage:", data.access_token); // Log to verify
      } else {
        throw new Error('No token found in response');
      }
  
      return data; // Return the response data
    } catch (error) {
      console.error('Login error:', error);
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

//   getTodos: async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/todos/get`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`, // Get token from localStorage
//         },
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to fetch todos');
//       }

//       return await response.json();
//     } catch (error) {
//       throw new Error(error.message || 'Get todos request failed');
//     }
//   },
// };
getTodos: async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
  
      // Check if token is available
      if (!token) {
        throw new Error('No token found in localStorage');
      }
  
      const response = await fetch(`${BASE_URL}/api/todos/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add the token in the Authorization header
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Get todos error:', error);
      throw new Error(error.message || 'Get todos request failed');
    }
  },
  updateTodo: async ({ id, title, description }) => {
    const response = await fetch(`${BASE_URL}/api/todos/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update todo');
    }

    return await response.json();
  },

//   deleteTodo: async function({ id }) {
//     // Check if the ID is provided
//     if (!id) {
//       throw new Error("Todo ID is required to delete");
//     }
  
//     try {
//       let response = await fetch(`${BASE_URL}/api/todos/delete/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
  
//       // If the response is not OK, handle the error
//       if (!response.ok) {
//         let errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to delete todo');
//       }
  
//       // Return the parsed response JSON if the deletion is successful
//       let data = await response.json();
//       return data;
  
//     } catch (error) {
//       // Catch and log any errors during the fetch operation
//       console.error("Error deleting todo:", error);
//       throw new Error(error.message || "An unexpected error occurred");
//     }
//   }
deleteTodo: async function({ id }) {
    if (!id) {
      throw new Error("Todo ID is required to delete");
    }
    try {
      const response = await fetch(`${BASE_URL}/api/todos/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete todo');
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw new Error(error.message || "An unexpected error occurred");
    }
  }
};