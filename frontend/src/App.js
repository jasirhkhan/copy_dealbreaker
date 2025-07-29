import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './pages/userLogin';
import Signup from './pages/userSignup';
import Dashboard from './pages/userDashboard';
import ProtectedRoute from './components/protectedRoute';
import AuthProvider from './context/authContext';
import Layout from './components/layout';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute> <Layout> <Dashboard /> </Layout> </ProtectedRoute>} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
