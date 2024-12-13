import { useState } from 'react';
import ProfileForm from './ProfileForm';
import { useProfiles } from '../../context/ProfileContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { profilesData, updateProfilesData } = useProfiles();
  const [editingProfile, setEditingProfile] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = (profile) => {
    let updatedProfiles;
    
    if (editingProfile) {
      updatedProfiles = profilesData.map(p => 
        p.id === profile.id ? { ...profile, id: p.id } : p
      );
    } else {
      const newProfile = {
        ...profile,
        id: Date.now(),
        skills: profile.skills || [],
        projects: profile.projects || [],
        languages: profile.languages || [],
        interests: profile.interests || [],
        socialLinks: profile.socialLinks || {}
      };
      updatedProfiles = [...profilesData, newProfile];
    }

    updateProfilesData(updatedProfiles);
    setEditingProfile(null);
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    const updatedProfiles = profilesData.filter(p => p.id !== id);
    updateProfilesData(updatedProfiles);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Profile Management</h2>
        <div className="header-actions">
          <button className="add-btn" onClick={() => setIsAdding(true)}>
            Add New Profile
          </button>
          <Link to="/" className="back-btn">Back to Profiles</Link>
        </div>
      </div>

      {(isAdding || editingProfile) && (
        <ProfileForm 
          profile={editingProfile}
          onSave={handleSave}
          onCancel={() => {
            setEditingProfile(null);
            setIsAdding(false);
          }}
        />
      )}

      <div className="profiles-list">
        {profilesData && profilesData.map((profile) => (
          <div key={profile.id} className="profile-item">
            <img src={profile.photo} alt={profile.name} className="profile-thumb" />
            <div className="profile-details">
              <h3>{profile.name}</h3>
              <p className="designation">{profile.designation}</p>
              <p className="description">{profile.description}</p>
            </div>
            <div className="action-buttons">
              <button onClick={() => setEditingProfile(profile)} className="edit-btn">
                Edit
              </button>
              <button onClick={() => handleDelete(profile.id)} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
