import React, { useEffect, useRef } from "react";
import PlanItem from "./PlanItem";
import locationIcon from "./location.png"; // Import custom marker icon

const GOOGLE_MAPS_API_KEY = "AIzaSyA-Lv6-6KPjSoUXuFoX1WBD4KjT2pbEvJo";

// Black-and-white map style
const mapStyles = [
  {
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }],
  },
  {
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#f5f5f5" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#eeeeee" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#c9c9c9" }],
  },
];

function Plan({ tripData }) {
  const mapRef = useRef(null);

  const mapContainerStyle = {
    width: "100%",
    height: "70vh", // Increased height for better display
    marginTop: "20px",
    borderRadius: "8px",
  };

  const defaultCenter = {
    lat: 1.3521, // Default latitude (Singapore)
    lng: 103.8198, // Default longitude (Singapore)
  };

  useEffect(() => {
    const loadGoogleMapsAPI = () => {
      if (window.google && window.google.maps) {
        initializeMap();
      } else {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initializeMap;
        document.head.appendChild(script);
      }
    };

    const initializeMap = () => {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 12,
        styles: mapStyles,
      });

      const bounds = new window.google.maps.LatLngBounds();
      const infoWindowInstance = new window.google.maps.InfoWindow();
      const service = new window.google.maps.places.PlacesService(mapInstance);

      // Add markers for all locations in dailyPlans
      tripData?.trip?.dailyPlans?.forEach((plan) => {
        const dayTitle = `Day ${plan?.day}: ${plan?.theme}`;

        plan.locations.forEach((location) => {
          const { latitude, longitude, name } = location.geoCoordinates;

          if (latitude && longitude) {
            const marker = new window.google.maps.Marker({
              position: { lat: latitude, lng: longitude },
              map: mapInstance,
              title: name,
              icon: {
                url: locationIcon,
                scaledSize: new window.google.maps.Size(30, 30),
              },
            });

            const request = {
              query: location.name,
              fields: ["photos"],
            };

            service.findPlaceFromQuery(request, (results, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK && results[0]) {
                const photoUrl =
                  results[0].photos && results[0].photos.length > 0
                    ? results[0].photos[0].getUrl()
                    : null;

                // Add click event to display infoWindow with location details and photo
                marker.addListener("click", () => {
                  const content = `
                    <div style="font-family: Arial, sans-serif; max-width: 300px;">
                      <h3 style="margin: 0; font-size: 18px; color: #007bff;">${location.name}</h3>
                      <h4 style="margin: 0; font-size: 16px; color: #007bff;">${dayTitle}</h4>
                      ${photoUrl ? `<img src="${photoUrl}" alt="${location.name}" style="width: 100%; border-radius: 8px; margin-bottom: 10px;" />` : ""}
                      <p style="font-size: 14px; color: #555;">${location.details || "Details not available"}</p>
                      <p style="font-size: 14px; color: #555;">Address: ${location.address || "N/A"}</p>
                      <p style="font-size: 14px; color: #555;">Estimated Time: ${location.estimatedTime || "N/A"}</p>
                      <p style="font-size: 14px; color: #555;">Pricing: ${location.pricing || "N/A"}</p>
                    </div>
                  `;
                  infoWindowInstance.setContent(content);
                  infoWindowInstance.open(mapInstance, marker);
                });
              }
            });

            bounds.extend(marker.getPosition());
          }
        });
      });

      mapInstance.fitBounds(bounds);
    };

    loadGoogleMapsAPI();
  }, [tripData]);

  return (
    <div>
      <h2 className="text-2xl mt-5 font-medium">Daily Plan</h2>

      {/* Daily Plan Section */}
      <div>
        {tripData?.trip?.dailyPlans?.map((plan, index) => (
          <div key={index} className="my-5">
            <h2 className="text-xl my-2">
              Day {plan?.day}: {plan?.theme}
            </h2>

            <div className="grid md:grid-cols-2 gap-5 auto-rows-fr">
              {plan.locations.map((place, index) => (
                <div key={index} className="my-1">
                  <PlanItem key={index} place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Map Section */}
      <div className="mt-10">
        <h2 className="text-xl font-medium mb-5">Trip Locations Overview</h2>
        <div ref={mapRef} style={mapContainerStyle}></div>
      </div>
    </div>
  );
}

export default Plan;