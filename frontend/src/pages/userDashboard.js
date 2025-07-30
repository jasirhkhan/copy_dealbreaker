import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/dashboard.css';
import { AuthContext } from '../context/authContext'; // Adjust path if needed

const UserDashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if ( !token) return navigate('/login');

    // const fetchAds = async () => {
    //   try {
    //     const adsRes = await axios.get(`${process.env.REACT_APP_API_URL}/ads/my`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`
    //       }
    //     });
    //     setAds(adsRes.data.ads);
    //   } catch (err) {
    //     console.error('Failed to fetch ads', err);
    //   }
    // };

    // fetchAds();
  }, [navigate, token, user]);

  const handleDelete = async (adId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/ads/${adId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAds(ads.filter(ad => ad._id !== adId));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>📋 My Dashboard</h2>
        {user && <p>Hello, {user.username}!</p>}
        <button className="btn" onClick={() => navigate('/post-ad')}>+ Post New Ad</button>
      </header>

      <section className="ads-section">
        {ads.length === 0 ? (
          <p>You haven’t posted any ads yet.</p>
        ) : (
          <div className="ads-grid">
            {ads.map(ad => (
              <div key={ad._id} className="ad-card">
                <img src={ad.imageUrl || '/default.jpg'} alt={ad.title} />
                <h3>{ad.title}</h3>
                <p className="price">Rs {ad.price}</p>
                <p className="location">{ad.location}</p>
                <div className="btn-group">
                  <button onClick={() => navigate(`/edit-ad/${ad._id}`)} className="btn">Edit</button>
                  <button onClick={() => handleDelete(ad._id)} className="btn danger">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="dashboard-footer">
        <p>&copy; 2025 SaleBoard — All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserDashboard;
