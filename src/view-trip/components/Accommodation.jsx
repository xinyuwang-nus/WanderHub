import React from "react";

function Accommodation({ trip }) {
  const tripData = {
    hotels: [
      {
        id: 1,
        name: "Luxury Inn",
        location: "Downtown, Cityville",
        pricePerNight: "$150",
        rating: 4.5,
        description:
          "A luxurious stay with all amenities in the heart of the city.",
      },
      {
        id: 2,
        name: "Mountain Retreat",
        location: "Highland Park",
        pricePerNight: "$120",
        rating: 4.7,
        description:
          "Enjoy the serenity of the mountains with comfortable lodging.",
      },
      {
        id: 3,
        name: "Seaside Paradise",
        location: "Beachfront, Oceanview",
        pricePerNight: "$180",
        rating: 4.9,
        description: "A perfect getaway with ocean views and beach access.",
      },
      {
        id: 4,
        name: "Budget Stay",
        location: "City Outskirts",
        pricePerNight: "$75",
        rating: 4.1,
        description: "Affordable accommodation for budget travelers.",
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl mt-5 font-medium">Accommodation</h2>

      <div className='grid grid-cols-2 my-7 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {tripData?.hotels?.map((hotel, index) => (
          <div className="hover:scale-105 transition-all">
            <img src="/placeholder-image.jpeg" className="rounded-xl"/>
            <div className="my-1 flex flex-col">
              <h2>{hotel?.name}</h2>
              <h2 className="text-sm">{hotel?.pricePerNight}</h2>
              <h2 className="font-light text-xs text-gray-500">{hotel?.location}</h2>
              <h2 className="text-sm text-gray-500">{hotel?.rating}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accommodation;
