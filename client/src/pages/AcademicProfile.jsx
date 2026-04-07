import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../store/slices/authSlice';
import { generateLearningPath } from '../store/slices/learningPathSlice';

const AcademicProfile = () => {
  const { userInfo } = useSelector(state => state.auth);
  const [department, setDepartment] = useState(userInfo?.department || '');
  const [cgpa, setCgpa] = useState(userInfo?.cgpa || '');
  const [projects, setProjects] = useState(userInfo?.projectsCompleted?.join(', ') || '');
  const [skills, setSkills] = useState(userInfo?.skills?.join(', ') || '');
  const [certifications, setCertifications] = useState(userInfo?.certifications?.join(', ') || '');
  const [areaOfInterest, setAreaOfInterest] = useState(userInfo?.areaOfInterest?.join(', ') || '');
  const [lackOfKnowledge, setLackOfKnowledge] = useState(userInfo?.lackOfKnowledge?.join(', ') || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileData = {
      department,
      cgpa: parseFloat(cgpa),
      projectsCompleted: projects.split(',').map(s => s.trim()).filter(Boolean),
      skills: skills.split(',').map(s => s.trim()).filter(Boolean),
      certifications: certifications.split(',').map(s => s.trim()).filter(Boolean),
      areaOfInterest: areaOfInterest.split(',').map(s => s.trim()).filter(Boolean),
      lackOfKnowledge: lackOfKnowledge.split(',').map(s => s.trim()).filter(Boolean),
    };
    
    // 1. Update Profile in DB using Thunk
    await dispatch(updateProfile(profileData));
    // 2. Automatically generate the path using AI
    await dispatch(generateLearningPath());
    // 3. Move to viewing the path
    navigate('/learning-path');
  };

  return (
    <div className="animate-fade-in" style={{ marginTop: '40px' }}>
      <div className="glass-panel" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="text-gradient" style={{ marginBottom: '10px' }}>Comprehensive Academic Trace</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
          Provide your academic milestones, gaps, and interests. Our AI will analyze this detailed profile to tailor a custom learning sequence exclusively for you.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr)', gap: '20px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-main)' }}>Department</label>
              <input type="text" className="input-base" placeholder="e.g. Computer Engineering" value={department} onChange={e => setDepartment(e.target.value)} required />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-main)' }}>Current CGPA</label>
              <input type="number" step="0.01" className="input-base" placeholder="e.g. 3.8" value={cgpa} onChange={e => setCgpa(e.target.value)} required />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-main)' }}>Skills Mastered</label>
            <input type="text" className="input-base" placeholder="Comma separated (e.g. Python, SQL, Communication)" value={skills} onChange={e => setSkills(e.target.value)} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-main)' }}>Areas of Interest / Career Goals</label>
            <input type="text" className="input-base" placeholder="Comma separated (e.g. Data Science, Web Dev, Cloud)" value={areaOfInterest} onChange={e => setAreaOfInterest(e.target.value)} />
          </div>

          <div style={{ borderLeft: '4px solid var(--error)', paddingLeft: '15px', marginTop: '10px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--error)', fontWeight: 600 }}>Identified Lack of Knowledge (Bridging the gap)</label>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>What concepts do you feel you struggle with but are necessary for your goals?</p>
            <input type="text" className="input-base" placeholder="Comma separated (e.g. Data Structures, React hooks, Calculus)" value={lackOfKnowledge} onChange={e => setLackOfKnowledge(e.target.value)} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-main)' }}>Projects Completed</label>
            <textarea className="input-base" rows="3" placeholder="Comma separated minor or major projects" value={projects} onChange={e => setProjects(e.target.value)}></textarea>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-main)' }}>Certifications Held</label>
            <textarea className="input-base" rows="2" placeholder="Comma separated" value={certifications} onChange={e => setCertifications(e.target.value)}></textarea>
          </div>

          <button type="submit" className="primary-btn" style={{ width: '100%', marginTop: '20px', padding: '16px', fontSize: '1.1rem' }}>
            Generate Custom AI Learning Path
          </button>
        </form>
      </div>
    </div>
  );
};

export default AcademicProfile;
