
export const EXAMPLE_JSON = `
{
    "hotels": [
        {
            "name": "The Novotel Toronto Centre",
            "address": "45 The Esplanade, Toronto, ON M5E 1A7, Canada",
            "priceRange": {
                "min": 120,
                "max": 200
            },
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
            "geoCoordinates": {
                "latitude": 43.6404,
                "longitude": -79.3809
            },
            "rating": 4.2,
            "description": "Comfortable hotel with convenient access to the waterfront and downtown."
        },
    ],
    "dailyPlans": [
        {
            "day": 1,
            "theme": "Downtown and Waterfront",
            "locations": [
                {
                    "name": "CN Tower",
                    "details": "Iconic tower with panoramic views.",
                    "geoCoordinates": {
                        "latitude": 43.6426,
                        "longitude": -79.3871
                    },
                    "address": "297 Bremner Blvd, Toronto, ON M5V 3L9, Canada",
                    "pricing": "adult: 40, child: 20",
                    "estimatedTime": "2-3 hours depending on activities"
                },
                {
                    "name": "Harbourfront Centre",
                    "details": "Waterfront area with shops, restaurants, and events.",
                    "geoCoordinates": {
                        "latitude": 43.6404,
                        "longitude": -79.3809
                    },
                    "address": "235 Queens Quay W, Toronto, ON M5J 2G8, Canada",
                    "pricing": "Varies",
                    "estimatedTime": "1-2 hours depending on activities" 
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
                    "geoCoordinates": {
                        "latitude": 43.6677,
                        "longitude": -79.3943
                    },
                    "address": "100 Queen's Park, Toronto, ON M5S 2C6, Canada",
                    "pricing": "adult: 25",
                    "estimatedTime": "3 hours tour and visit"
                },
                {
                    "name": "St. Lawrence Market",
                    "details": "Historic marketplace with food and crafts.",
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
                    "geoCoordinates": {
                        "latitude": 43.6733,
                        "longitude": -79.4061
                    },
                    "address": "1 Austin Terrace, Toronto, ON M5R 1X8, Canada",
                    "pricing": "adult: 30",
                    "estimatedTime": "2 hours tour"
                },
                {
                    "name": "High Park",
                    "details": "Large park with walking trails, gardens, and zoo.",
                    "geoCoordinates": {
                        "latitude": 43.6614,
                        "longitude": -79.4805
                    },
                    "address": "1873 Bloor St W, Toronto, ON M6R 2Z3, Canada",
                    "pricing": "Free",
                    "estimatedTime": "depending on activities, such as picnicking, hiking, or visiting the zoo"
                }
            ]
        }
    ]
}
`;
