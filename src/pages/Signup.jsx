import { useState } from 'react';
import { api } from '../utils/api';
import { toast } from 'react-toastify';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('All fields are required');
      return;
    }

    try {
      const response = await api.signup({ email, password });
      toast.success('Signup successful!');
      console.log(response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;