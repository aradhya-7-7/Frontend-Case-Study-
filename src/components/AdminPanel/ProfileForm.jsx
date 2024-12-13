import { useState, useEffect } from 'react';

const ProfileForm = ({ profile, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    description: '',
    address: '',
    coordinates: []
  });

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      <input
        type="text"
        placeholder="Photo URL"
        value={formData.photo}
        onChange={(e) => setFormData({...formData, photo: e.target.value})}
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
      />
      <input
        type="text"
        placeholder="Address"
        value={formData.address}
        onChange={(e) => setFormData({...formData, address: e.target.value})}
      />
      <div className="coordinates-input">
        <input
          type="number"
          placeholder="Latitude"
          value={formData.coordinates[0] || ''}
          onChange={(e) => setFormData({
            ...formData, 
            coordinates: [parseFloat(e.target.value), formData.coordinates[1]]
          })}
        />
        <input
          type="number"
          placeholder="Longitude"
          value={formData.coordinates[1] || ''}
          onChange={(e) => setFormData({
            ...formData, 
            coordinates: [formData.coordinates[0], parseFloat(e.target.value)]
          })}
        />
      </div>
      <div className="form-buttons">
        <button type="submit" className="save-btn">Save</button>
        <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
      </div>
    </form>
  );
};

export default ProfileForm;
