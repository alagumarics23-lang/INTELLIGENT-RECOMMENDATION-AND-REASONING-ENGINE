import React from 'react';
import { Search, Filter } from 'lucide-react';

const Courses = () => {
  // Mock data for initial render
  const courses = [
    { _id: '1', title: 'Introduction to AI', category: 'Artificial Intelligence', level: 'Beginner', thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=300&q=80' },
    { _id: '2', title: 'React Masterclass', category: 'Web Development', level: 'Intermediate', thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=300&q=80' },
    { _id: '3', title: 'Data Structures with Python', category: 'Computer Science', level: 'Beginner', thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=300&q=80' },
    { _id: '4', title: 'Advanced Cloud Architecture', category: 'DevOps', level: 'Advanced', thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=300&q=80' }
  ];

  return (
    <div className="animate-fade-in" style={{ marginTop: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>Explore Courses</h2>
        
        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ position: 'relative' }}>
            <Search color="var(--text-muted)" size={18} style={{ position: 'absolute', top: '12px', left: '12px' }} />
            <input type="text" className="input-base" placeholder="Search courses..." style={{ paddingLeft: '40px', width: '250px' }} />
          </div>
          <button className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 16px', color: 'var(--text-main)', border: '1px solid var(--border-light)', cursor: 'pointer', background: 'transparent' }}>
            <Filter size={18} />
            Filter
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '25px' }}>
        {courses.map(course => (
          <div key={course._id} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <img src={course.thumbnail} alt={course.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--secondary)' }}>{course.category}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{course.level}</span>
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '15px' }}>{course.title}</h3>
              <button className="primary-btn" style={{ marginTop: 'auto', padding: '10px' }}>View Course</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
