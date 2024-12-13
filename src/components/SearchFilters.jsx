import { useState } from 'react';
import './SearchFilters.css';

const SearchFilters = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({ searchTerm: value, location: selectedLocation, department: selectedDepartment });
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setSelectedLocation(value);
    onFilterChange({ searchTerm, location: value, department: selectedDepartment });
  };

  const handleDepartmentChange = (e) => {
    const value = e.target.value;
    setSelectedDepartment(value);
    onFilterChange({ searchTerm, location: selectedLocation, department: value });
  };

  return (
    <div className="search-filters">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or skills..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="filters">
        <select value={selectedLocation} onChange={handleLocationChange}>
          <option value="">All Locations</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
        </select>
        <select value={selectedDepartment} onChange={handleDepartmentChange}>
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilters;
