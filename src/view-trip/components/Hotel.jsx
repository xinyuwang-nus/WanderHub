import React from "react";
import { useState, useEffect } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GooglePhoto";

function Hotel({ hotel }) {
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPhoto();
  }, [hotel]);

  const getPhoto = async () => {
    try {
      const data = { textQuery: hotel?.name };
      const response = await GetPlaceDetails(data);
      const photoName = response?.data?.places?.[0]?.photos?.[0]?.name;
      if (photoName) {
        const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);
        setImage(photoUrl);
      } else {
        console.warn("Photo name not found in the response.");
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    } finally {
      setLoading(false);
    }
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
      </div>
    </div>
  );
}

export default Hotel;
