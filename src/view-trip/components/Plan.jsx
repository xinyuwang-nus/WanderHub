import React from "react";
import PlanItem from "./PlanItem";

function Plan({ tripData }) {
  
  return (
    <div>
      <h2 className="text-2xl mt-5 font-medium">Daily Plan</h2>

      <div>
        {tripData?.trip?.dailyPlans?.map((plan, index) => (
          <div key={index} className="my-5">
            <h2 className="text-xl my-2">Day {plan?.day}</h2>

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



// WITH TIME SECTIONS
  // const timeSections = ["Morning", "Afternoon", "Evening", "Night"];

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
