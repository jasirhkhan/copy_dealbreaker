import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // add this
import '../styles/dashboard.css';
import axios from 'axios'
const mockSuggestions = [
  { id: 1, name: 'Biryani' },
  { id: 2, name: 'Pizza' },
  { id: 3, name: 'Sushi' },
];

const Dashboard = () => {
  const [suggestions, setSuggestions] = useState(mockSuggestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState(null); // user info from backend
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Failed to fetch user");
      }
    };
  
    fetchUser();
  }, []);
  

  const handleSwipe = (direction) => {
    if (currentIndex < suggestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const currentFood = suggestions[currentIndex];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>🍽 Food Suggestor</h2>
        {user && <p>Hello, {user.username}!</p>}
        <p>Welcome! Swipe right to like, left to skip.</p>
      </header>

      {currentFood && (
        <div className="card">
          {/* <img src={currentFood.image} alt={currentFood.name} /> */}
          <h3>{currentFood.name}</h3>
          <div className="swipe-buttons">
            <button className="dislike" onClick={() => handleSwipe('left')}>👎</button>
            <button className="like" onClick={() => handleSwipe('right')}>👍</button>
          </div>
        </div>
      )}

      <footer className="dashboard-footer">
        <p>Need more ideas? Refresh for more!</p>
      </footer>
    </div>
  );
};

export default Dashboard;
