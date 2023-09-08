import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import AppWrapper from '../components/AppWrapper';

function MainLayout() {
  return (
    <AppWrapper>
      <Navigation />
      <Main className="flex-1">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </Main>
    </AppWrapper>
  );
}

export default MainLayout;

const Main = styled.main`
  background-color: #15181e;
  color: #fff;
`;
