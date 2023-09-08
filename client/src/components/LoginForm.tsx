import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from './StoreProvider';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>();

  const store = useStore('sessionStore');

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await store.signIn(email, password);
      navigate('/');
    } catch (err) {
      setErrorMessage(err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="m-auto w-full max-w-xs">
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg">
          <h2 className="text-white text-2xl font-bold mb-8 text-center">
            Log In
          </h2>
          <div>
            <label htmlFor="email" className="block text-white font-bold mb-2">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-gray-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-white font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-gray-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Login
            </button>
          </div>
          <div className="mt-8 flex justify-center">
            <span className="text-white pr-1">Not a member? </span>
            <Link className="text-blue-300 hover:underline" to="/register">
              Register here
            </Link>
          </div>
        </form>
        {errorMessage && (
          <span className="text-red-500 font-semibold flex justify-center">
            {errorMessage}
          </span>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
