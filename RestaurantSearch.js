// RestaurantSearch.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet-control-geocoder';
import './restaurantsearch.css';

// SmallMap Component to display a small map for each restaurant
const SmallMap = ({ latitude, longitude }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapContainerRef.current).setView([latitude, longitude], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstanceRef.current);
      L.marker([latitude, longitude]).addTo(mapInstanceRef.current);
    } else {
      mapInstanceRef.current.setView([latitude, longitude], 15);
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

const RestaurantSearch = () => {
  const [location, setLocation] = useState('');
  const [restaurants, setRestaurants] = useState([]);
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
          fetchRestaurants(latitude, longitude);
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

  const fetchRestaurants = async (latitude, longitude) => {
    const options = {
      method: 'GET',
      url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
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
      const filteredRestaurants = data
        .filter(restaurant => restaurant.name)
        .sort((a, b) => (b.rating || 0) - (a.rating || 0)); // Sort from high to low rating

      setRestaurants(filteredRestaurants);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      alert('An error occurred while fetching restaurant data. Please try again later.');
      setIsLoading(false);
    }
  };

  const updateMapWithRestaurants = () => {
    const map = mapInstanceRef.current;
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    const bounds = [];
    restaurants.forEach((restaurant) => {
      const { latitude, longitude, name, address_obj, rating, website } = restaurant;
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
        bounds.push([latitude, longitude]);
      }
    });

    if (bounds.length > 0) {
      map.fitBounds(bounds); // Adjust map zoom to fit all markers
    }
  };

  useEffect(() => {
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map('restaurantMap').setView([coordinates.lat, coordinates.lng], 11);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstanceRef.current);
    } else {
      updateMapWithRestaurants();
    }
  }, [restaurants]);

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([coordinates.lat, coordinates.lng], 11);
    }
  }, [coordinates.lat, coordinates.lng]);

  const handleSearch = () => {
    fetchCoordinates();
  };

  return (
    <div className="restaurant-search">
      <h2>Restaurant Search</h2>
      <div className="search-inputs">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} disabled={isLoading} className="search-button">
          {isLoading ? 'Searching...' : 'Search Restaurants'}
        </button>
      </div>
      <div id="restaurantMap" style={{ height: '600px', marginTop: '20px', borderRadius: '8px' }}></div>
      <div className="results">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          restaurants.map((restaurant) => (
            <div key={restaurant.location_id} className="restaurant-card">
              <div className="restaurant-info">
                <h3>{restaurant.name}</h3>
                <p><strong>Address:</strong> 
                  {restaurant.address_obj?.street1 || 'Not available'}, 
                  {restaurant.address_obj?.city || 'Not available'}, 
                  {restaurant.address_obj?.country || 'Not available'}
                </p>
                <p><strong>Rating:</strong> {restaurant.rating || 'No rating'}</p>
                <p><strong>Number of Reviews:</strong> {restaurant.num_reviews || 'No reviews'}</p>
                <p><strong>Ranking:</strong> {restaurant.ranking || 'Not available'}</p>
                <p><strong>Website:</strong> <a href={restaurant.website} target="_blank" rel="noopener noreferrer">
                  {restaurant.website || 'Not available'}
                </a></p>
                <p><strong>Cuisine:</strong> {restaurant.cuisine?.map(c => c.name).join(', ') || 'No cuisine listed'}</p>
                <p><strong>Distance:</strong> {restaurant.distance ? `${restaurant.distance} km` : 'Not available'}</p>
              </div>
              <div className="map-and-image">
                {restaurant.latitude && restaurant.longitude && <SmallMap latitude={restaurant.latitude} longitude={restaurant.longitude} />}
                {restaurant.photo?.images?.original?.url && (
                  <div className="restaurant-bottom-image">
                    <img
                      src={restaurant.photo.images.original.url}
                      alt={restaurant.name}
                      className="restaurant-img"
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

export default RestaurantSearch;