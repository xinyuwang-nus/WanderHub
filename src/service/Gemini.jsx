import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Destination : Toronto, for 3 days for 2 people with hotel budget of ~ 100 - 200 USD per night, with activity preference in Sightseeing, give me hotels options list with hotel name, hotel address, price, hotel image url, geo coordinates, rating, descriptions and suggest daily plans with place name, place details, place image url, geo coordinates, place address, pricing, time travel each of the location with each day plan. All the information should be in JSON format. If you cannot access real-time information, used the currently known information or estimate.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "tripDetails": {\n    "destination": "Toronto, Canada",\n    "duration": "3 days",\n    "travelers": 2,\n    "budget": {\n      "hotel": {\n        "perNight": {\n          "min": 100,\n          "max": 200\n        }\n      }\n    },\n    "preferences": ["Sightseeing"]\n  },\n  "hotels": [\n    {\n      "name": "Hotel X Toronto",\n      "address": "360 Bremner Blvd, Toronto, ON M5V 3N6, Canada",\n      "priceRange": {"min": 150, "max": 250}, \n      "imageUrl": "https://example.com/hotelx_toronto.jpg",  //Replace with actual image URL\n      "geoCoordinates": {"latitude": 43.6397, "longitude": -79.3966},\n      "rating": 4.5,\n      "description": "Luxury hotel with stunning city views and excellent amenities."\n    },\n    {\n      "name": "The Novotel Toronto Centre",\n      "address": "45 The Esplanade, Toronto, ON M5E 1A7, Canada",\n      "priceRange": {"min": 120, "max": 200},\n      "imageUrl": "https://example.com/novotel_toronto.jpg", //Replace with actual image URL\n      "geoCoordinates": {"latitude": 43.6489, "longitude": -79.3766},\n      "rating": 4.0,\n      "description": "Modern hotel in a central location, close to many attractions."\n    },\n    {\n      "name": "Delta Hotels by Marriott Toronto",\n      "address": "100 Harbour St, Toronto, ON M5J 1G1, Canada",\n      "priceRange": {"min": 100, "max": 180},\n      "imageUrl": "https://example.com/delta_toronto.jpg", //Replace with actual image URL\n      "geoCoordinates": {"latitude": 43.6404, "longitude": -79.3809},\n      "rating": 4.2,\n      "description": "Comfortable hotel with convenient access to the waterfront and downtown."\n    }\n  ],\n  "dailyPlans": [\n    {\n      "day": 1,\n      "theme": "Downtown Exploration",\n      "locations": [\n        {\n          "name": "CN Tower",\n          "details": "Iconic Toronto landmark offering panoramic city views.",\n          "imageUrl": "https://example.com/cn_tower.jpg", //Replace with actual image URL\n          "geoCoordinates": {"latitude": 43.6426, "longitude": -79.3871},\n          "address": "297 Bremner Blvd, Toronto, ON M5V 3L9, Canada",\n          "pricing": {"adult": 40},\n          "travelTime": "30 mins (public transport)"\n        },\n        {\n          "name": "Ripley\'s Aquarium of Canada",\n          "details": "Explore underwater wonders and diverse marine life.",\n          "imageUrl": "https://example.com/ripleys_aquarium.jpg", //Replace with actual image URL\n          "geoCoordinates": {"latitude": 43.6405, "longitude": -79.3836},\n          "address": "288 Bremner Blvd, Toronto, ON M5V 3L9, Canada",\n          "pricing": {"adult": 35},\n          "travelTime": "10 mins (walk)"\n        },\n        {\n          "name": "St. Lawrence Market",\n          "details": "Historic marketplace with diverse food vendors and local crafts.",\n          "imageUrl": "https://example.com/st_lawrence_market.jpg", //Replace with actual image URL\n          "geoCoordinates": {"latitude": 43.6459, "longitude": -79.3732},\n          "address": "92-95 Front St E, Toronto, ON M5E 1C3, Canada",\n          "pricing": "Varies",\n          "travelTime": "20 mins (streetcar)"\n        }\n      ]\n    },\n    {\n      "day": 2,\n      "theme": "Cultural & Artistic",\n      "locations": [\n        {\n          "name": "Art Gallery of Ontario (AGO)",\n          "details": "World-class art museum with a diverse collection.",\n          "imageUrl": "https://example.com/ago.jpg", //Replace with actual image URL\n          "geoCoordinates": {"latitude": 43.6532, "longitude": -79.3948},\n          "address": "317 Dundas St W, Toronto, ON M5T 1G4, Canada",\n          "pricing": {"adult": 25},\n          "travelTime": "30 mins (public transport)"\n        },\n        {\n          "name": "Kensington Market",\n          "details": "Vibrant neighbourhood with eclectic shops, cafes, and street art.",\n          "imageUrl": "https://example.com/kensington_market.jpg", //Replace with actual image URL\n          "geoCoordinates": {"latitude": 43.6557, "longitude": -79.4095},\n          "address": "Kensington Ave, Toronto, ON",\n          "pricing": "Varies",\n          "travelTime": "20 mins (streetcar)"\n        },\n        {\n          "name": "Distillery District",\n          "details": "Historic Victorian-era industrial complex now home to art galleries, boutiques, and restaurants.",\n          "imageUrl": "https://example.com/distillery_district.jpg", //Replace with actual image URL\n          "geoCoordinates": {"latitude": 43.6489, "longitude": -79.3559},\n          "address": "55 Mill St, Toronto, ON M5A 3C4, Canada",\n          "pricing": "Varies",\n          "travelTime": "30 mins (streetcar)"\n        }\n      ]\n    },\n    {\n      "day": 3,\n      "theme": "Parks and Islands",\n      "locations": [\n        {\n          "name": "High Park",\n          "details": "Large park with walking trails, gardens, and a zoo.",\n          "imageUrl": "https://example.com/high_park.jpg", //Replace with actual image URL\n          "geoCoordinates": {"latitude": 43.6614, "longitude": -79.4805},\n          "address": "1873 Bloor St W, Toronto, ON M6R 2Z3, Canada",\n          "pricing": "Free",\n          "travelTime": "30 mins (Subway)"\n        },\n        {\n          "name": "Toronto Islands",\n          "details": "Ferry ride to a group of islands with beaches, parks, and amusement park.",\n          "imageUrl": "https://example.com/toronto_islands.jpg", //Replace with actual image URL\n          "geoCoordinates": {"latitude": 43.6316, "longitude": -79.3744},\n          "address": "Jack Layton Ferry Terminal, Toronto, ON",\n          "pricing": {"ferry": 8},\n          "travelTime": "20 mins (ferry)"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Note:**  This JSON uses placeholder image URLs. You will need to replace  `https://example.com/image.jpg` with actual image URLs from a reliable source.  Prices are estimates and may vary depending on the season and availability.  Travel times are approximations and should be verified using a map application before your trip, considering traffic.  Always check official websites for the most up-to-date information on opening hours, prices, and accessibility.\n',
        },
      ],
    },
  ],
});
