import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from './StoreProvider';

const Navigation = () => {
  const store = useStore('sessionStore');
  const navigate = useNavigate();

  async function logout() {
    try {
      await store.logout();
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/" className="font-semibold text-xl tracking-tight">
          My Website
        </Link>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link
            to="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4"
          >
            Main page
          </Link>
          <Link
            to="/about"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4"
          >
            About page
          </Link>
        </div>
        <div>
          <span className="text-gray-300 mr-4">{store.user?.email}</span>
          <button
            onClick={logout}
            type="button"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default observer(Navigation);
