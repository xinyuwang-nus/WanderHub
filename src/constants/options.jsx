export const SelectTravelerOptions = [
  {
    id: 0,
    title: "Not Sure Yet",
    // icon:'',
    people: "N/A",
  },
  {
    id: 1,
    title: "Myself",
    // icon:'',
    people: "1 Person",
  },
  {
    id: 2,
    title: "Couple",
    // icon:'',
    people: "2 People",
  },
  {
    id: 3,
    title: "Small Group",
    // icon:'',
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Big Group",
    // icon:'',
    people: "6 to 10 People",
  },
];

export const SelectBudgetOptions = [
  {
    id: 0,
    title: "Not Sure Yet",
    desc: "N/A",
  },
  {
    id: 1,
    title: "Economical",
    desc:'Below 100 USD per night',
    // icon:'',
  },
  {
    id: 2,
    title: "Average",
    desc:'~ 100 - 200 USD per night',
    // icon:'',
  },
  {
    id: 3,
    title: "Expensive",
    desc:'~ 200 - 300 USD per night',
    // icon:'',
  },
  {
    id: 4,
    title: "Luxury",
    desc:'400 USD and above per night',
    // icon:'',
  },
];

// export const SelectAccommodationOptions = [
//   {
//     id: 0,
//     title: "Not Sure Yet",
//     desc: "",
//   },
//   {
//     id: 1,
//     title: "Hotel",
//     desc: "Stay at a hotel for comfort and services.",
//   },
//   {
//     id: 2,
//     title: "Hostel",
//     desc: "A more affordable option with shared spaces.",
//   },
//   {
//     id: 3,
//     title: "Camping",
//     desc: "An outdoor adventure staying in nature.",
//   },
// ];

export const SelectActivityOptions = [
  {
    id: 0,
    title: "All (Don't Mind)",
    desc: "N/A",
  },
  {
    id: 1,
    title: "Sightseeing",
    desc: "Visit famous landmarks and historical places.",
  },
  {
    id: 2,
    title: "Nature",
    desc:
      "Explore natural landscapes and enjoy outdoor activities.",
  },
  {
    id: 4,
    title: "Shopping",
    desc:
      "Explore shopping districts and local markets.",
  },
  {
    id: 5,
    title: "Food Tasting",
    desc:
      "Experience local cuisine and visit renowned restaurants.",
  },
  {
    id: 6,
    title: "Entertainment",
    desc:
      "Enjoy activities such as shows, concerts or movies.",
  },
];


export const AI_PROMPT='Generate Travel Plan for Destination : {destination}, for {duration} days for {traveler} with hotel budget of {budget}, with activity preference in {activities}, give me hotels options list with hotel name, hotel address, price, hotel image url, geo coordinates, rating, descriptions and suggest daily plans with place name, place details, place image url, geo coordinates, place address, pricing, time travel each of the location with each day plan. All the information should be in JSON format. If you cannot access real-time information, used the currently known information or estimate.'