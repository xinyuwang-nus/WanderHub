export const AI_PROMPT='Generate Travel Plan for Destination : {destination}, for {duration} days for {traveler} with hotel budget of {budget}, with activity preference in {activities}, give me hotels options list with hotel name, hotel address, price, hotel image url, geo coordinates, rating, descriptions and suggest daily plans with place name, place details, place image url, geo coordinates, place address, pricing, time travel each of the location with each day plan. All the information should be in JSON format. If you cannot access real-time information, used the currently known information or estimate.'


/*
 
    "trip": {
        "hotels": [
            {
                "name": "The Novotel Toronto Centre",
                "address": "45 The Esplanade, Toronto, ON M5E 1A7, Canada",
                "priceRange": {
                    "min": 120,
                    "max": 200
                },
                "imageUrl": "https://example.com/novotel_toronto.jpg",
                "geoCoordinates": {
                    "latitude": 43.6489,
                    "longitude": -79.3766
                },
                "rating": 4,
                "description": "Modern hotel in a central location, close to many attractions."
            },
            {
                "name": "Delta Hotels by Marriott Toronto",
                "address": "100 Harbour St, Toronto, ON M5J 1G1, Canada",
                "priceRange": {
                    "min": 100,
                    "max": 180
                },
                "imageUrl": "https://example.com/delta_toronto.jpg",
                "geoCoordinates": {
                    "latitude": 43.6404,
                    "longitude": -79.3809
                },
                "rating": 4.2,
                "description": "Comfortable hotel with convenient access to the waterfront and downtown."
            },
            {
                "name": "Chelsea Hotel Toronto",
                "address": "33 Gerrard St W, Toronto, ON M5G 1Z3, Canada",
                "priceRange": {
                    "min": 100,
                    "max": 150
                },
                "imageUrl": "https://example.com/chelsea_hotel.jpg",
                "geoCoordinates": {
                    "latitude": 43.656,
                    "longitude": -79.386
                },
                "rating": 4,
                "description": "Stylish hotel in a vibrant neighborhood, close to shops and restaurants."
            }
        ],
        "dailyPlans": [
            {
                "day": 1,
                "theme": "Downtown and Waterfront",
                "locations": [
                    {
                        "name": "CN Tower",
                        "details": "Iconic tower with panoramic views.",
                        "imageUrl": "https://example.com/cntower.jpg",
                        "geoCoordinates": {
                            "latitude": 43.6426,
                            "longitude": -79.3871
                        },
                        "address": "297 Bremner Blvd, Toronto, ON M5V 3L9, Canada",
                        "pricing": "adult: 40, child: 20",
                        "estimatedTime": "30 min (public transport)"
                    },
                    {
                        "name": "Harbourfront Centre",
                        "details": "Waterfront area with shops, restaurants, and events.",
                        "imageUrl": "https://example.com/harbourfront.jpg",
                        "geoCoordinates": {
                            "latitude": 43.6404,
                            "longitude": -79.3809
                        },
                        "address": "235 Queens Quay W, Toronto, ON M5J 2G8, Canada",
                        "pricing": "Varies",
                        "estimatedTime": "15 min (walk)"
                    }
                ]
            },
            {
                "day": 2,
                "theme": "Culture and History",
                "locations": [
                    {
                        "name": "Royal Ontario Museum (ROM)",
                        "details": "World-renowned museum of natural history and world cultures.",
                        "imageUrl": "https://example.com/rom.jpg",
                        "geoCoordinates": {
                            "latitude": 43.6677,
                            "longitude": -79.3943
                        },
                        "address": "100 Queen's Park, Toronto, ON M5S 2C6, Canada",
                        "pricing": "adult: 25",
                        "estimatedTime": "3 hours"
                    },
                    {
                        "name": "St. Lawrence Market",
                        "details": "Historic marketplace with food and crafts.",
                        "imageUrl": "https://example.com/stlawrencemarket.jpg",
                        "geoCoordinates": {
                            "latitude": 43.6459,
                            "longitude": -79.3732
                        },
                        "address": "92-95 Front St E, Toronto, ON M5E 1C3, Canada",
                        "pricing": "Varies",
                        "estimatedTime": "depending on shopping"
                    }
                ]
            },
            {
                "day": 3,
                "theme": "Entertainment and Parks",
                "locations": [
                    {
                        "name": "Casa Loma",
                        "details": "Gothic Revival style castle.",
                        "imageUrl": "https://example.com/casaloma.jpg",
                        "geoCoordinates": {
                            "latitude": 43.6733,
                            "longitude": -79.4061
                        },
                        "address": "1 Austin Terrace, Toronto, ON M5R 1X8, Canada",
                        "pricing": "adult: 30"
                        "estimatedTime": "2 hours"
                    },
                    {
                        "name": "High Park",
                        "details": "Large park with walking trails, gardens, and zoo.",
                        "imageUrl": "https://example.com/highpark.jpg",
                        "geoCoordinates": {
                            "latitude": 43.6614,
                            "longitude": -79.4805
                        },
                        "address": "1873 Bloor St W, Toronto, ON M6R 2Z3, Canada",
                        "pricing": "Free",
                        "estimatedTime": "depending on activities, such as picnicking, hiking, or visiting the zoo"
                    }
                ]
            },
        ]
    }

 */