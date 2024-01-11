import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/auth';

export const PrivateRoute = () => {
  const { user } = useAuth()

  return user ? <Outlet /> : <Navigate to="/" />;
};