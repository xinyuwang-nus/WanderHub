import React from "react";

function UserTripItem({ trip }) {
  return (
    <div className="hover:scale-105 transition-all ">
      <img
        src={"/placeholder-image.jpeg"}
        className="object-cover rounded-xl h-[200px]"
      />
      <div>
        <h2 className="text-lg">{trip?.selection?.destination?.label}</h2>
        <h2 className="text-sm text-gray-500">
          {trip?.selection?.duration} Days, {trip?.selection?.traveler}, {trip?.selection?.activities}
        </h2>
      </div>
    </div>
  );
}

export default UserTripItem;
