import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Password strength calculator
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return 'Very Weak';
      case 2:
        return 'Weak';
      case 3:
        return 'Fair';
      case 4:
        return 'Good';
      case 5:
        return 'Strong';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
    
    // Calculate password strength for password field
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, formData);
      alert(res.data.msg || 'Account created successfully! Please log in.');
      navigate('/');
    } catch (err) {
      console.error('Signup failed:', err);
      setError(err.response?.data?.message || 'Signup failed. Please check your details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">Mota Bajwa<span className="dot">.</span></div>
      <h2>Create Your Account</h2>

      <form onSubmit={handleSignup}>
        <div className="form-group">
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder=" "
            className={formData.username ? 'has-value' : ''}
          />
          <label htmlFor="username">Username</label>
        </div>

        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder=" "
            className={formData.password ? 'has-value' : ''}
          />
          <label htmlFor="password">Password</label>
          
          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="password-strength">
              <div className="strength-bar">
                <div 
                  className={`strength-fill strength-${passwordStrength}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                ></div>
              </div>
              <span className={`strength-text strength-${passwordStrength}`}>
                {getPasswordStrengthText(passwordStrength)}
              </span>
            </div>
          )}
        </div>

        {error && <p className="error-message">{error}</p>}

        <button 
          type="submit" 
          className={`login-btn ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? '' : 'Sign Up'}
        </button>
      </form>

      <p className="register-link">
        Already have an account? <Link to="/">Log In</Link>
      </p>
    </div>
  );
};

export default Signup;
