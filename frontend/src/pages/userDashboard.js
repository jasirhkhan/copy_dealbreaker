import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/dashboard.css';
import { AuthContext } from '../context/authContext'; // Adjust path if needed

const UserDashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  if (!token) return navigate('/login');

  const fetchBrands = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/brand/get`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBrands(res.data.brands); // ✅ correctly accessing "brands"
    } catch (err) {
      console.error('Failed to fetch brands', err);
    }
  };

  fetchBrands();
}, [navigate, token, user]);

  // const handleDelete = async (adId) => {
  //   try {
  //     await axios.delete(`${process.env.REACT_APP_API_URL}/brand/delete/${adId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     setAds(ads.filter(ad => ad._id !== adId));
  //   } catch (err) {
  //     console.error('Delete failed', err);
  //   }
  // };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>📋 My Dashboard</h2>
        {user && <p>Hello, {user.username}!</p>}
        {/* <button className="btn" onClick={() => navigate('/post-ad')}>+ Post New Ad</button> */}
      </header>

      <section className="ads-section">
      {brands.length === 0 ? (
        <p>No brands found.</p>
        ) : (
        <div className="ads-grid">
          {brands.map(brand => (
            <div key={brand._id} className="ad-card">
              <img src={brand.logoUrl || '/default.jpg'} alt={brand.name} />
              <h3>{brand.name}</h3>
              <p>{brand.description}</p>
              <a href={brand.websiteUrl} target="_blank" rel="noreferrer" className="btn">
                Visit Website
              </a>
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
