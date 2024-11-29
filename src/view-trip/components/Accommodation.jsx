import React from "react";
import Hotel from "./Hotel";

function Accommodation({ tripData }) {
  return (
    <div>
      <h2 className="text-2xl mt-5 font-medium">Accommodation</h2>

      <div className="grid grid-cols-2 my-7 md:grid-cols-3 xl:grid-cols-3 gap-5">
        {tripData?.trip?.hotels?.map((hotel, index) => (
          <Hotel key={index} destination={tripData.selection.destination.label} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default Accommodation;
