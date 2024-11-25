import React from "react";
import { Link } from "react-router-dom";

function UserTripItem({ trip }) {
  return (
    <Link to={"/view-trip/" + trip?.id}>
      <div className="hover:scale-105 transition-all ">
        <img
          src={"/placeholder-image.jpeg"}
          className="object-cover rounded-xl h-[200px]"
        />
        <div>
          <h2 className="text-lg text-black mt-2">
            {trip?.selection?.destination?.label}
          </h2>
          <h2 className="text-sm font-light text-gray-500">
            {trip?.selection?.duration} Days, {trip?.selection?.traveler},{" "}
            {trip?.selection?.activities}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripItem;
