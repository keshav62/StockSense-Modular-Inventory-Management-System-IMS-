import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      // Dummy Data Login logic
      if (email === 'admin@example.com' && password === 'password123') {
        setAuth(true);
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Use admin@example.com / password123');
        setIsLoading(false);
      }
    }, 800);
  };

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1e1e2f, #151522)',
      color: 'white',
      fontFamily: "'Inter', sans-serif"
    },
    card: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '2.5rem',
      width: '100%',
      maxWidth: '400px',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
    },
    title: {
      textAlign: 'center',
      fontSize: '1.8rem',
      fontWeight: '700',
      marginBottom: '1.5rem',
      background: '-webkit-linear-gradient(#4facfe, #00f2fe)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    inputGroup: {
      marginBottom: '1.25rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontSize: '0.875rem',
      color: '#cbd5e1'
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      border: '1px solid rgba(255,255,255,0.2)',
      background: 'rgba(0,0,0,0.2)',
      color: 'white',
      outline: 'none',
      fontSize: '1rem',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s'
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '8px',
      border: 'none',
      background: 'linear-gradient(90deg, #4facfe, #00f2fe)',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1rem',
      cursor: 'pointer',
      marginTop: '1rem',
      transition: 'transform 0.2s, opacity 0.2s',
      opacity: isLoading ? 0.7 : 1
    },
    error: {
      color: '#ff4d4f',
      backgroundColor: 'rgba(255, 77, 79, 0.1)',
      padding: '0.75rem',
      borderRadius: '8px',
      marginBottom: '1rem',
      fontSize: '0.875rem',
      border: '1px solid rgba(255, 77, 79, 0.3)',
      textAlign: 'center'
    },
    hint: {
      marginTop: '1.5rem',
      fontSize: '0.85rem',
      color: '#94a3b8',
      textAlign: 'center',
      lineHeight: '1.5'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>StockSense IMS</h2>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="admin@example.com"
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit" 
            style={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div style={styles.hint}>
          <p><strong>Dummy Credentials:</strong></p>
          <p>admin@example.com / password123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
