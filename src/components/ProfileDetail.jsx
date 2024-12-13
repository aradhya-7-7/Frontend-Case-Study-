import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileDetail.css';

const ProfileDetail = ({ profile, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Add default values if properties are undefined
  const {
    photo = '',
    name = '',
    designation = '',
    department = '',
    email = '',
    phone = '',
    address = '',
    skills = [],
    projects = [],
    languages = [],
    interests = [],
    socialLinks = {}
  } = profile || {};

  return (
    <div className="profile-detail-overlay">
      <div className="profile-detail-content">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="profile-header">
          <img src={photo} alt={name} className="detail-photo" />
          <div className="profile-title">
            <h2>{name}</h2>
            <p className="designation">{designation}</p>
            <p className="department">{department}</p>
          </div>
        </div>

        <div className="profile-info-grid">
          <div className="info-section">
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <p><strong>Address:</strong> {address}</p>
          </div>

          {skills.length > 0 && (
            <div className="info-section">
              <h3>Skills</h3>
              <div className="skills-list">
                {skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div className="info-section">
              <h3>Projects</h3>
              {projects.map(project => (
                <div key={project.name} className="project-card">
                  <h4>{project.name}</h4>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div className="info-section">
              <h3>Languages</h3>
              <div className="languages-list">
                {languages.map(language => (
                  <span key={language} className="language-tag">{language}</span>
                ))}
              </div>
            </div>
          )}

          {interests.length > 0 && (
            <div className="info-section">
              <h3>Interests</h3>
              <div className="interests-list">
                {interests.map(interest => (
                  <span key={interest} className="interest-tag">{interest}</span>
                ))}
              </div>
            </div>
          )}

          {Object.keys(socialLinks).length > 0 && (
            <div className="info-section">
              <h3>Social Links</h3>
              <div className="social-links">
                {Object.entries(socialLinks).map(([platform, link]) => (
                  <a key={platform} href={link} target="_blank" rel="noopener noreferrer" className="social-link">
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
