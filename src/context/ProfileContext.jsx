import { createContext, useState, useContext, useEffect } from 'react';

const ProfileContext = createContext();

export const useProfiles = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profilesData, setProfilesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const updateProfilesData = (newProfiles) => {
    setProfilesData(newProfiles);
    localStorage.setItem('profileData', JSON.stringify({ profiles: newProfiles }));
  };

  useEffect(() => {
    const loadProfiles = async () => {
      setIsLoading(true);
      try {
        const savedData = localStorage.getItem('profileData');
        if (savedData) {
          setProfilesData(JSON.parse(savedData).profiles);
        } else {
          const initialData = await import('../Components/data.json');
          setProfilesData(initialData.profiles);
        }
      } catch (error) {
        console.error('Error loading profiles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfiles();
  }, []);

  return (
    <ProfileContext.Provider value={{ profilesData, isLoading, updateProfilesData }}>
      {children}
    </ProfileContext.Provider>
  );
};
