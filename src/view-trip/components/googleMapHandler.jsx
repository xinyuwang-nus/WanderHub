import { MAP_STYLES, DEFAULT_CENTER, POLYLINE_STYLE } from "./mapUtils";
import locationIcon from "./location.png";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GooglePhoto"; // Import image logic

export const initializeGoogleMap = (mapRef, tripData) => {
  const mapInstance = new window.google.maps.Map(mapRef.current, {
    center: DEFAULT_CENTER,
    zoom: 12,
    styles: MAP_STYLES,
  });

  const bounds = new window.google.maps.LatLngBounds();
  const infoWindowInstance = new window.google.maps.InfoWindow();

  const getImageUrl = async (placeName) => {
    try {
      const data = { textQuery: placeName };
      const response = await GetPlaceDetails(data);
      return PHOTO_REF_URL.replace(
        "{NAME}",
        response?.data?.places?.[0]?.photos?.[0]?.name || ""
      );
    } catch (error) {
      console.error("Error fetching place photo:", error);
      return "/placeholder-image-square.jpeg";
    }
  };

  tripData?.trip?.dailyPlans?.forEach((plan) => {
    const dayTitle = `Day ${plan?.day}`;
    const polylineCoordinates = [];

    plan.locations.forEach((location) => {
      const { latitude, longitude, name } = location.geoCoordinates;

      if (latitude && longitude) {
        polylineCoordinates.push({ lat: latitude, lng: longitude });

        const marker = new window.google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: mapInstance,
          title: name,
          icon: {
            url: locationIcon,
            scaledSize: new window.google.maps.Size(30, 30),
          },
        });

        marker.addListener("click", async () => {
          const imageUrl = await getImageUrl(location.name);

          const content = `
          <div style="font-family: 'Afacad Flux', sans-serif; max-width: 320px; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <div style="display: flex; gap: 10px; padding: 10px;">
              <img 
                src="${imageUrl}" 
                alt="${location.name}" 
                style="width: 100px; height: 100px; border-radius: 8px; object-fit: cover;" 
              />
              <div style="flex: 1;">
                <h2 style="margin: 0; font-size: 16px; font-weight: bold; color: #333;">${dayTitle}</h2>
                <h3 style="margin: 5px 0 10px 0; font-size: 15px; font-weight: 500; color: #555;">${
                  location.name
                }</h3>
                <p style="margin: 0; font-size: 14px; color: #777;">${
                  location.address || "Address not available"
                }</p>
              </div>
            </div>
            <div style="padding: 10px; border-top: 1px solid #eee;">
              <p style="margin: 0; font-size: 14px; color: #666; line-height: 1.5;">
                <strong>Details:</strong> ${location.details || "N/A"}<br/>
                <strong>Time:</strong> ${location.estimatedTime || "N/A"}<br/>
                <strong>Price:</strong> ${location.pricing || "N/A"}
              </p>
            </div>
            <div style="padding: 10px; border-top: 1px solid #eee; display: flex; gap: 10px; justify-content: center;">
              <button 
                onclick="window.open('https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  location.name
                )}', '_blank')" 
                style="background: white; color: black; border: 1px solid black; padding: 8px 12px; border-radius: 5px; font-size: 14px; cursor: pointer;">
                Google Maps
              </button>
              <button 
                onclick="window.open('https://www.youtube.com/results?search_query=${encodeURIComponent(
                  location.name
                )}', '_blank')" 
                style="background: white; color: black; border: 1px solid black; padding: 8px 12px; border-radius: 5px; font-size: 14px; cursor: pointer;">
                YouTube
              </button>
            </div>
          </div>
        `;

          infoWindowInstance.setContent(content);
          infoWindowInstance.open(mapInstance, marker);
        });

        bounds.extend(marker.getPosition());
      }
    });

    const polyline = new window.google.maps.Polyline({
      path: polylineCoordinates,
      ...POLYLINE_STYLE,
    });

    polyline.setMap(mapInstance);
  });

  mapInstance.fitBounds(bounds);
};

export const loadGoogleMapsAPI = (initializeMapCallback) => {
  if (window.google && window.google.maps) {
    initializeMapCallback();
  } else {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_GOOGLE_PLACE_API_KEY
    }&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMapCallback;
    document.head.appendChild(script);
  }
};
