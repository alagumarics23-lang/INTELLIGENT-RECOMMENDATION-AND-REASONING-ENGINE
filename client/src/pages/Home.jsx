import React from 'react';
import { BrainCircuit, Compass, Target } from 'lucide-react';

const Home = () => {
  return (
    <div className="animate-fade-in" style={{ marginTop: '40px' }}>
      {/* Hero Section */}
      <div className="glass-panel" style={{ padding: '60px 40px', textAlign: 'center', marginBottom: '40px' }}>
        <BrainCircuit color="var(--primary)" size={64} style={{ marginBottom: '20px' }} />
        <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '16px', lineHeight: 1.1 }}>
          Intelligent Recommendation <br/> Reasoning Engine
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
          Discover a curated path tailored specifically to your learning style, preferences, and long-term career goals.
        </p>
        <button className="primary-btn" style={{ fontSize: '1.1rem', padding: '16px 32px' }}>
          Start Exploring
        </button>
      </div>

      {/* Features Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
          <Compass color="var(--secondary)" size={40} style={{ marginBottom: '20px' }} />
          <h3>Smart Discovery</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Find exactly what you need with our advanced AI-driven search capabilities.</p>
        </div>
        <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
          <Target color="var(--primary)" size={40} style={{ marginBottom: '20px' }} />
          <h3>Tailored Tracking</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Monitor your progress on a path designed uniquely for your skillset.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
