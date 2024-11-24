import React from "react";
import { Button } from "../../components/ui/button";
import { CiLocationOn } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";

function PlanItem({ place }) {
  return (
    // <div className="hover:scale-105 transition-all flex flex-col h-full">
    <div className="transition-all flex flex-col h-full">
      <div className="border rounded-xl p-3 flex gap-5 h-full">
        <img
          src="/placeholder-image-square.jpeg"
          className="w-[150px] h-[150px] rounded-xl"
        />
        <div className="flex flex-col justify-between">
          <h2 className="text-md">{place?.name}</h2>
          <p
            className="font-light text-sm text-gray-500 break-words flex-grow"
            style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>
            {place?.address}
          </p>
          <p
            className="font-light text-sm break-words flex-grow"
            style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>
            {place?.details}
          </p>
          {/* TODO: travelTime and price (currency conversion?) */}
          {/* <h2 className="text-sm text-gray-500 my-2">{place?.travelTime}</h2> */}
          <p className="font-light text-sm text-gray-500 my-2">
            Price:
            {typeof place?.pricing === "string"
              ? place?.pricing
              : place?.pricing?.adult || "Not available"}
          </p>

          <div className="flex gap-2">
            <Button size="sm" variant="ghost">
              <CiLocationOn />
            </Button>
            <Button size="sm" variant="ghost">
              <CiPlay1 />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanItem;
