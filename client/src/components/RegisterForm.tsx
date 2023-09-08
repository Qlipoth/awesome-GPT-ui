import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from './StoreProvider';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fio, setFio] = useState('');
  const navigate = useNavigate();

  const store = useStore('sessionStore');

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await store.signUp(fio, email, password);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="m-auto w-full max-w-xs">
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg">
          <h2 className="text-white text-2xl font-bold mb-8 text-center">
            Sign up
          </h2>
          <div>
            <label
              htmlFor="username"
              className="block text-white font-bold mb-2"
            >
              fio
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-gray-200"
              value={fio}
              onChange={(e) => setFio(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-white font-bold mb-2 mt-4"
            >
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
              className="bg-blue-600 w-full hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
          <div className="mt-8 flex justify-center">
            <span className="text-white pr-1">Have an account? </span>
            <Link className="text-blue-300 hover:underline" to="/login">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
