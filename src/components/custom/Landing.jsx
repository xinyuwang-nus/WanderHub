import React, { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Landing() {
  const mapRef = useRef(null);

  useEffect(() => {
    // Load the Google Maps JavaScript API and initialize the map
    const loadGoogleMapsAPI = () => {
      if (window.google && window.google.maps) {
        initializeMap();
      } else {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`; 
        script.async = true;
        script.defer = true;
        script.onload = initializeMap;
        document.head.appendChild(script);
      }
    };

    const initializeMap = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            renderMap({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("Error fetching user location:", error);
            renderMap({ lat: 0, lng: 0 }); // Default location
          }
        );
      } else {
        console.error("Geolocation not supported.");
        renderMap({ lat: 0, lng: 0 }); // Default location
      }
    };

    const renderMap = (center) => {
      new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 12,
        disableDefaultUI: true, // Hides default controls
        styles: [
          {
            elementType: "geometry",
            stylers: [{ color: "#e0e0e0" }], // Grey background
          },
          {
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }], // Hide default icons
          },
          {
            elementType: "labels.text.fill",
            stylers: [{ color: "#757575" }], // Grey labels
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }], // White roads
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#8c8c8c" }], // Light grey road labels
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#c9d6de" }], // Light greyish water
          },
        ],
      });
    };

    loadGoogleMapsAPI();
  }, []);

  return (
    <div className="relative h-screen w-screen">
      {/* Map Container */}
      <div ref={mapRef} className="absolute inset-0 z-0"></div>

      {/* Overlay Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center font-afacad bg-black bg-opacity-50">
        <div>
          <h1 className="font-light">
            <span className="text-[50px] text-gray-200">
              Discover Your Next Destination with
            </span>
            <br />
            <span className="text-[80px] font-medium text-white">WanderHub</span>
          </h1>
          <p className="text-xl text-gray-300 font-light">
            Explore new horizons and find inspiration for your next adventure.
          </p>
          <div className="mt-8 flex justify-center gap-2">
            <Link to={"/create-trip"}>
              <Button variant="secondary" className="text-lg text-black">
                Create Trip
              </Button>
            </Link>
            <Link to={"/view-blogs"}>
              <Button variant="secondary" className="text-lg text-black">
                View Blogs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;