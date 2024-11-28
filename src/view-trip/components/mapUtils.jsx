// Constants
export const MAP_STYLES = [
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

export const MAP_CONTAINER_STYLE = {
  width: "100%",
  height: "70vh",
  marginTop: "20px",
  borderRadius: "8px",
};

export const DEFAULT_CENTER = {
  lat: 0, 
  lng: 0,
};

export const POLYLINE_STYLE = {
  geodesic: true,
  strokeColor: "#0000FF",
  strokeOpacity: 0.8,
  strokeWeight: 1,
};
