import React, { useEffect, useRef } from "react";
import PlanItem from "./PlanItem";
import { MAP_CONTAINER_STYLE } from "./mapUtils";
import { loadGoogleMapsAPI, initializeGoogleMap } from "./googleMapHandler";

function Plan({ tripData }) {
  const mapRef = useRef(null);

  useEffect(() => {
    loadGoogleMapsAPI(() => initializeGoogleMap(mapRef, tripData));
  }, [tripData]);

  return (
    <div>
      <div className="mt-10">
        <h2 className="text-2xl font-medium mb-5">Trip Locations Overview</h2>
        <div ref={mapRef} style={MAP_CONTAINER_STYLE}></div>
      </div>
      <h2 className="text-2xl mt-5 font-medium">Daily Plan</h2>

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
    </div>
  );
}

export default Plan;
