import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import './MapComponent.css';

const MapComponent = ({ profiles, selectedProfile }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initMap = async () => {
      setIsLoading(true);
      try {
        const mapplsClassObject = new window.mappls.Map('map', {
          center: selectedProfile ? selectedProfile.coordinates : [20.5937, 78.9629],
          zoomControl: true,
          location: true,
          zoom: selectedProfile ? 12 : 5
        });

        const profilesToShow = selectedProfile ? [selectedProfile] : profiles;

        profilesToShow.forEach(profile => {
          const marker = new window.mappls.Marker({
            map: mapplsClassObject,
            position: profile.coordinates,
            popupHtml: `<div><strong>${profile.name}</strong><br/>${profile.address}</div>`,
            draggable: false
          });
        });
      } catch (error) {
        console.error('Map initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initMap();
  }, [profiles, selectedProfile]);

  return (
    <div className="map-wrapper">
      {isLoading && <LoadingSpinner />}
      <div id="map" className={`map-view ${isLoading ? 'loading' : ''}`}></div>
    </div>
  );
};

export default MapComponent;
