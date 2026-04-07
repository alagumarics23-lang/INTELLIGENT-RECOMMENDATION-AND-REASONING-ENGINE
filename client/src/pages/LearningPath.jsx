import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { generateLearningPath } from '../store/slices/learningPathSlice';

const LearningPath = () => {
  const { path, loading, error } = useSelector(state => state.learningPath);
  const dispatch = useDispatch();

  useEffect(() => {
    if (path.length === 0) {
      dispatch(generateLearningPath());
    }
  }, [dispatch, path.length]);

  return (
    <div className="animate-fade-in" style={{ marginTop: '40px', maxWidth: '800px', margin: '40px auto 0' }}>
      <h2 className="text-gradient" style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '10px' }}>Your Smart Learning Path</h2>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '40px' }}>
        Our Generative Reasoning AI has analyzed your lack-of-knowledge, academic CGPA, missing skills, and career areas of interest.
      </p>

      {loading && <p style={{ textAlign: 'center', color: 'var(--primary)' }}>AI is actively analyzing and reasoning your path... This may take a moment.</p>}
      {error && <p style={{ textAlign: 'center', color: 'var(--error)' }}>Failed to generate: {error}</p>}

      {!loading && !error && path.length === 0 && (
        <div style={{ textAlign: 'center' }}>
          <p>No recommendations yet. Please fill your academic profile.</p>
          <a href="/academic-profile" className="primary-btn" style={{ display: 'inline-block', marginTop: '20px' }}>Update Profile</a>
        </div>
      )}

      {!loading && path.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'relative' }}>
          {/* Vertical Timeline line placeholder */}
          <div style={{ position: 'absolute', left: '20px', top: '0', bottom: '0', width: '2px', background: 'var(--primary)', opacity: '0.3', zIndex: -1 }}></div>
          
          {path.map((item, index) => (
            <div key={item._id || index} className="glass-panel" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ minWidth: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)' }}>
                {index + 1}
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem' }}>{item.title}</h3>
                <div><span style={{ fontSize: '0.8rem', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>AI Reasoning: </span><span style={{ color: 'var(--success)' }}>Score {(item.score).toFixed(0)}/100</span></div>
                <p style={{ color: 'var(--text-main)', marginTop: '10px', fontSize: '0.95rem' }}>{item.reasoning}</p>
                <button className="primary-btn" style={{ marginTop: '15px', padding: '8px 16px', fontSize: '0.9rem' }}>Begin Module</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningPath;
