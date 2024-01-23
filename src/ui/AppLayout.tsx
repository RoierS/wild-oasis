import { Outlet } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';

const AppLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <Sidebar />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
