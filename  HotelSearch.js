// HotelSearch.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import L from 'leaflet';
import 'leaflet-control-geocoder';
import './hotelsearch.css';

// SmallMap Component to display a small map for each hotel
const SmallMap = ({ latitude, longitude }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      // Initialize the small map if it hasn't been initialized yet
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

  return <div ref={mapContainerRef} style={{ height: '200px', borderRadius: '8px', marginTop: '10px' }}></div>;
};

const HotelSearch = () => {
  const [location, setLocation] = useState('');
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: 51.505, lng: -0.09 }); // Default to London
  const mapInstanceRef = useRef(null); // To keep track of the main map instance

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
          fetchHotels(latitude, longitude);
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

  const fetchHotels = async (latitude, longitude) => {
    if (!arrivalDate || !departureDate) {
      alert('Please select both arrival and departure dates.');
      setIsLoading(false);
      return;
    }

    const options = {
      method: 'GET',
      url: 'https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng',
      params: {
        latitude: latitude,
        longitude: longitude,
        checkin: arrivalDate.toISOString().split('T')[0],
        checkout: departureDate.toISOString().split('T')[0],
        currency: 'USD',
        limit: '30',
        lang: 'en_US',
      },
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      const data = response.data.data;
      const filteredHotels = data.filter((hotel) => hotel.name);
      setHotels(filteredHotels);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      alert('An error occurred while fetching hotel data. Please try again later.');
      setIsLoading(false);
    }
  };

  const updateMapWithHotels = () => {
    const map = mapInstanceRef.current;
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    hotels.forEach((hotel) => {
      const { latitude, longitude, name, address_obj, phone, price, rating } = hotel;
      if (latitude && longitude) {
        const marker = L.marker([latitude, longitude]).addTo(map);
        const popupContent = `
          <div>
            <h3>${name}</h3>
            <p><strong>Address:</strong> ${address_obj?.street1 || ''}, ${address_obj?.city || ''}, ${address_obj?.country || ''}</p>
            <p><strong>Contact:</strong> ${phone || 'Not available'}</p>
            <p><strong>Price:</strong> ${price || 'Not available'}</p>
            <p><strong>Rating:</strong> ${rating || 'No rating'}</p>
          </div>
        `;
        marker.bindPopup(popupContent);
      }
    });

    // Center the map based on the search location
    if (hotels.length > 0) {
      map.setView([hotels[0].latitude, hotels[0].longitude], 13);
    }
  };

  useEffect(() => {
    if (!mapInstanceRef.current) {
      // Initialize the map only if it hasn't been initialized yet
      mapInstanceRef.current = L.map('hotelMap').setView([coordinates.lat, coordinates.lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstanceRef.current);
    } else {
      // Update map with hotel markers whenever the hotels list changes
      updateMapWithHotels();
    }
  }, [hotels]); // Update the map whenever hotels change

  useEffect(() => {
    if (mapInstanceRef.current) {
      // Update map view if coordinates change
      mapInstanceRef.current.setView([coordinates.lat, coordinates.lng], 13);
    }
  }, [coordinates.lat, coordinates.lng]); // Added missing dependencies

  const handleSearch = () => {
    fetchCoordinates();
  };

  return (
    <div className="hotel-search">
      <h2>Hotel Search</h2>
      <div className="search-inputs">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="search-input"
        />
        <DatePicker
          selected={arrivalDate}
          onChange={(date) => setArrivalDate(date)}
          placeholderText="Select arrival date"
          className="date-picker"
        />
        <DatePicker
          selected={departureDate}
          onChange={(date) => setDepartureDate(date)}
          placeholderText="Select departure date"
          className="date-picker"
        />
        <button onClick={handleSearch} disabled={isLoading} className="search-button">
          {isLoading ? 'Searching...' : 'Search Hotels'}
        </button>
      </div>
      <div id="hotelMap" style={{ height: '600px', marginTop: '20px', borderRadius: '8px' }}></div>
      <div className="results">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          hotels.map((hotel) => (
                    <div key={hotel.location_id} className="hotel-card">
                      <h3>{hotel.name}</h3>
                      <img
                        src={hotel.photo?.images?.small?.url || 'https://via.placeholder.com/150'}
                        alt={hotel.name}
                        style={{ width: '100%', borderRadius: '8px' }}
                      />
                      <p><strong>Address:</strong> 
                        {hotel.address_obj?.street1 || 'Not available'}, 
                        {hotel.address_obj?.city || 'Not available'}, 
                        {hotel.address_obj?.country || 'Not available'}
                      </p>
                      <p><strong>Postcode:</strong> {hotel.address_obj?.postalcode || 'Not available'}</p>
                      <p><strong>Contact:</strong> {hotel.phone || hotel.contact_number || 'Not available'}</p> {/* Checking alternate phone fields */}
                      <p><strong>Website:</strong> {hotel.website || hotel.business_listings?.website?.value || 'Not available'}</p> {/* Checking an alternative website source */}
                      <p><strong>Price:</strong> {hotel.price || 'Not available'}</p>
                      <p><strong>Rating:</strong> {hotel.rating || 'No rating'}</p>
                      <p><strong>Number of Reviews:</strong> {hotel.num_reviews || 'No reviews'}</p>
                      <p><strong>Ranking:</strong> {hotel.ranking || 'Not available'}</p>
                      <p><strong>Distance from Search Location:</strong> {hotel.distance ? `${hotel.distance} km` : 'Not available'}</p>
                      <p><strong>Awards:</strong> {hotel.awards?.map(award => award.display_name).join(', ') || 'No awards'}</p>
                      {hotel.latitude && hotel.longitude && <SmallMap latitude={hotel.latitude} longitude={hotel.longitude} />}
                    </div>
                  ))
        )}
      </div>
    </div>
  );
};

export default HotelSearch;