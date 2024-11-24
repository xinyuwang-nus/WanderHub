import React from "react";

function Accommodation({ tripData }) {

  return (
    <div>
      <h2 className="text-2xl mt-5 font-medium">Accommodation</h2>

      <div className='grid grid-cols-2 my-7 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {tripData?.trip?.hotels?.map((hotel, index) => (
          <div key={index} className="hover:scale-105 transition-all">
            <img src="/placeholder-image.jpeg" className="rounded-xl"/>
            <div className="my-1 flex flex-col">
              <h2>{hotel?.name}</h2>
              <h2 className="text-sm font-light">{hotel?.description}</h2>
              <h2 className="text-sm font-light text-gray-500">{hotel?.address}</h2>
              <h2 className="text-xs font-light text-gray-500"> {hotel?.price?.min} - {hotel?.price?.max} USD</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accommodation;
