import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Mutation for login
  const { mutate, isLoading } = useMutation(api.login, {
    onSuccess: () => {
      toast.success('Login Successful');
      navigate('/todos');
    },
    onError: (error) => {
      toast.error(error.message || 'Login Failed');
    },
  });

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = (values) => {
    mutate(values);
  };

  return (
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-md shadow-sm bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            {/* Email Field */}
            <div className="mb-4">
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className={`w-full p-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Password Field with Icons */}
            <div className="mb-4 relative">
              <Field
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className={`w-full p-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
              >
                {showPassword ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className={`w-full mt-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;