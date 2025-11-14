import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { AuthCard } from './AuthCard';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios, {AxiosError} from 'axios';
const SignupPage: React.FC = () => {
  const navigate  = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const CITIZEN= 'CITIZEN';
  const NGO = 'NGO';
  const GVT = "GVT";

  const API_BASE = 'http://localhost:8096/terrasustain';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation (before API)
    if (!firstName || !lastName || !username || !role || !phoneNumber || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    // Phone validation (simple international format)
    const phoneRegex = /^\+?[\d\s-]{7,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError('Please enter a valid phone number (e.g., +123-456-7890)');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // API call
    try {
      const response = await axios.post(`${API_BASE}/register`, {
        firstName,
        lastName,
        username,
        role,
        phoneNumber,
        password,
      });
      const isSuccess = response.data?.success === true || response.status === 200;

      if (isSuccess) {
        navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
        return; 
      }

      setError(response.data?.message ?? 'Registration failed');
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      setError(
        axiosErr.response?.data?.message ??
          axiosErr.message ??
          'Something went wrong. Please try again.'
      );
    } 
  };

  return (
    <AuthCard
      logo='TerraSustain'
      title="Create a Free Account!"
      paragraph='Create a free Account to join the largest protective community of Sustainability and the beauty of tomorrow!'
      onSubmit={handleSubmit}
      submitText="Register"
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      {/* Error Message */}
      {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

      {/* Names Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            id="first-name"
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            id="last-name"
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Username */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Password */}
      <div className="relative">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-500 hover:text-gray-700"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <input
          id="confirm"
          type={showConfirm ? 'text' : 'password'}
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-500 hover:text-gray-700"
          aria-label={showConfirm ? 'Hide password' : 'Show password'}
        >
          {showConfirm ? <VisibilityOff /> : <Visibility />}
        </button>
      </div>

      {/* Role Radio Buttons */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              id="citizen"
              type="radio"
              name="role"
              value={CITIZEN}
              checked={role === CITIZEN}
              onChange={(e) => setRole(e.target.value)}
              className="h-4 w-4 text-primary focus:ring-primary"
            />
            <label htmlFor="citizen" className="ml-2 text-sm text-gray-700">
              CITIZEN
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="ngo"
              type="radio"
              name="role"
              value={NGO}
              checked={role === NGO}
              onChange={(e) => setRole(e.target.value)}
              className="h-4 w-4 text-primary focus:ring-primary"
            />
            <label htmlFor="NGO" className="ml-2 text-sm text-gray-700">
              NGO
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="gvt"
              type="radio"
              name="role"
              value={GVT}
              checked={role === GVT}
              onChange={(e) => setRole(e.target.value)}
              className="h-4 w-4 text-primary focus:ring-primary"
            />
            <label htmlFor="gvt" className="ml-2 text-sm text-gray-700">
              GVT
            </label>
          </div>
        </div>
      </div>
    </AuthCard>
  );
};

export default SignupPage;