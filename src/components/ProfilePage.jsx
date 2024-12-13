import { useState } from 'react';
import MapComponent from './MapComponent';
import ProfileDetail from './ProfileDetail';
import LoadingSpinner from './LoadingSpinner';
import SearchFilters from './SearchFilters';
import { useProfiles } from '../context/ProfileContext';
import { Link } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const { profilesData, isLoading } = useProfiles();
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedDetailProfile, setSelectedDetailProfile] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    location: '',
    department: ''
  });

  const handleSummaryClick = (e, profile) => {
    e.stopPropagation();
    setSelectedProfile(profile === selectedProfile ? null : profile);
  };

  const handleProfileClick = (profile) => {
    setSelectedDetailProfile(profile);
  };

  const getFilteredProfiles = () => {
    return profilesData.filter(profile => {
      const matchesSearch = 
        profile.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        (profile.skills && profile.skills.some(skill => 
          skill.toLowerCase().includes(filters.searchTerm.toLowerCase())
        ));
      
      const matchesLocation = 
        !filters.location || 
        profile.address.includes(filters.location);
      
      const matchesDepartment = 
        !filters.department || 
        profile.department === filters.department;

      return matchesSearch && matchesLocation && matchesDepartment;
    });
  };

  return (
    <div className="profile-container">
      <div className="header-section">
        <h1>Team Profiles</h1>
        <Link to="/admin" className="admin-link">Admin Panel</Link>
      </div>

      <SearchFilters onFilterChange={setFilters} />
      
      <div className="map-container">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <MapComponent 
            profiles={getFilteredProfiles()} 
            selectedProfile={selectedProfile}
          />
        )}
      </div>

      {isLoading ? (
        <div className="loading-section">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="profile-grid">
            {getFilteredProfiles().map((profile) => (
              <div 
                key={profile.id} 
                className="profile-card"
                onClick={() => handleProfileClick(profile)}
              >
                <div className="card-content">
                  <img 
                    src={profile.photo} 
                    alt={profile.name} 
                    className="profile-photo" 
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                  <h2>{profile.name}</h2>
                  <p className="designation">{profile.designation}</p>
                  <p className="description">{profile.description}</p>
                  <p className="address">{profile.address}</p>
                  <div className="card-actions">
                    <button 
                      className={`summary-btn ${selectedProfile?.id === profile.id ? 'active' : ''}`}
                      onClick={(e) => handleSummaryClick(e, profile)}
                    >
                      {selectedProfile?.id === profile.id ? 'Hide Location' : 'Show Location'}
                    </button>
                    <button className="view-details-btn">
                      View Full Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {getFilteredProfiles().length === 0 && (
            <div className="no-profiles">
              <h2>No matching profiles found</h2>
              <p>Try adjusting your search filters</p>
            </div>
          )}
        </>
      )}

      {selectedDetailProfile && (
        <ProfileDetail 
          profile={selectedDetailProfile} 
          onClose={() => setSelectedDetailProfile(null)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
