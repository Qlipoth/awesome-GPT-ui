import './index.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import About from './pages/About';
import Login from './pages/Login';
import MainLayout from './Layouts/MainLayout';
import ErrorPage from './pages/ErrorPage';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/403" element={<ErrorPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
