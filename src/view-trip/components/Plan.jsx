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
            time: "Evening",
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
            time: "Evening",
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

  // const timeSections = ["Morning", "Afternoon", "Evening", "Night"];

  return (
    <div>
      <h2 className="text-2xl mt-5 font-medium">Plan</h2>

      <div>
        {tripData?.itinerary?.map((item, index) => (
          <div key={index} className="my-5">
            <h2 className="text-xl my-2">{item.day}</h2>
            {/* <h3 className="text-lg text-gray-500">{section}</h3> */}
            {/* <div className="grid md:grid-cols-2 gap-5"> */}
            <div className="grid md:grid-cols-2 gap-5 auto-rows-fr">
              {item.plan.map((place, index) => (
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



// WITH TIME SECTIONS

//   return (
//     <div>
//       <h2 className="text-2xl mt-5 font-medium">Plan</h2>

//       <div>
//         {tripData?.itinerary?.map((item, index) => (
//           <div key={index} className="my-5">
//             <h2 className="text-xl my-2">{item.day}</h2>
//             {/* Iterate over each fixed time section */}
//             {timeSections.map((section) => (
//               <div key={section} className="mb-5">
//                 <h3 className="text-lg text-gray-500">{section}</h3>
//                 <div className="grid md:grid-cols-2 gap-5">
//                   {item.plan
//                     .filter((place) => place.time === section)
//                     .map((place, index) => (
//                       <div key={index} className="my-1">
//                         <PlanItem place={place} />
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

export default Plan;

// import React, { useState } from "react";
// import { DndContext, closestCenter } from "@dnd-kit/core";
// import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
// import PlanItem from "./PlanItem";

// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

// function SortableItem({ id, place }) {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       <PlanItem place={place} />
//     </div>
//   );
// }

// function Plan({ trip }) {
//   const [tripData, setTripData] = useState({
//     itinerary: [
//       {
//         day: "Day 1: Arrival and City Tour",
//         plan: [
//           {
//             id: 1,
//             time: "Morning",
//             name: "Hotel Check-in",
//             desc: "Arrive at Luxury Inn and check into your room.",
//             duration: "1 hour",
//           },
//           {
//             id: 2,
//             time: "Morning",
//             name: "Cityville Museum",
//             desc: "Visit the local history museum and explore its famous exhibits.",
//             duration: "2 hours",
//           },
//           {
//             id: 3,
//             time: "Afternoon",
//             name: "Lunch at Cityville Diner",
//             desc: "Enjoy a traditional meal at a popular local diner.",
//             duration: "1.5 hours",
//           },
//           {
//             id: 4,
//             time: "Afternoon",
//             name: "City Park",
//             desc: "Relax at the beautiful park in the center of Cityville.",
//             duration: "1 hour",
//           },
//           {
//             id: 5,
//             time: "Night",
//             name: "Dinner at Seaside Restaurant",
//             desc: "Enjoy a delicious seafood dinner with ocean views.",
//             duration: "2 hours",
//           },
//         ],
//       },
//     ],
//   });

//   const timeSections = ["Morning", "Afternoon", "Evening", "Night"];

//   const handleDragEnd = (event) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       setTripData((prevData) => {
//         const newPlans = [...prevData.itinerary[0].plan];
//         const oldIndex = newPlans.findIndex((item) => item.id === active.id);
//         const newIndex = newPlans.findIndex((item) => item.id === over.id);
//         arrayMove(newPlans, oldIndex, newIndex);

//         const newData = {
//           ...prevData,
//           itinerary: [{ ...prevData.itinerary[0], plan: newPlans }],
//         };

//         return newData;
//       });
//     }
//   };

//   return (
//     <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//       <h2 className="text-2xl mt-5 font-medium">Plan</h2>
//       <div>
//         {tripData?.itinerary?.map((item, index) => (
//           <div key={index} className="my-5">
//             <h2 className="text-lg">{item.day}</h2>
//             {timeSections.map((section) => (
//               <div key={section} className="mb-4">
//                 <h3 className="text-xl font-semibold">{section}</h3>
//                 <SortableContext
//                   items={item.plan.filter((place) => place.time === section).map((place) => place.id)}
//                   strategy={verticalListSortingStrategy}
//                 >
//                   <div className="grid md:grid-cols-2 gap-5">
//                     {item.plan
//                       .filter((place) => place.time === section)
//                       .map((place, index) => (
//                         <SortableItem key={place.id} id={place.id} place={place} />
//                       ))}
//                   </div>
//                 </SortableContext>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </DndContext>
//   );
// }

// export default Plan;
