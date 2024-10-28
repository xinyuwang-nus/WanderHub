import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet-control-geocoder';
import './attractionsearch.css';

// SmallMap Component to display a small map for each attraction
const SmallMap = ({ latitude, longitude }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapContainerRef.current).setView([latitude, longitude], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstanceRef.current);
      L.marker([latitude, longitude]).addTo(mapInstanceRef.current);
    }

    // Clean up the map when the component is unmounted
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude]);

  return <div ref={mapContainerRef} className="small-map"></div>;
};

const AttractionSearch = () => {
  const [location, setLocation] = useState('');
  const [attractions, setAttractions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: 51.505, lng: -0.09 }); // Default to London
  const mapInstanceRef = useRef(null);

  const apiKey = process.env.REACT_APP_APIKEY;

  const fetchCoordinates = async () => {
    if (!location) {
      alert('Please enter a location.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get('https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete', {
        params: {
          query: location,
          lang: 'en_US',
        },
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        },
      });

      const results = response.data.data.Typeahead_autocomplete.results;
      if (results && results.length > 0) {
        const bestMatch = results.find(result => result.detailsV2 && result.detailsV2.geocode);
        if (bestMatch) {
          const { latitude, longitude } = bestMatch.detailsV2.geocode;
          setCoordinates({ lat: latitude, lng: longitude });
          fetchAttractions(latitude, longitude);
        } else {
          alert('Unable to find geocode information for the specified location.');
          setIsLoading(false);
        }
      } else {
        alert('Location not found. Please try a different search term.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      alert('An error occurred while fetching location data. Please try again later.');
      setIsLoading(false);
    }
  };

  const fetchAttractions = async (latitude, longitude) => {
    const options = {
      method: 'GET',
      url: 'https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng',
      params: {
        latitude: latitude,
        longitude: longitude,
        limit: '100',
        currency: 'USD',
        lang: 'en_US',
        distance: '5000', // Set a large distance to cover the whole city
      },
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      const data = response.data.data;
      const recommendedCategories = [
        'Attraction', 'Theme Park', 'Zoo', 'Amusement Park', 'Water Park', 'Landmark',
        'Museum', 'Resort', 'Park', 'National Park', 'Aquarium'
      ];

      const filteredAttractions = data
        .filter(attraction => attraction.name && recommendedCategories.includes(attraction.category?.name))
        .sort((a, b) => (b.num_reviews || 0) - (a.num_reviews || 0) || (b.rating || 0) - (a.rating || 0)); 

      setAttractions(filteredAttractions);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching attractions:', error);
      alert('An error occurred while fetching attraction data. Please try again later.');
      setIsLoading(false);
    }
  };

  const updateMapWithAttractions = () => {
    const map = mapInstanceRef.current;
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    const bounds = L.latLngBounds(); // Create a bounds object to extend

    attractions.forEach((attraction) => {
      const { latitude, longitude, name, address_obj, rating, website } = attraction;
      if (latitude && longitude) {
        const marker = L.marker([latitude, longitude]).addTo(map);
        const popupContent = `
          <div>
            <h3>${name}</h3>
            <p><strong>Address:</strong> ${address_obj?.street1 || ''}, ${address_obj?.city || ''}, ${address_obj?.country || ''}</p>
            <p><strong>Rating:</strong> ${rating || 'No rating'}</p>
            <p><strong>Website:</strong> <a href="${website}" target="_blank">${website || 'Not available'}</a></p>
          </div>
        `;
        marker.bindPopup(popupContent);
        bounds.extend([latitude, longitude]); // Extend the bounds to include this marker
      }
    });

    // If there are attractions, fit the map to the bounds
    if (attractions.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] }); // Add padding to the bounds
    } else {
      map.setView([coordinates.lat, coordinates.lng], 11);
    }
  };

  useEffect(() => {
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map('attractionMap').setView([coordinates.lat, coordinates.lng], 11);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstanceRef.current);
    } else {
      updateMapWithAttractions();
    }
  }, [attractions]);

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([coordinates.lat, coordinates.lng], 11);
    }
  }, [coordinates.lat, coordinates.lng]);

  const handleSearch = () => {
    fetchCoordinates();
  };

  return (
    <div className="attraction-search">
      <h2>Attraction Search</h2>
      <div className="search-inputs">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} disabled={isLoading} className="search-button">
          {isLoading ? 'Searching...' : 'Search Attractions'}
        </button>
      </div>
      <div id="attractionMap" style={{ height: '600px', marginTop: '20px', borderRadius: '8px' }}></div>
      <div className="results">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          attractions.map((attraction) => (
            <div key={attraction.location_id} className="attraction-card">
              <div className="attraction-info">
                <h3>{attraction.name}</h3>
                <p><strong>Address:</strong> 
                  {attraction.address_obj?.street1 || 'Not available'}, 
                  {attraction.address_obj?.city || 'Not available'}, 
                  {attraction.address_obj?.country || 'Not available'}
                </p>
                <p><strong>Rating:</strong> {attraction.rating || 'No rating'}</p>
                <p><strong>Number of Reviews:</strong> {attraction.num_reviews || 'No reviews'}</p>
                <p><strong>Ranking:</strong> {attraction.ranking || 'Not available'}</p>
                <p><strong>Website:</strong> <a href={attraction.website} target="_blank" rel="noopener noreferrer">
                  {attraction.website || 'Not available'}
                </a></p>
                <p><strong>Amenities:</strong> {attraction.amenities?.join(', ') || 'No amenities listed'}</p>
                <p><strong>Distance:</strong> {attraction.distance ? `${attraction.distance} km` : 'Not available'}</p>
              </div>
              <div className="attraction-media">
                {attraction.latitude && attraction.longitude && (
                  <div className="map-container">
                    <SmallMap latitude={attraction.latitude} longitude={attraction.longitude} />
                  </div>
                )}
                {attraction.photo?.images?.original?.url && (
                  <div className="image-container">
                    <img
                      src={attraction.photo.images.original.url}
                      alt={attraction.name}
                      style={{ width: '100%', borderRadius: '8px' }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AttractionSearch;