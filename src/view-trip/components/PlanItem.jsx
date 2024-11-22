import React from "react";
import { Button } from "../../components/ui/button";
import { CiLocationOn } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";

function PlanItem({ place }) {
  return (
    <div className="hover:scale-105 transition-all">
      {/* <h2 className="font-light text-sm text-gray-500">{place.time}</h2> */}
      <div className="border rounded-xl p-3 flex gap-5 mt-2">
        <img
          src="/placeholder-image-square.jpeg"
          className="w-[150px] h-[150px] rounded-xl"
        />
        <div>
          <h2 className="text-md">{place.name}</h2>
          <p className="font-light text-sm text-gray-500">{place.desc}</p>
          <h2 className="text-sm text-gray-500 my-2">{place.duration}</h2>
          <Button size="sm" variant="ghost" className="">
            <CiLocationOn />
          </Button>
          <Button size="sm" variant="ghost" className="mx-1">
            <CiPlay1 />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PlanItem;
