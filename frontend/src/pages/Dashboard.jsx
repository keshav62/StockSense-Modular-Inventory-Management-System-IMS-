import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ setAuth }) => {
  const navigate = useNavigate();
  const [hoveredRow, setHoveredRow] = useState(null);
  const [activeMenu, setActiveMenu] = useState('Dashboard');

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

  const menuItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Products', icon: '🛍️' },
    { name: 'Receipts', icon: '📥' },
    { name: 'Deliveries', icon: '📤' },
    { name: 'Transfers', icon: '🔄' },
    { name: 'Adjustments', icon: '⚖️' },
    { name: 'Warehouses', icon: '🏢' },
    { name: 'Settings', icon: '⚙️' }
  ];

  const styles = {
    layout: {
      display: 'flex',
      minHeight: '100vh',
      background: '#0f172a',
      fontFamily: "'Inter', sans-serif",
      color: 'white'
    },
    sidebar: {
      width: '260px',
      background: 'rgba(255, 255, 255, 0.02)',
      borderRight: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem 1rem'
    },
    logoContainer: {
      marginBottom: '3rem',
      padding: '0 1rem'
    },
    logoTitle: {
      fontSize: '1.5rem',
      fontWeight: '800',
      background: '-webkit-linear-gradient(#4facfe, #00f2fe)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: 0
    },
    menuList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      flex: 1
    },
    menuItem: (isActive) => ({
      padding: '1rem',
      marginBottom: '0.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      background: isActive ? 'rgba(79, 172, 254, 0.1)' : 'transparent',
      color: isActive ? '#4facfe' : '#94a3b8',
      fontWeight: isActive ? '600' : '400',
      transition: 'all 0.2s ease-in-out'
    }),
    sidebarFooter: {
      marginTop: 'auto',
      padding: '1rem',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      textAlign: 'center'
    },
    userProfile: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '8px',
      marginBottom: '1rem'
    },
    mainContent: {
      flex: 1,
      backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(79, 172, 254, 0.06), transparent 25%), radial-gradient(circle at 85% 30%, rgba(0, 242, 254, 0.06), transparent 25%)',
      padding: '2rem',
      overflowY: 'auto'
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
      fontSize: '2rem',
      fontWeight: '800',
      color: '#f8fafc'
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
    <div style={styles.layout}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <h2 style={styles.logoTitle}>StockSense</h2>
        </div>
        
        <ul style={styles.menuList}>
          {menuItems.map(item => (
            <li 
              key={item.name} 
              style={styles.menuItem(activeMenu === item.name)}
              onClick={() => setActiveMenu(item.name)}
              onMouseOver={(e) => {
                if (activeMenu !== item.name) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = 'white';
                }
              }}
              onMouseOut={(e) => {
                if (activeMenu !== item.name) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#94a3b8';
                }
              }}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </li>
          ))}
        </ul>

        <div style={styles.sidebarFooter}>
          <div style={styles.userProfile}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#4facfe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              AD
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'white' }}>Admin User</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Inventory Manager</div>
            </div>
          </div>
          <button 
            style={{...styles.button, width: '100%'}} 
            onClick={handleLogout}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255, 77, 79, 0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255, 77, 79, 0.1)';
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <header style={styles.header}>
          <h1 style={styles.title}>{activeMenu} Overview</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
             <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Welcome back, Admin!</span>
          </div>
        </header>
        
        {/* We only render the dashboard widgets when Dashboard is selected for this demo */}
        {activeMenu === 'Dashboard' ? (
          <>
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
          </>
        ) : (
          <div style={{ ...styles.card, textAlign: 'center', padding: '4rem 2rem', color: '#94a3b8' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🚧</span>
            <h2 style={{ color: 'white', marginBottom: '0.5rem' }}>{activeMenu} Module</h2>
            <p>This section is under construction. Navigate back to Dashboard to see the metrics.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
