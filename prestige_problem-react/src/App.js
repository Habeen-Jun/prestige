import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Layout from './utils/Layout';
import { PrivateRoute } from './utils/PrivateRoutes';
import { AuthProvider } from './Context/auth';

function App() {
  return (
    <>
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/*" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
    </>
  );
}

export default App;
