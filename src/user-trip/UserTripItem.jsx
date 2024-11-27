import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserTripItem({ tripData }) {
  const [image, setImage] = useState("/placeholder-image.jpeg");

  useEffect(() => {
    const fetchImageFromDatabase = async () => {
      try {
        const response = await fetch(`http://localhost:5038/api/trip-images/${tripData?.id}`);
        if (response.ok) {
          const data = await response.json();
          if (data.images && data.images.length > 0) {
            setImage(data.images[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching trip image:", error);
      }
    };

    if (tripData?.id) {
      fetchImageFromDatabase();
    }
  }, [tripData]);

  return (
    <Link to={`/view-trip/${tripData?.id}`}>
      <div className="hover:scale-105 transition-all">
        <img
          src={image}
          className="rounded-xl h-[180px] w-full object-cover"
          style={{ filter: "saturate(0.5)" }}
        />

        <div>
          <h2 className="text-lg text-black mt-2">
            {tripData?.selection?.destination?.label}
          </h2>
          <h2 className="text-sm font-light text-gray-500">
            {tripData?.selection?.duration} Days, {tripData?.selection?.traveler},{" "}
            {tripData?.selection?.activities}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripItem;

