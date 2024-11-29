import React from "react";
import { useState, useEffect } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GooglePhoto";
import { Button } from "../../components/ui/button";
import { CiLocationOn } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";

function Hotel({ destination, hotel }) {
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPhoto();
  }, []);

  const getPhoto = async () => {
    try {
      const data = { textQuery: hotel?.name };
      const response = await GetPlaceDetails(data);
      const photoUrl = PHOTO_REF_URL.replace("{NAME}", response?.data?.places?.[0]?.photos?.[0]?.name);
      setImage(photoUrl);
    } catch (error) {
      console.error("Error fetching place photo:", error);
    } finally {
      setLoading(false);
    }
  };

  const openGoogleMaps = () => {
    const searchQuery = encodeURIComponent(destination + ": " + hotel?.name || hotel?.address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;
    window.open(googleMapsUrl, "_blank");
  };

  const openYouTubeSearch = () => {
    const searchQuery = encodeURIComponent(destination + ": " + hotel?.name);
    const youtubeUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;
    window.open(youtubeUrl, "_blank");
  };

  return (
    <div className="transition-all border rounded-xl p-3">
      {loading ? (
        <div className="w-full h-[180px] flex items-center justify-center bg-gray-200 rounded-xl">
          <p>Loading image...</p>
        </div>
      ) : (
        <img
          src={image ? image : "/placeholder-image-square.jpeg"}
          className="rounded-xl h-[180px] w-full object-cover"
          style={{ filter: "saturate(0.5)" }}
        />
      )}
      <div className="my-1 flex flex-col">
        <h2 className="mt-1">{hotel?.name}</h2>
        <p className="text-sm font-light text-gray-500">{hotel?.address}</p>
        <p className="text-sm font-light">{hotel?.description}</p>
        <p className="text-xs font-light text-gray-500">
          {hotel?.priceRange?.min} - {hotel?.priceRange?.max} USD
        </p>
        <div className="flex gap-2 mt-2">
            {/* Google Maps */}
            <Button size="sm" variant="ghost" onClick={openGoogleMaps}>
              <CiLocationOn />
            </Button>
            {/* YouTube Videos */}
            <Button size="sm" variant="ghost" onClick={openYouTubeSearch}>
              <CiPlay1 />
            </Button>
          </div>
      </div>
    </div>
  );
}

export default Hotel;
