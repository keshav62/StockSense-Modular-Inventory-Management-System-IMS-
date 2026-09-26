import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ setAuth }) => {
  const navigate = useNavigate();
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleLogout = () => {
    setAuth(false);
    navigate('/login');
  };

  const kpiData = [
    { title: 'Total Inventory Value', value: '$124,500', change: '+14%', isPositive: true, icon: '💰' },
    { title: 'Items in Stock', value: '3,450', change: '-2%', isPositive: false, icon: '📦' },
    { title: 'Low Stock Alerts', value: '12', change: '+3', isPositive: false, icon: '⚠️' },
    { title: 'Pending Deliveries', value: '8', change: 'On track', isPositive: true, icon: '🚚' }
  ];

  const recentActivities = [
    { id: 1, action: 'Stock Received', item: 'MacBook Pro M3', quantity: '+50', date: '2 hours ago', status: 'Completed' },
    { id: 2, action: 'Stock Transfer', item: 'Dell XPS 15', quantity: '-10', date: '5 hours ago', status: 'In Transit' },
    { id: 3, action: 'Stock Adjusted', item: 'Logitech MX Master 3', quantity: '-2', date: 'Yesterday', status: 'Completed' },
    { id: 4, action: 'Delivery Dispatched', item: 'Keychron K2', quantity: '-25', date: 'Yesterday', status: 'Completed' },
    { id: 5, action: 'Low Stock Alert', item: 'Samsung 32" Monitor', quantity: 'Only 3 left', date: '2 days ago', status: 'Warning' }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      background: '#0f172a',
      backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(79, 172, 254, 0.08), transparent 25%), radial-gradient(circle at 85% 30%, rgba(0, 242, 254, 0.08), transparent 25%)',
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
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    },
    title: {
      margin: 0,
      background: '-webkit-linear-gradient(#4facfe, #00f2fe)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontSize: '2rem',
      fontWeight: '800'
    },
    button: {
      padding: '0.6rem 1.5rem',
      borderRadius: '8px',
      background: 'rgba(255, 77, 79, 0.1)',
      color: '#ff4d4f',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      border: '1px solid rgba(255, 77, 79, 0.3)'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s, background 0.2s',
      cursor: 'default'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      color: '#94a3b8',
      fontSize: '0.875rem'
    },
    cardValue: {
      fontSize: '2rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      color: '#f8fafc'
    },
    badge: (isPositive) => ({
      display: 'inline-block',
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontWeight: '600',
      background: isPositive ? 'rgba(52, 211, 153, 0.1)' : 'rgba(248, 113, 113, 0.1)',
      color: isPositive ? '#34d399' : '#f87171'
    }),
    tableContainer: {
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      overflow: 'hidden'
    },
    tableHeader: {
      padding: '1.5rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      fontSize: '1.25rem',
      fontWeight: '600'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      textAlign: 'left'
    },
    th: {
      padding: '1rem 1.5rem',
      color: '#94a3b8',
      fontWeight: '500',
      fontSize: '0.875rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    },
    td: {
      padding: '1rem 1.5rem',
      color: '#e2e8f0',
      borderBottom: '1px solid rgba(255, 255, 255, 0.02)'
    },
    statusBadge: (status) => {
      let colors = { bg: 'rgba(255,255,255,0.1)', text: 'white' };
      if (status === 'Completed') colors = { bg: 'rgba(52, 211, 153, 0.1)', text: '#34d399' };
      if (status === 'In Transit') colors = { bg: 'rgba(96, 165, 250, 0.1)', text: '#60a5fa' };
      if (status === 'Warning') colors = { bg: 'rgba(251, 191, 36, 0.1)', text: '#fbbf24' };
      
      return {
        padding: '0.25rem 0.75rem',
        borderRadius: '999px',
        fontSize: '0.75rem',
        fontWeight: '600',
        background: colors.bg,
        color: colors.text
      };
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Dashboard Overview</h1>
        <button 
          style={styles.button} 
          onClick={handleLogout}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255, 77, 79, 0.2)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 77, 79, 0.1)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Logout
        </button>
      </header>
      
      <div style={styles.grid}>
        {kpiData.map((kpi, index) => (
          <div 
            key={index} 
            style={styles.card}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
            }}
          >
            <div style={styles.cardHeader}>
              <span>{kpi.title}</span>
              <span style={{ fontSize: '1.25rem' }}>{kpi.icon}</span>
            </div>
            <div style={styles.cardValue}>{kpi.value}</div>
            <div style={styles.badge(kpi.isPositive)}>{kpi.change} from last month</div>
          </div>
        ))}
      </div>

      <div style={styles.tableContainer}>
        <div style={styles.tableHeader}>Recent Activities</div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Action</th>
              <th style={styles.th}>Item</th>
              <th style={styles.th}>Quantity</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentActivities.map((activity) => (
              <tr 
                key={activity.id}
                onMouseOver={() => setHoveredRow(activity.id)}
                onMouseOut={() => setHoveredRow(null)}
                style={{ 
                  background: hoveredRow === activity.id ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                  transition: 'background 0.2s'
                }}
              >
                <td style={styles.td}>
                  <div style={{ fontWeight: '500' }}>{activity.action}</div>
                </td>
                <td style={styles.td}>{activity.item}</td>
                <td style={styles.td}>
                  <span style={{ color: activity.quantity.includes('-') ? '#f87171' : activity.quantity.includes('+') ? '#34d399' : '#e2e8f0' }}>
                    {activity.quantity}
                  </span>
                </td>
                <td style={styles.td}><span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{activity.date}</span></td>
                <td style={styles.td}>
                  <span style={styles.statusBadge(activity.status)}>{activity.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
