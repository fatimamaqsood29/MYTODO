import React from 'react';
import AppRouter from './routes/AppRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AppRouter />
      <ToastContainer />
    </div>
  );
};

export default App;