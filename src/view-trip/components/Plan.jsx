import React from "react";
import PlanItem from "./PlanItem";

function Plan({ trip }) {
  const tripData = {
    itinerary: [
      {
        day: "Day 1: Arrival and City Tour",
        plan: [
          {
            time: "Morning",
            name: "Hotel Check-in",
            desc: "Arrive at Luxury Inn and check into your room.",
            duration: "1 hour",
          },
          {
            time: "Morning",
            name: "Cityville Museum",
            desc: "Visit the local history museum and explore its famous exhibits.",
            duration: "2 hours",
          },
          {
            time: "Afternoon",
            name: "Lunch at Cityville Diner",
            desc: "Enjoy a traditional meal at a popular local diner.",
            duration: "1.5 hours",
          },
          {
            time: "Afternoon",
            name: "City Park",
            desc: "Relax at the beautiful park in the center of Cityville.",
            duration: "1 hour",
          },
          {
            time: "Night",
            name: "Dinner at Seaside Restaurant",
            desc: "Enjoy a delicious seafood dinner with ocean views.",
            duration: "2 hours",
          },
        ],
      },
      {
        day: "Day 2: Outdoor Adventure",
        plan: [
          {
            time: "Morning",
            name: "Breakfast at Mountain Lodge",
            desc: "Start your day with a hearty breakfast before your adventure.",
            duration: "1 hour",
          },
          {
            time: "Morning",
            name: "Mountain Hike",
            desc: "Enjoy a scenic hike through the mountains with amazing views.",
            duration: "3 hours",
          },
          {
            time: "Afternoon",
            name: "Lunch at Highland Cafe",
            desc: "Refuel with a tasty meal at a cafe nestled in the mountains.",
            duration: "1.5 hours",
          },
          {
            time: "Afternoon",
            name: "Zipline Adventure",
            desc: "Experience an adrenaline-filled zipline ride over the valley.",
            duration: "2 hours",
          },
          {
            time: "Night",
            name: "Campfire Dinner",
            desc: "End the day with a relaxing dinner by the campfire.",
            duration: "2 hours",
          },
        ],
      },
      {
        day: "Day 3: Departure",
        plan: [
          {
            time: "Morning",
            name: "Breakfast at Hotel",
            desc: "Enjoy a leisurely breakfast before checking out.",
            duration: "1 hour",
          },
          {
            time: "Morning",
            name: "Hotel Check-out",
            desc: "Pack up and check out of the hotel.",
            duration: "30 minutes",
          },
          {
            time: "Afternoon",
            name: "Airport Transfer",
            desc: "Catch a ride to the airport for your flight home.",
            duration: "1 hour",
          },
        ],
      },
    ],
  };
  
  return (
    <div>
      <h2 className="text-2xl mt-5 font-medium">Plan</h2>

      <div>
        {tripData?.itinerary?.map((item, index) => (
          <div className='my-5'>
            <h2 className="text-lg">{item.day}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {item.plan.map((place, index) => (
                <div className="my-1">
                  <PlanItem place={place} />
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
