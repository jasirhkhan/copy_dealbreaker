import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import '../styles/login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { username, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        formData
      );

      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err) {
        console.error('Login failed:', err);
        setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">Mota Bajwa<span className="dot">.</span></div>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            required
            placeholder=" "
            className={username ? 'has-value' : ''}
          />
          <label htmlFor="username">Username</label>
        </div>

        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            placeholder=" "
            className={password ? 'has-value' : ''}
          />
          <label htmlFor="password">Password</label>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button 
          type="submit" 
          className={`login-btn ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? '' : 'Log In'}
        </button>
      </form>

      <p className="register-link">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
