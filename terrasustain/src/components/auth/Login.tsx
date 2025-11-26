import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthCard } from './AuthCard';
import axios from 'axios';
import type { AxiosResponse } from 'axios';

interface SignInResponse {
  token: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const API_BASE = 'http://localhost:8096/terrasustain';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter all required information');
      return;
    }

    try {
      const response: AxiosResponse<SignInResponse> = await axios.post(`${API_BASE}/login`, {
        username,
        password,
      });

      if (!response.data || !response.data.token) {
        setError('Invalid response from server');
        return;
      }

      const { token, username: resUsername, firstName, lastName, role } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('username', resUsername);
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);
      localStorage.setItem('role', role);

      // Navigate based on role
      if (role === 'CITIZEN') navigate('/citizen');
      else if (role === 'NGO') navigate('/ngo');
      else if (role === 'GOVERNMENT_PERSONAL') navigate('/gov');
      else setError('Unknown role, cannot navigate');
    } catch (err: any) {
      console.error('Login error:', err.response || err);
      setError(err.response?.data?.message || 'Invalid username or password!');
    }
  };

  return (
    <AuthCard
      logo="TerraSustain"
      title="Welcome back"
      paragraph="Sign in to your account to join the long run of promoting Sustainability!"
      onSubmit={handleSubmit}
      submitText="Sign In"
      footer={
        <>
          Don’t have an account?{' '}
          <Link to="/role" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      {/* Error Message */}
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}

      {/* Username Input */}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-4 py-3 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition"
      />

      {/* Password Input */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-3 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition"
      />
    </AuthCard>
  );
};

export default LoginPage;