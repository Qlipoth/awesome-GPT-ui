import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useStore } from './StoreProvider';
import Loader from './Loader';

interface Props {
  children: React.ReactNode;
}

const AppWrapper: React.FC<Props> = ({ children }) => {
  const store = useStore('sessionStore');
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store
        .checkAuth()
        .catch((err) => {
          navigate('/login');
        })
        .finally(() => setIsReady(true));
    } else {
      navigate('/login');
    }
  }, []);

  return (isReady && store.isLoggedIn && <div>{children}</div>) || <Loader />;
};

export default observer(AppWrapper);
