<img width="200" alt="image" src="https://github.com/user-attachments/assets/5e4e14bc-18bc-445a-9ff8-a628ad13cc78">

# WanderHub

WanderHub is an innovative platform designed to revolutionize travel planning and blog sharing. It empowers users to create personalized travel itineraries and share their travel experiences through an engaging interface. By integrating powerful APIs, WanderHub delivers AI-driven insights and visually stunning content.
The platform provides a seamless experience for travelers to:
- Log in securely via Google or create a new account through WanderHub.
- Plan detailed trips, including destinations, accommodations, and activities.
- Access and manage their trip history effortlessly.
- Share reflections and stories through a blogging feature.
- Interact with a community of travelers by exploring shared trips on an interactive map with pins, likes, and sharing options.

- 🔗 [**Video Demo**](https://youtu.be/7fWhsL7q7ug?si=5DIQ3_KKCsF2V4N1)
  
##  Deployment

- **Website Link**: 🌐 [**WanderHub**](https://wanderhub-1115-0807.vercel.app/) 
- **Important**: 🚨 For server hosting, since I'm using a free instance, the server will spin down with inactivity. This could delay the **first request by 50 seconds or more**. ⏳ Please be patient while the server spins up after the initial request! 


## Tech Stack Overview

### Frontend
- **Framework**: [React](https://react.dev/)

### Backend
- **Server Framework**: [Express](https://expressjs.com/)
- **Database**: [MongoDB Atlas Cloud Database](https://www.mongodb.com/products/platform/atlas-database)
- **Runtime Environment**: [Node.js](https://nodejs.org/)

### Deployment
- **Frontend and Domain Hosting**: [Vercel](https://vercel.com/docs/frameworks/vite)
- **Server Hosting**: [Render](https://render.com/)

### Libraries and UI Resources
- [React Router](https://reactrouter.com/6.28.0/start/overview)
- [Axios](https://axios-http.com/docs/intro)
- [Shadcn UI](https://ui.shadcn.com/docs/installation/vite): For all the UI elements used
- [React Icons](https://react-icons.github.io/react-icons/): For all the icons used
- [Google Fonts](https://fonts.google.com/selection/embed): Website font: *Afacad Flux*
- [Logo Ipsum](https://logoipsum.com/): Website logo

### Third-Party APIs
#### Google APIs & Services
- **Google Maps**:
  - [Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview)
  - [Geolocation API](https://developers.google.com/maps/documentation/geolocation/overview)
  - [Places API](https://developers.google.com/maps/documentation/places/web-service/overview):
    - [Text Search](https://developers.google.com/maps/documentation/places/web-service/text-search)
    - [Place Photo](https://developers.google.com/maps/documentation/places/web-service/place-photos)
  - [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)
- **Authentication**:
  - [OAuth 2.0](https://developers.google.com/identity/sign-in/web/sign-in)

#### Other APIs
- [OpenAI API](https://platform.openai.com/docs/overview): GPT 3.5 Turbo
- [Unsplash API](https://unsplash.com/documentation)


### REST API Documentation

#### 1. Create Trip Through AI
- **URL:** `/create-trip`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "destination": "string",
    "duration": "string",
    "traveler": "string",
    "budget": "string",
    "activities": "string"
  }

---

#### **2. Save Trip**
- **URL:** `/trips`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "selection": "object",
    "trip": "object",
    "email": "string",
    "id": "string"
  }
  ```
  (The selection object is the request body of POST /create-trip)
---

#### **3. Get Trip by ID**
- **URL:** `/trips/:tripId`
- **Method:** `GET`
- **Response:** 
  ```json
  { "trip": "object" }
  ```

---

#### **4. Get User's Trips**
- **URL:** `/user-trips`
- **Method:** `GET`
- **Query Params:** `email=string`
- **Response:** Array of trips.

---

#### **5. Delete User's Trip**
- **URL:** `/user-trips/:tripId`
- **Method:** `DELETE`
- **Query Params:** `email=string`

---

#### **6. Save Trip Images**
- **URL:** `/trip-images`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "tripId": "string",
    "images": ["string"]
  }
  ```
  (unsplash image urls)
---

#### **7. Retrieve Trip Images**
- **URL:** `/trip-images/:tripId`
- **Method:** `GET`
- **Response:** Array of images.

---

#### **8. Register User**
- **URL:** `/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
  (use bscript to hash the password, before added to database)
---

#### **9. User Login**
- **URL:** `/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
  (use bscript to validate password, and generate a JSON Web Token (JWT) to be added to localStorage, valid for 1 hour)
---

#### **10. Get User Profile**
- **URL:** `/user-profile`
- **Method:** `GET`
- **Headers:** 
  ```json
  { "Authorization": "Bearer <JWT_TOKEN>" }
  ```
- **Response:** User profile information.

---

#### **11. Save Blog**
- **URL:** `/blogs`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "title": "string",
    "content": "string",
    "author": "string",
    "email": "string",
    "location": "string",
    "mood": "string",
    "date": "string",
    "latitude": "number",
    "longitude": "number"
  }
  ```

---

#### **12. Get All Blogs**
- **URL:** `/blogs`
- **Method:** `GET`
- **Response:** Array of blogs.

---

#### **13. Delete Blog**
- **URL:** `/blogs/:blogId`
- **Method:** `DELETE`
- **Query Params:** `email=string`

---

#### **14. Like Blog**
- **URL:** `/blogs/like`
- **Method:** `POST`
- **Request Body:**
  ```json
  { "title": "string" }
  ```

---

#### **15. Share Blog**
- **URL:** `/blogs/share`
- **Method:** `POST`
- **Request Body:**
  ```json
  { "title": "string" }
  ```


