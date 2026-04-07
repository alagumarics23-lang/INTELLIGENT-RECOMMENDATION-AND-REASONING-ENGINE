import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav style={{
      padding: '20px 0',
      borderBottom: '1px solid var(--border-light)',
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BrainCircuit color="var(--primary)" size={28} />
          <h2 style={{ letterSpacing: '1px' }}>IRRE<span style={{ color: 'var(--primary)' }}>.</span></h2>
        </Link>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/courses" style={{ fontWeight: 600, transition: 'color 0.3s' }}>Courses</Link>
          <Link to="/academic-profile" style={{ fontWeight: 600 }}>Profile Trace</Link>
          <Link to="/learning-path" style={{ fontWeight: 600 }}>AI Path</Link>
          <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
            <User size={20} /> Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
