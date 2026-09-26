import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ setAuth }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(false);
    navigate('/login');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: '#0f172a',
      color: 'white',
      fontFamily: "'Inter', sans-serif",
      padding: '2rem'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    },
    title: {
      margin: 0,
      background: '-webkit-linear-gradient(#4facfe, #00f2fe)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    button: {
      padding: '0.5rem 1.5rem',
      borderRadius: '8px',
      background: 'rgba(255, 77, 79, 0.2)',
      color: '#ff4d4f',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background 0.2s',
      border: '1px solid rgba(255, 77, 79, 0.5)'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      padding: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      textAlign: 'center'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Dashboard</h1>
        <button style={styles.button} onClick={handleLogout}>Logout</button>
      </header>
      
      <div style={styles.card}>
        <h2>Welcome to StockSense</h2>
        <p style={{ color: '#94a3b8', marginTop: '1rem' }}>
          You have successfully logged in using dummy credentials.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
