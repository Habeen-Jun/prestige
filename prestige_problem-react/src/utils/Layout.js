import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => (
    <div className="App">
      {children}
      <Outlet />
    </div>
  );

export default Layout