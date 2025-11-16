import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthCard } from './AuthCard';
import axios from 'axios';
import  type {AxiosResponse}  from 'axios';

interface SignInResponse {
  token: string;
  username: string;
  fname: string;
  lname: string;
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
      // Validation response data
      if (!response.data || !response.data.token) {
        setError('Invalid response from server');
        return;
      }
      const { token, username: resUsername, fname, lname, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', resUsername);
      localStorage.setItem('fname', fname);
      localStorage.setItem('lname', lname);
      localStorage.setItem('role', role);
      if(role == "CITIZEN"){
      navigate('/citizen');
      }
      else if(role == "NGO"){
        navigate('/NGO')
      }
      else if(role == "GVT"){
        navigate("/GOV")
      }
      else{
        navigate("/Role")
      }
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
          <Link to="/register" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      {error && (
        <p className="text-red-600 text-sm text-center">{error}</p>
      )}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </AuthCard>
  );
};

export default LoginPage;