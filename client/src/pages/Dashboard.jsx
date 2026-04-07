import React from 'react';
import { useSelector } from 'react-redux';
import { BookOpen, Star, Clock } from 'lucide-react';

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="animate-fade-in" style={{ marginTop: '30px' }}>
      <h2 style={{ marginBottom: '20px' }}>Welcome back, <span className="text-gradient">{userInfo?.name || 'Student'}</span></h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <BookOpen color="var(--primary)" size={32} />
          <div>
            <h4 style={{ color: 'var(--text-muted)' }}>Enrolled Courses</h4>
            <p style={{ fontSize: '1.5rem', fontWeight: '600' }}>4</p>
          </div>
        </div>
        
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Star color="var(--success)" size={32} />
          <div>
            <h4 style={{ color: 'var(--text-muted)' }}>Completed</h4>
            <p style={{ fontSize: '1.5rem', fontWeight: '600' }}>2</p>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Clock color="var(--secondary)" size={32} />
          <div>
            <h4 style={{ color: 'var(--text-muted)' }}>Hours Learning</h4>
            <p style={{ fontSize: '1.5rem', fontWeight: '600' }}>18h</p>
          </div>
        </div>
      </div>

      <h3>Your Personalized Recommendations</h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Based on your past learning history and selected skills.</p>
      
      {/* Mock Course Recommendation Card */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Course Thumbnail" style={{ width: '150px', borderRadius: '8px', objectFit: 'cover' }} />
        <div>
          <span style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)', color: 'var(--primary)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>98% Match</span>
          <h4 style={{ fontSize: '1.2rem', marginTop: '10px' }}>Advanced Full-Stack Development</h4>
          <p style={{ color: 'var(--text-muted)', margin: '8px 0' }}>Perfect based on your interest in "React" and "Node.js".</p>
          <button className="primary-btn" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>View Details</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
