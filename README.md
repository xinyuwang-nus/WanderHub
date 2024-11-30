
# WanderHub

WanderHub is an innovative platform designed to revolutionize travel planning by leveraging cutting-edge technologies. It empowers users to create personalized travel itineraries, explore destinations, and share their travel experiences through an engaging and user-friendly interface. By integrating powerful APIs such as OpenAI, Google Maps, and Unsplash, WanderHub delivers real-time, AI-driven insights and visually stunning content.

- [The Deployment link of Wanderhub](https://wanderhub-1115-0807.vercel.app/)
- [The link of Wanderhub Google Drive Folder](https://drive.google.com/drive/folders/1pmpoM9JuYPt4QqqySxxQW5oW3V6mqxON?usp=sharing)
- [The link of Wanderhub Powerpoint Slides](https://drive.google.com/file/d/1v0Yen_xQbeb-beg3p5lAi3936tgKgiXt/view?usp=sharing)
- [The link of Wanderhub Report](https://drive.google.com/file/d/1BVRAyPbMdyyHOhXNI3B_9goPlkMPUQrP/view?usp=sharing)
- [The link of Video Demo of Wanderhub](https://youtu.be/7fWhsL7q7ug?si=5DIQ3_KKCsF2V4N1)
  
The platform provides a seamless experience for travelers to:
- Log in securely via Google or the WanderHub platform.
- Plan detailed trips, including destinations, accommodations, activities, and budgets.
- Access and manage their travel history effortlessly.
- Share reflections and stories through a blogging feature.
- Interact with a community of travelers by exploring shared trips on an interactive map with pins, likes, and sharing options.

WanderHub is open-source and built with a modular architecture for scalability, maintainability, and ease of integration. The backend, developed using Node.js and MongoDB, ensures robust data management and secure operations, while the React.js-based frontend delivers a responsive and visually captivating user interface.

Join us in redefining the way the world travels with WanderHub! The Link of Deployment is https://wanderhub-1115-0807.vercel.app/

# Table of Contents

1. [Introduction](#introduction)
2. [WanderHub API Integration](#wanderhub-api-integration)
   - [Google Maps API](#1-google-maps-api)
   - [Google Places API](#2-google-places-api)
   - [Maps JavaScript API](#3-maps-javascript-api)
   - [OpenAI API](#4-openai-api)
   - [Unsplash API](#5-unsplash-api)
3. [Backend Modularization](#backend-modularization)
   - [`api.js`](#1-apijs)
   - [`gpt.js`](#2-gptjs)
   - [`mongodb.js`](#3-mongodbjs)
   - [`prompt.js`](#4-promptjs)
   - [`server.js`](#5-serverjs)
4. [Frontend Features](#frontend-features)
   - [Header Component](#features-of-the-header-component)
   - [Footer Component](#features-of-the-footer-component)
   - [Register Page](#features-of-the-register-page)
   - [Sign-In Page](#features-of-the-sign-in-page)
   - [Landing Page](#features-of-the-landing-page)
   - [Create Trip Page](#features-of-create-trip-page)
   - [Create Blog Page](#features-of-create-blog-page)
   - [View Blogs Page](#features-of-view-blogs-page)
   - [User Trip Page](#features-of-user-trip-page)
   - [View Trip Page](#features-of-view-trip-page)
5. [Backend Features](#backend-features)
   - [User Authentication](#user-authentication)
   - [Trip Management](#trip-management)
   - [Blog Management](#blog-management)
   - [Image Management](#image-management)
   - [Password Management](#password-management)
   - [API Integrations](#api-integrations)
   - [Middleware and Utilities](#middleware-and-utilities)
   - [Deployment and Monitoring](#deployment-and-monitoring)
6. [Steps to Run the Project](#steps-to-run-the-project)
   - [Running the Frontend](#running-the-frontend)
   - [Running the Backend](#running-the-backend)
7. [Deployment](#Deployment)
   - [Deploying the Frontend](#Frontend-Deployment)
   - [Deploying the Backend](#Backend-Deployment)
   - [Hosting the Database](#Database-Hosting)
   - [CI/CD](#Continuous-Integration-and-Deployment (CI/CD))
8. [Declaration](#declaration)




# **WanderHub API Integration**

## **1. Google Maps API**
The Google Maps API serves as a core component of WanderHub, providing powerful geolocation and mapping functionalities. It enhances the platform in the following ways:
- **Interactive Maps**: Enables rendering of interactive maps in modules like `ViewMap`.
- **Geocoding**: Facilitates precise visualization of routes, destinations, and travel plans.
- **Seamless Navigation**: Assists users in exploring travel destinations with ease.

## **2. Google Places API**
The Google Places API enriches the user experience by delivering location-specific details and suggestions:
- **Detailed Location Data**: Provides information about destinations, including nearby attractions, ratings, and reviews.
- **Personalized Travel Planning**: Integrated into the `CreateTrip` module, assisting users in curating tailored travel plans based on their preferences.

## **3. Maps JavaScript API**
The Maps JavaScript API powers advanced mapping features to enhance user interaction:
- **Dynamic Pins**: Renders pins on maps, allowing users to explore destinations interactively.
- **Layered Visualizations**: Offers interactive layers for a deeper understanding of travel routes and destinations.
- **Enhanced Engagement**: Improves user engagement through intuitive navigation features.

## **4. OpenAI API**
The OpenAI API is at the heart of WanderHub’s AI-powered itinerary generation system:
- **Tailored Travel Plans**: Processes user inputs, such as destination, duration, budget, and activities, to create personalized itineraries.
- **AI-Driven Personalization**: Elevates the travel planning experience by offering intelligent and user-centric recommendations.
- **Integrated Module**: Key component of the `CreateTrip` module for generating optimized travel itineraries.

## **5. Unsplash API**
The Unsplash API adds a visually immersive dimension to WanderHub by supplying high-quality images:
- **Visual Appeal**: Enhances the platform with stunning visuals of travel destinations.
- **Engagement**: Keeps users visually engaged while exploring trip options.
- **Integration**: Fetches images dynamically for destinations in the `ViewTrip` module to create a more engaging user experience.

# **Backend Modularization**

The backend of the WanderHub application has been designed using a modular architecture to ensure better maintainability, scalability, and reusability of code. Below is an explanation of the modularization of the backend.


### **1. `api.js`**
- **Purpose**: Manages API endpoints for backend services.
- **Responsibilities**:
  - Defines all route handlers for user requests.
  - Acts as the controller for various API functionalities such as trips, blogs, and user management.
- **Benefits**:
  - Centralizes route logic, simplifying debugging and management.

---

### **2. `gpt.js`**
- **Purpose**: Integrates OpenAI's GPT API for generating AI-driven travel itineraries.
- **Responsibilities**:
  - Handles communication with the OpenAI API.
  - Processes user inputs and returns AI-generated results (e.g., personalized trip plans).
- **Benefits**:
  - Encapsulates AI-related logic, making it reusable and easy to test.

---

### **3. `mongodb.js`**
- **Purpose**: Manages MongoDB database connections and operations.
- **Responsibilities**:
  - Establishes a connection to the MongoDB instance.
  - Provides helper functions to perform CRUD operations on collections like `users`, `trips`, and `blogs`.
- **Benefits**:
  - Ensures a clear and consistent approach to database interactions.
  - Allows seamless switching between different database configurations if needed.

---

### **4. `prompt.js`**
- **Purpose**: Stores reusable prompts for the OpenAI API.
- **Responsibilities**:
  - Centralizes static prompt templates used for generating AI responses.
  - Simplifies updates to the prompt structure without affecting other files.
- **Benefits**:
  - Provides a single source of truth for all prompt-related configurations.

---

### **5. `server.js`**
- **Purpose**: The main entry point for the backend application.
- **Responsibilities**:
  - Initializes the Express app and sets up the server.
  - Configures middlewares, including JSON parsing and CORS.
  - Integrates routes, database connections, and third-party APIs.
- **Benefits**:
  - Serves as the central hub for application initialization.
  - Ensures all configurations and setups are organized in one place.


## **Advantages of Modularization**
- **Scalability**: Independent modules allow the backend to scale effortlessly with additional features.
- **Maintainability**: The clear separation of concerns simplifies debugging and updates.
- **Reusability**: Encapsulated logic can be reused across different parts of the application.
- **Collaboration**: Promotes teamwork by enabling multiple developers to work on distinct modules.

By adopting this modularized structure, the backend of WanderHub is well-prepared for future enhancements and ensures clean, efficient, and maintainable code.


# WanderHub frontend
## **Features of the Header Component**
### **User Authentication Management**
- **Google Login**: 
  - Integrates Google OAuth 2.0 for seamless login functionality.
  - Retrieves user profile details (e.g., name, email, and avatar) upon successful authentication.
  - Stores user data in `localStorage` for session persistence.
- **WanderHub Login**: 
  - Provides a dedicated sign-in option using WanderHub credentials.
  - Offers flexibility for users to authenticate using either Google or platform-specific credentials.

### **Dynamic User State Handling**
- **Session Management**:
  - Dynamically detects and loads user information, including Google profile or WanderHub credentials, upon component mounting.
  - Reactively updates user interface elements based on authentication state.

### **Logout Functionality**
- **Secure Logout**:
  - Integrates the `googleLogout` function for terminating Google-based sessions.
  - Clears all locally stored user data, including tokens and profile details.
  - Automatically refreshes the page to ensure the user is logged out.

### **Interactive Navigation**
- **Popover Menu**:
  - Displays a popover menu with options such as:
    - **New Trip**: Redirects users to the trip creation page (`/create-trip`).
    - **History**: Allows users to view their saved trips on the user trip page (`/user-trip`).
    - **Sign Out**: Logs users out securely.
  - Automatically adjusts based on whether the user is authenticated.

### **Responsive and Accessible Design**
- **Centered Logo**:
  - Includes a clickable logo in the center that redirects to the homepage.
- **User Avatar**:
  - Displays a user avatar if authenticated via Google; defaults to an icon when no profile picture is available.
  - Ensures all visual elements are responsive and maintain accessibility standards.

### **Dialog Box for Authentication**
- **Customizable Sign-In Options**:
  - Includes options for signing in with Google or WanderHub credentials via a clean and user-friendly dialog box.
  - Styled consistently to maintain the platform's visual identity.

### **Styling and Visual Elements**
- **Responsive Layout**:
  - Implements a flexible grid system (`flex`) to ensure the header adapts to various screen sizes.
- **Minimalist Aesthetic**:
  - Clean design with focused navigation elements to enhance usability.

## **Features of the Footer Component**

### **Dynamic Year Display**
- The footer dynamically displays the current year using JavaScript's `Date` object. This ensures the copyright information remains up-to-date without manual intervention.

### **Responsive Design**
- **Flexbox Layout**: Utilizes `flex` properties to create a responsive and centered layout that adjusts seamlessly to different screen sizes.
- **Mobile Compatibility**: The footer is styled to adapt to small screens, maintaining readability and usability across devices.

### **Minimalist Styling**
- **Background and Text Colors**: A clean and subtle design with a light gray background (`bg-gray-100`) and muted gray text (`text-gray-400`) for a professional appearance.
- **Padding**: Adequate padding (`py-2`) ensures visual separation and alignment with other content on the page.

### **Incorporated Logo**
- **Logo Display**: Includes a logo image (`/logo.svg`) with reduced opacity for subtle branding. The logo aligns with the text for a cohesive design.
- **Fallback Alt Text**: Provides an `alt` attribute (`"Logo"`) for accessibility and SEO purposes.

### **Copyright Information**
- Displays a copyright message: `© [Year] NUS. All rights reserved.`
- Ensures legal compliance by explicitly reserving rights.

### **User-Friendly Design**
- **Centered Content**: All elements are centrally aligned for ease of reading and a balanced visual aesthetic.
- **Consistent Font Size**: A uniform text size (`text-sm`) is used to maintain clarity without overpowering other page elements.
## **Features of the Register Page**

### **User Registration**
- **Input Fields**:
  - Provides fields for users to input their name, email, password, and password confirmation.
  - Validates that all fields are filled out before submission.
- **Password Confirmation**:
  - Checks if the entered password matches the confirmation field.
  - Displays an error message if the passwords do not match.

### **Error Handling**
- **Real-Time Validation**:
  - Alerts the user with a clear message if registration fails due to missing fields, mismatched passwords, or server-side errors.
- **Server-Side Feedback**:
  - Displays server responses, such as duplicate email errors or backend issues, for user clarity.

### **Successful Registration Feedback**
- **User Notification**:
  - Displays a success message when registration is completed.
- **Automatic Redirect**:
  - Redirects the user to the Sign-In page after a brief delay following successful registration.

### **Responsive Design**
- **Centered Layout**:
  - The form is designed to be visually appealing and is centered vertically and horizontally on the page.
- **Mobile-Friendly**:
  - The layout adapts seamlessly to smaller screens to ensure usability across all devices.

### **Integrated Navigation**
- **Link to Sign-In**:
  - Includes a link to the Sign-In page for users who already have an account.
  - Encourages easy navigation and provides a clear user path.

### **Asynchronous Registration**
- **API Integration**:
  - Sends registration data to the backend API endpoint (`/api/register`) asynchronously.
  - Handles success and error responses dynamically, ensuring a smooth user experience.

### **Security**
- **Client-Side Validation**:
  - Ensures the user inputs meet the required format and constraints before sending data to the backend.
- **No Password Storage in LocalStorage**:
  - Passwords are not stored in the browser or on the client-side to maintain security.

### **Reusable Components**
- **Input Fields**:
  - Utilizes pre-defined `Input` components from the UI library for consistent design and behavior.
- **Button**:
  - Leverages the reusable `Button` component for a uniform look across the application.

## **Features of the Sign-In Page**

### **User Authentication**
- **Email and Password Login**:
  - Users can log in by entering their email and password.
  - Validates that both fields are filled before submission to ensure input completeness.
- **Token-Based Authentication**:
  - Upon successful login, a JWT token is generated and stored securely in `localStorage`.
  - The token is used for subsequent authentication, ensuring secure user sessions.

### **Error Handling**
- **Real-Time Feedback**:
  - Displays success or error messages dynamically based on the login response.
  - Error messages indicate incorrect credentials or server-side issues, providing clarity to the user.
- **Server-Side Error Capture**:
  - Handles and displays errors returned from the backend, such as invalid credentials or server downtime.

### **Profile Retrieval**
- **Fetch User Profile**:
  - After successful login, the user profile is fetched using the stored token.
  - The profile data, including user-specific details, is stored in `localStorage` for use across the application.
- **Profile Updates in Header**:
  - Automatically updates the user avatar or relevant profile details in the header upon successful login.

### **Redirection**
- **Navigation to Previous Page**:
  - Redirects users to their intended destination or defaults to the user trip history page after successful login.
- **Persistent Navigation**:
  - Maintains the intended navigation state using React Router's `useLocation`.

### **Responsive Design**
- **Centered Layout**:
  - The form is styled to be visually appealing and centered vertically and horizontally.
- **Mobile-Friendly**:
  - The design adapts seamlessly to different screen sizes for accessibility on all devices.

### **Seamless Integration**
- **API Integration**:
  - Connects to the backend `/api/login` endpoint using `axios` for authentication.
  - Fetches user-specific details via the `/api/user-profile` endpoint after successful authentication.

### **Secure Session Management**
- **Token Storage**:
  - Securely stores the JWT token in `localStorage` for maintaining user sessions.
- **Session Handling**:
  - Ensures authenticated requests to the server are made using the stored token.

### **Navigation Options**
- **Link to Registration**:
  - Includes a clear link to the registration page for new users, promoting a streamlined user experience.

## **Features of the Landing Page**

### **Interactive Map Integration**
- **Google Maps Integration**:
  - The Landing Page utilizes the Google Maps API to display a map dynamically.
  - Automatically initializes the map using the user's geolocation data for a personalized experience.
  - Provides a fallback default location if geolocation is unavailable or denied.

- **Customized Map Styling**:
  - Features a visually appealing design with light grey tones for the map background, roads, and water.
  - Removes unnecessary elements like default UI controls and icons to focus on a clean aesthetic.

### **Dynamic Location Rendering**
- **Geolocation Support**:
  - Detects the user’s current location using the browser's geolocation API.
  - Positions the map view based on the user's latitude and longitude for relevance.
- **Error Handling**:
  - Gracefully handles geolocation errors by defaulting to a preconfigured location.

### **Overlay Content**
- **Inspiring Introduction**:
  - Features a prominently displayed headline, "Discover Your Next Destination with WanderHub," that captures user attention.
  - Includes a subheading to inspire and guide users to explore new adventures.
  
- **Call-to-Action**:
  - A clearly visible "Get Started" button links to the `CreateTrip` page, inviting users to plan their next adventure.
  - Styled to maintain consistency with the overall theme using dark tones and hover effects.

### **Responsive Design**
- **Full-Screen Layout**:
  - Utilizes a full-screen background map to create an immersive experience.
- **Overlay Flexibility**:
  - Ensures that text and buttons remain readable and accessible across all device sizes.

### **Enhanced User Experience**
- **Background Effects**:
  - Implements a semi-transparent black overlay to improve text readability against the map background.
- **Font Customization**:
  - Utilizes a mix of light and bold font weights to emphasize important content, enhancing visual hierarchy.

The Landing Page sets the tone for WanderHub, creating a visually engaging and user-friendly entry point for discovering and planning travel adventures.

## **Features of Create Trip Page**

### **Destination Selection**
- **Google Places Autocomplete Integration**:
  - Users can search and select destinations with real-time suggestions powered by Google Places API.
  - Provides intuitive and accurate destination selection.

### **Travel Preferences Input**
- **Duration Specification**:
  - Allows users to specify the number of days for their trip.
  - Input validation ensures the duration is between 1 and 7 days.

- **Traveler Preferences**:
  - Options include categories such as "Not Sure Yet," "Myself," "Couple," "Small Group," and "Big Group."
  - Each category describes the expected number of travelers for easy selection.

- **Hotel Budget Options**:
  - Users can select their preferred accommodation budget:
    - "Economical" (below 100 USD per night).
    - "Average" (100 - 200 USD per night).
    - "Expensive" (200 - 300 USD per night).
    - "Luxury" (400+ USD per night).
  - Ensures recommendations are tailored to affordability preferences.

- **Activity Preferences**:
  - Users can choose from a variety of activities:
    - Sightseeing, Nature, Shopping, Food Tasting, and Entertainment.
  - Each activity comes with a description to guide user selection.
  - Preferences influence the generated itinerary for personalization.

### **Dynamic Trip Generation**
- **AI-Powered Itinerary Creation**:
  - The page integrates with the backend, utilizing OpenAI API to generate customized travel plans.
  - The generated itinerary includes:
    - Hotels with pricing details, addresses, and descriptions.
    - Daily activities with estimated time, costs, and locations.
    - A balanced number of activities and hotels for the specified trip duration.
  - Randomizes hotel and location options to ensure unique itineraries.

- **Loading Feedback**:
  - Displays a loading animation (spinner) during itinerary generation.
  - Improves user experience by indicating ongoing processing.

### **User Authentication**
- **Sign-In Options**:
  - If users are not logged in, a prompt is displayed with:
    - **Google OAuth Login** for quick and secure sign-in.
    - **WanderHub Login** to connect user credentials with the platform's database.

### **Trip Management**
- **Trip Saving**:
  - Saves generated trips to the backend, associating them with the logged-in user's email.
  - Stores both the trip details and the user's preferences.

- **Trip Navigation**:
  - After saving, users are redirected to the `ViewTrip` page for detailed itinerary exploration.
  - Saved trips can be managed and revisited through the `UserTrip` page.

### **Interactive and Responsive Design**
- **Responsive Layout**:
  - The page is optimized for various screen sizes, ensuring usability across devices.

- **Interactive Components**:
  - Budget, traveler, and activity preferences are presented in a grid layout with clickable cards.
  - Hover effects enhance interactivity, such as scale animations on selection.

### **Error Handling and Validation**
- **Form Validation**:
  - Ensures users provide complete input before generating a trip.
  - Validates constraints like trip duration and activity preferences.

- **Error Notifications**:
  - Provides instant feedback for invalid input or missing details through toast messages.

- **Authentication Check**:
  - If users are not signed in, the system prevents trip generation and prompts them to log in.

### **Backend Integration**
- **API Endpoints**:
  - Fetches generated itineraries from the `/api/create-trip` endpoint.
  - Saves trips to the database using the `/api/trips` endpoint.

- **Google OAuth**:
  - Streamlines user authentication and integrates seamlessly with other features.

- **Data Persistence**:
  - Stores user selections and generated trips in a MongoDB database for future access.

## **Blog Management**

### **Blog Submission Form**
- **Title Input**:
  - Users can provide a title for their blog.
  - Input validation ensures this field is filled before submission.

- **Content Input**:
  - A text area allows users to write detailed travel stories.
  - Supports multiline input with a character count to guide users.

- **Author Display**:
  - Automatically fetches and displays the logged-in user's name.
  - Defaults to "Anonymous" if no user data is available.

### **Location Selector**
- **Google Maps Integration**:
  - Interactive Google Map displayed on the page.
  - Users can search and select a location using the Google Places API.
  - Automatically fetches the latitude, longitude, and formatted address of the selected location.

- **Current Location**:
  - Automatically detects the user's current location if geolocation permissions are granted.
  - Places a marker on the map to show the user's location.

### **Mood Selection**
- **Predefined Moods**:
  - Users can select a mood for their blog, such as "Happy," "Adventurous," or "Relaxed."
  - Visually interactive selection with clickable mood cards.

### **Real-Time Validation and Feedback**
- **Error Messages**:
  - Prompts users to fill in all required fields (title, content, location, and mood) before submitting.
- **Success Feedback**:
  - Displays a confirmation message upon successful submission of the blog.

### **Interactive Map**
- **Search Box Integration**:
  - A search box allows users to find and select locations directly on the map.
  - Dynamically centers the map on the selected location and adds a marker.

- **Customizable Map Styles**:
  - Offers a visually appealing, minimalistic map style for enhanced user experience.

### **Blog Submission and Storage**
- **Form Submission**:
  - Upon submission, the blog is sent to the backend API endpoint for storage.
  - Stores essential details such as title, content, author, location, mood, and submission date.

- **Backend API Integration**:
  - Integrates with `/api/blogs` endpoint to store submitted blogs in the database.

### **Latest Blogs Display**
- **Blog Preview**:
  - Displays the latest blogs in a responsive grid layout.
  - Shows the blog title, author, date, mood, location, and content snippet.

- **Dynamic Loading**:
  - Automatically updates the list of blogs after a new submission.

### **Navigation and Exploration**
- **View All Blogs**:
  - Provides a button to navigate to the `View Blogs` page, where users can explore all submitted blogs.
  - Includes a visually appealing navigation button with an arrow icon for clarity.

### **Interactive and Responsive Design**
- **Responsive Layout**:
  - Optimized for various devices, ensuring usability across screen sizes.
- **Hover Effects**:
  - Adds hover animations to blog cards for enhanced interactivity.

### **User Authentication**
- **Auto-Login Validation**:
  - Checks if the user is logged in before allowing blog submission.
  - Redirects unauthenticated users to the login page.

## **Features of View Blogs Page**

### **Blog Viewing Options**
- **Card View**:
  - Displays blogs in a responsive grid layout.
  - Each blog card shows key details:
    - Title
    - Author
    - Date of creation
    - Mood
    - Location
    - Content snippet
  - Interactive buttons for actions like "Like," "Share," and "Delete."

- **Map View**:
  - Blogs are visualized as markers on an interactive Google Map.
  - Clicking on a marker displays blog details in an information window.
  - Integrated with Google Maps API to geolocate blog locations dynamically.

### **Blog Actions**
- **Like**:
  - Users can like blogs, and the like count updates dynamically.
  - Backend integration ensures persistent tracking of likes.

- **Share**:
  - Users can share blogs via a generated link.
  - Supports modern share features (e.g., social media, clipboard copying).

- **Delete**:
  - Users can delete blogs they own.
  - Includes confirmation dialogs to prevent accidental deletion.

### **User-Specific Filtering**
- **Filter by User Blogs**:
  - Allows users to view only the blogs they have created.
  - Filters the displayed blogs based on the logged-in user's email.

- **View All Blogs**:
  - Displays all submitted blogs for exploration and engagement.

### **Dynamic Map Integration**
- **Interactive Map Markers**:
  - Each blog with a valid location has a corresponding marker on the map.
  - Custom icons and styles enhance clarity and user experience.

- **Info Window**:
  - Displays blog details when a marker is clicked:
    - Title
    - Author
    - Mood
    - Location
    - Content summary

### **Google Maps API Features**
- **Geolocation Support**:
  - Automatically centers the map on the user’s current location if permissions are granted.

- **Address-Based Geocoding**:
  - Converts blog locations into geographic coordinates for marker placement.

- **Custom Map Styles**:
  - Implements a minimalist map theme with subtle grey tones for visual appeal.

### **Error Handling**
- Displays error messages when:
  - Blogs fail to load.
  - Issues occur with blog deletion or sharing.

### **Toggle Views**
- Users can toggle between:
  - **Map View**: Visualize blogs on a global map.
  - **Card View**: Explore blogs in a grid layout.

### **Real-Time Updates**
- Automatically updates the blog list or map markers after actions such as:
  - Adding a new blog.
  - Deleting a blog.
  - Liking or sharing a blog.

### **Responsive Design**
- Fully optimized for devices of all screen sizes.
- Adjusts layout dynamically for desktop, tablet, and mobile screens.

## **Features of User Trip Page**

### **User Trip History**
- **View Past Trips**:
  - Displays all trips associated with the logged-in user.
  - Each trip is presented as a card with the following details:
    - Destination
    - Duration
    - Number of travelers
    - Selected activities
  - Includes a thumbnail image for each trip, fetched dynamically from the backend.

### **Dynamic Image Loading**
- **Placeholder Image**:
  - A default image is displayed if no trip images are available.
- **Database Integration**:
  - Retrieves associated trip images from the backend.

### **Trip Management**
- **Delete Trips**:
  - Users can delete trips they no longer need.
  - Deletion process includes:
    - A confirmation dialog to prevent accidental deletions.
    - Backend integration to remove the trip from the database.
  - Automatically updates the trip list after deletion.

### **Error Handling**
- **Loading and Error States**:
  - Displays a loading message while fetching user trips.
  - Shows error messages if the fetch fails or encounters issues.

### **No Trip Fallback**
- **Friendly Message**:
  - If no trips exist, a message encourages users to create their first trip.

### **Interactive UI**
- **Hover Effects**:
  - Subtle scaling animations enhance visual appeal when hovering over trip cards.
- **Clickable Cards**:
  - Clicking on a trip card navigates to the detailed view of the selected trip.

### **Backend Integration**
- **Fetch User-Specific Trips**:
  - Uses the logged-in user's email to fetch their trip history from the backend.
- **RESTful API Endpoints**:
  - Endpoints for fetching, deleting, and retrieving trip images.

### **Responsive Design**
- **Grid Layout**:
  - Automatically adjusts the number of columns based on screen size.
  - Optimized for desktop, tablet, and mobile devices.

### **Alert Dialog for Deletion**
- **Confirmation Modal**:
  - Custom modal with the following features:
    - Title: "Are you sure to delete?"
    - Description: Explains the irreversible action of deletion.
    - Options:
      - **Cancel**: Closes the dialog without deleting.
      - **Confirm**: Deletes the trip permanently.


## **Features of View Trip Page**

### **Trip Data Display**
- **Dynamic Trip Retrieval**:
  - Fetches trip details dynamically based on the `tripId` extracted from the URL.
  - Uses RESTful API integration to retrieve trip data from the backend.
- **Error and Loading States**:
  - Displays a loading message while fetching trip data.
  - Shows an error message if data retrieval fails.

### **Trip Summary (InfoTag Component)**
- **Overview Display**:
  - Includes high-level trip information such as:
    - Destination
    - Duration
    - Number of travelers
    - Selected activities
  - Provides a quick snapshot of the trip details.

### **Accommodation Details (Accommodation Component)**
- **Hotel Recommendations**:
  - Displays recommended hotels, including:
    - Hotel name
    - Address
    - Price range
    - Ratings
    - Description
  - Integrates with the backend to fetch accommodation options.

### **Daily Plan Details (Plan Component)**
- **Day-by-Day Itinerary**:
  - Breaks down the trip into daily plans with the following details:
    - Themed itinerary for each day.
    - Locations to visit with details such as:
      - Name
      - Address
      - Activities or features
      - Estimated time
      - Pricing information
    - Coordinates for mapping purposes.

### **Interactive Design**
- **Component-Based Architecture**:
  - Modular design using components like `InfoTag`, `Accommodation`, and `Plan` for flexibility and reusability.
- **Responsive Layout**:
  - Fully responsive layout ensures the page adapts seamlessly to different screen sizes and devices.

### **Error Handling**
- **Robust Feedback Mechanism**:
  - Gracefully handles API errors with user-friendly messages.
  - Ensures a stable user experience even during data retrieval failures.

### **Backend Integration**
- **Trip Retrieval Endpoint**:
  - Utilizes the `/api/trips/:tripId` endpoint to fetch trip data specific to the selected trip.
- **Real-Time Data Display**:
  - Retrieves the latest trip details stored in the database.

### **Logging and Debugging**
- **Console Logs**:
  - Logs the fetched data to the console for debugging and verification during development.

### **Custom Components**
- **InfoTag Component**:
  - Provides an elegant and concise summary of the trip.
- **Accommodation Component**:
  - Displays hotel recommendations with detailed information.
- **Plan Component**:
  - Lists daily activities and plans in a structured and readable format.

### **Accommodation Component**
- **Hotel Display**:
  - Integrates an `Accommodation` component to showcase the list of hotels for the trip.
  - Displays:
    - Hotel name
    - Address
    - Price range
    - Ratings
    - Description
  - Each hotel is represented using the `Hotel` component for modularity and detailed display.
- **Dynamic Hotel Data**:
  - Hotel data is dynamically retrieved from the backend and displayed in a grid layout.
  - Ensures responsiveness across different screen sizes.

### **Map Integration**
- **Google Maps API**:
  - Incorporates the Google Maps API for displaying trip locations on an interactive map.
  - Initializes the map with custom styles (`MAP_STYLES`) for a polished and professional look.
- **Default Center and Bounds**:
  - Map centers dynamically based on trip locations using `DEFAULT_CENTER` and adjusts bounds to fit all markers.
- **Markers and Polylines**:
  - Adds markers for each location in the itinerary.
  - Connects locations with a polyline to represent the trip path visually using `POLYLINE_STYLE`.
- **Info Windows**:
  - Implements detailed info windows for each marker:
    - Includes a photo, name, address, estimated time, pricing, and details.
    - Action buttons for navigating to Google Maps or searching YouTube for the location.

### **Dynamic Photo Integration**
- **Google Places API**:
  - Utilizes the `GetPlaceDetails` function to fetch location photos using the Google Places API.
  - Supports fetching high-quality photos with customizable dimensions via the `PHOTO_REF_URL`.
- **Fallback for Missing Images**:
  - Provides a placeholder image if no photo is available for a location.

### **Interactive Features**
- **Google Maps Integration**:
  - The map dynamically updates based on user interactions and itinerary changes.
- **External Links**:
  - Action buttons in the info window allow users to:
    - Open the location in Google Maps.
    - Search for related videos on YouTube.
- **Bounds Adjustment**:
  - Automatically adjusts map bounds to fit all trip locations, ensuring all points are visible.

### **Daily Plans with Maps**
- **Polyline Visualization**:
  - Connects locations on a map for each day’s itinerary.
  - Provides a clear visual representation of the trip flow.
- **Dynamic Marker Interaction**:
  - Clicking a marker opens an info window with detailed location information.

### **Utilities**
- **Google Maps Script Loader**:
  - Dynamically loads the Google Maps API script if not already available, using the `loadGoogleMapsAPI` function.
- **Centralized Map Initialization**:
  - Uses `initializeGoogleMap` to set up map styles, markers, polylines, and info windows in a reusable manner.

### **Integration with Backend**
- **Trip Details API**:
  - Retrieves trip details, including daily plans and accommodations, from the `/api/trips/:tripId` endpoint.
- **Dynamic Rendering**:
  - Updates map and trip details dynamically based on the retrieved trip data.

### **Custom Styling**
- **Styled Info Windows**:
  - Enhanced info window design with styled borders, shadows, and clear formatting for a professional appearance.
- **Custom Map Styles**:
  - Applies a light grey and minimalist map style (`MAP_STYLES`) for improved readability and aesthetics.

### **Interactive Design**
- **Actionable Info Windows**:
  - Provides users with direct actions like navigating to Google Maps or exploring on YouTube.
- **Dynamic Content**:
  - Info windows dynamically fetch and display photos, making the trip view more engaging.


### **Accommodation**
- **Hotel Display**:
  - Lists all accommodations booked for the trip.
  - Displays:
    - Hotel name, address, and description.
    - Price range and ratings.
  - Each hotel includes:
    - Google Maps button for navigation.
    - YouTube button for exploring videos of the hotel.
- **Dynamic Hotel Images**:
  - Fetches hotel images using the Google Places API.
  - Provides fallback to placeholder images if no image is found.

### **Daily Plans Visualization**
- **Google Maps Integration**:
  - Displays the daily plans of the trip with markers and connecting polylines.
  - Interactive info windows for each location include:
    - Name, address, details, estimated time, and pricing.
    - Buttons for quick navigation to Google Maps and YouTube.
  - Automatically adjusts the map bounds to include all locations.
- **Dynamic Map Styling**:
  - Implements a visually appealing custom map style using `MAP_STYLES`.
  - Adds unique markers for each location with a distinct icon.

### **Trip Info and Highlights**
- **Info Section**:
  - Displays trip details such as:
    - Destination, duration, traveler type, hotel budget, and activities.
  - Styled tags for easy readability of trip highlights.
- **Image Carousel**:
  - Displays a carousel of images related to the destination:
    - First fetches from the backend if available.
    - Dynamically fetches from Unsplash API if no images exist in the database.
    - Allows navigation through previous and next images.
- **Share Feature**:
  - Generates a shareable link to the trip.
  - Supports sharing via native device share options or clipboard copy.

### **Dynamic Data Fetching**
- **Trip Data Retrieval**:
  - Fetches trip details from the backend via the `/api/trips/:tripId` endpoint.
  - Displays all trip-related data dynamically based on the retrieved response.
- **Dynamic Image Fetching**:
  - Integrates Unsplash API to retrieve high-quality images for the destination.
  - Stores retrieved images in the database for future use.

### **Interactive Design**
- **Interactive Info Windows**:
  - Provides detailed information and actions for each trip location.
  - Users can:
    - View the location on Google Maps.
    - Search for related videos on YouTube.
- **Dynamic Action Buttons**:
  - Enables sharing trip details and navigating to locations easily.

### **Integration with External APIs**
- **Google Places API**:
  - Retrieves location details and hotel images dynamically.
  - Supports advanced query capabilities for accurate image fetching.
- **Unsplash API**:
  - Fetches destination images when unavailable in the database.
  - Ensures visually rich content for the trip view.

### **Custom Styling**
- **Map and Info Window Styling**:
  - Customizes map appearance using light grey aesthetics for a professional look.
  - Styled info windows for location details enhance visual appeal.
- **Responsive Design**:
  - Ensures optimal display across devices and screen sizes.

### **Enhanced User Experience**
- **User-Friendly Navigation**:
  - Smooth transitions between different views and interactive buttons.
- **Comprehensive Trip Overview**:
  - Combines all trip details, accommodations, and daily plans into a single, well-organized page.

### **Accommodation**
- **Hotel Listings**:
  - Displays all accommodations for the trip.
  - Shows:
    - Hotel name, address, description, and price range.
    - Interactive buttons to:
      - Open hotel location on Google Maps.
      - Search for related YouTube videos.
  - Dynamically fetches hotel images using the Google Places API, with placeholders if unavailable.

### **Trip Overview**
- **Google Maps Integration**:
  - Provides a map overview of all trip locations.
  - Features:
    - Interactive markers for each location.
    - Custom info windows displaying:
      - Location name, address, details, estimated time, and pricing.
      - Links to Google Maps and YouTube for further exploration.
    - Automatic map bounds adjustment to fit all locations.
  - Custom map styles for a visually appealing user experience.

### **Daily Plans**
- **Plan Overview**:
  - Lists daily plans categorized by day and theme.
  - Displays:
    - Daily locations with details such as:
      - Name, address, activity details, estimated time, and pricing.
      - Dynamic images fetched using the Google Places API or placeholders.
    - Interactive buttons for location-based actions.
- **PlanItem Features**:
  - Dynamically fetches and displays images for each location.
  - Includes:
    - Quick access to Google Maps for navigation.
    - YouTube search for videos related to the location.

### **Dynamic Data Integration**
- **Data Fetching**:
  - Retrieves trip data dynamically from the backend using `/api/trips/:tripId`.
  - Ensures seamless display of all trip-related information.
- **External APIs**:
  - **Google Places API**:
    - Fetches dynamic images and place details for locations and accommodations.
  - **YouTube Search**:
    - Directs users to related videos of trip locations.

### **User Experience Enhancements**
- **Interactive Info Windows**:
  - Provides detailed information about each location on the map.
  - Includes buttons for navigation and exploration via Google Maps and YouTube.
- **Responsive Design**:
  - Ensures optimal display on various devices and screen sizes.
- **Loading Indicators**:
  - Displays loading states for images and maps to enhance feedback during data fetching.

### **Custom Styling**
- **Map Styling**:
  - Implements custom styles for an aesthetically pleasing map view.
- **Component Styling**:
  - Consistent and user-friendly design for hotel and location cards.

### **Interactive Features**
- **Buttons for Quick Actions**:
  - Google Maps: Opens the location in Google Maps for navigation.
  - YouTube: Searches for related videos on YouTube.
- **Dynamic Data Updates**:
  - Ensures real-time updates for trip data and related visuals.

### **Scalability**
- **Modular Design**:
  - Components such as `PlanItem`, `Accommodation`, and `InfoTag` are modular for easy reuse and extension.
- **API Integration**:
  - Supports seamless integration with additional APIs for enhanced functionality.


---

# Backend Features
**Trip Data Display**
- **Dynamic Trip Retrieval**:
  - Fetches trip details dynamically based on the `tripId` extracted from the URL.
  - Uses RESTful API integration to retrieve trip data from the backend.
- **Error and Loading States**:
  - Displays a loading message while fetching trip data.
  - Shows an error message if data retrieval fails.

#### **Trip Summary (InfoTag Component)**
- **Overview Display**:
  - Includes high-level trip information such as:
    - Destination
    - Duration
    - Number of travelers
    - Selected activities
  - Provides a quick snapshot of the trip details.

#### **Accommodation Details (Accommodation Component)**
- **Hotel Recommendations**:
  - Displays recommended hotels, including:
    - Hotel name
    - Address
    - Price range
    - Ratings
    - Description
  - Integrates with the backend to fetch accommodation options.

#### **Daily Plan Details (Plan Component)**
- **Day-by-Day Itinerary**:
  - Breaks down the trip into daily plans with the following details:
    - Themed itinerary for each day.
    - Locations to visit with details such as:
      - Name
      - Address
      - Activities or features
      - Estimated time
      - Pricing information
    - Coordinates for mapping purposes.

#### **Google Places API Integration**
- **Place Search**:
  - Implements Google's Places API to enhance trip data with additional location details.
  - Retrieves data such as:
    - Place photos
    - Display names
    - Place IDs
  - Fetches information dynamically using the following:
    - **Text Search Endpoint**: [`https://developers.google.com/maps/documentation/places/web-service/text-search`](https://developers.google.com/maps/documentation/places/web-service/text-search)
    - **Place Photos Endpoint**: [`https://developers.google.com/maps/documentation/places/web-service/place-photos`](https://developers.google.com/maps/documentation/places/web-service/place-photos)

### **Photo Integration**
- **Place Photo URL**:
  - Constructs URLs dynamically for fetching high-quality place photos using the Place Photos API:
    - URL Template:  
      ```
      https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=<API_KEY>
      ```
- **Custom API Configuration**:
  - Configures Axios to send requests to the Google Places API, including:
    - API key for authentication.
    - Field mask to fetch specific details like photos, names, and IDs.

### **Interactive Design**
- **Component-Based Architecture**:
  - Modular design using components like `InfoTag`, `Accommodation`, and `Plan` for flexibility and reusability.
- **Responsive Layout**:
  - Fully responsive layout ensures the page adapts seamlessly to different screen sizes and devices.

### **Error Handling**
- **Robust Feedback Mechanism**:
  - Gracefully handles API errors with user-friendly messages.
  - Ensures a stable user experience even during data retrieval failures.

### **Backend Integration**
- **Trip Retrieval Endpoint**:
  - Utilizes the `/api/trips/:tripId` endpoint to fetch trip data specific to the selected trip.
- **Real-Time Data Display**:
  - Retrieves the latest trip details stored in the database.

### **Logging and Debugging**
- **Console Logs**:
  - Logs the fetched data to the console for debugging and verification during development.

### **Custom Components**
- **InfoTag Component**:
  - Provides an elegant and concise summary of the trip.
- **Accommodation Component**:
  - Displays hotel recommendations with detailed information.
- **Plan Component**:
  - Lists daily activities and plans in a structured and readable format.

This repository contains the backend code for WanderHub, a travel planning platform that provides personalized itineraries, user-generated blogs, and a robust trip management system. The backend is built using **Node.js**, **MongoDB**, and integrates various third-party APIs like OpenAI, Google Maps API, and Unsplash API.

---
## **Features of `prompt.js`**

### **Comprehensive Hotel Information**
- **Name and Address**: Includes detailed information about each hotel's name and address for user clarity.
- **Pricing Details**: Provides a price range (`min` and `max`) to help users assess affordability.
- **GeoCoordinates**: Contains latitude and longitude for integration with map-based tools.
- **Ratings and Descriptions**: Offers user review-based ratings and descriptive summaries to highlight hotel features.

### **Structured Daily Plans**
- **Day and Theme**: Organizes daily itineraries under specific themes, such as "Culture and History" or "Entertainment and Parks."
- **Locations**:
  - **Details**: Descriptive insights about each attraction, including key features and significance.
  - **Pricing Information**: Costs associated with visiting each location, with distinctions for adults and children.
  - **Estimated Time**: Suggested durations to optimize time spent at each location.
  - **GeoCoordinates**: Includes latitude and longitude for accurate map-based navigation.

### **Dynamic and Customizable Output**
- **Randomization**: Dynamically generates between 3–6 hotels and 2–4 daily locations, ensuring unique travel plans for every user.
- **Flexibility**: Allows for diverse configurations tailored to user preferences.

### **Integration with OpenAI API**
- **Template Usage**: Utilizes `EXAMPLE_JSON` as the core template for generating travel plans.
- **Consistency**: Ensures OpenAI-generated travel plans adhere to a uniform and easily parseable structure.
- **Custom Prompts**: Leverages user inputs like destination, budget, and activities to create rich, context-aware suggestions.

### **Rich Contextual Details**
- **Pricing and Time Estimates**: Provides granular details about costs and time requirements for activities, aiding in effective planning.
- **Thematic Organization**: Groups activities under cohesive daily themes for a well-structured travel experience.

### **Enhanced User Experience**
- **Pre-Structured Output**: Delivers a formatted JSON structure ready for frontend integration, reducing backend complexity.
- **Interactive Visualization**: Facilitates seamless compatibility with frontend features like maps and itineraries, enhancing the overall user journey.

## Features of `server.js` in the Backend

### **User Authentication and Authorization**
- **Registration**: Users can register with their name, email, and password. Passwords are securely hashed using `bcrypt` before storage in MongoDB.
- **Login**: Users can log in with their credentials. A JWT token is generated upon successful login for secure session handling.
- **Google Login**: OAuth 2.0 integration enables seamless Google login for enhanced user convenience.
- **Profile Retrieval**: Authenticated users can retrieve their profile details using a JWT token.

---

### **Trip Management**
- **Create Trip**:
  - Generates travel plans dynamically using the OpenAI API based on user preferences like destination, budget, and activities.
- **Save Trip**:
  - Saves user-generated trips into MongoDB for later retrieval.
- **Retrieve Single Trip**:
  - Fetches a specific trip by its `tripId` for detailed viewing.
- **Retrieve User Trips**:
  - Lists all trips created by a specific user based on their email address.
- **Delete Trip**:
  - Allows users to delete trips after verifying their ownership.

---

### **Blog Management**
- **Create Blog**:
  - Users can create blogs with fields such as title, content, mood, location, and optional latitude/longitude data.
- **Retrieve All Blogs**:
  - Fetches all blogs, allowing users to view posts from the community.
- **Like Blog**:
  - Users can like blogs, and the like count is incremented in the database.
- **Share Blog**:
  - Allows users to share blogs, updating the share count for the respective blog.

---

### **Image Management**
- **Save Images**:
  - Stores Unsplash images associated with specific trips, preventing duplicate entries using upsert operations.
- **Retrieve Images**:
  - Fetches images for a specific trip based on its `tripId`.

---

### **Password Management**
- **Forgot Password**:
  - Generates a secure reset token and sends it via email, allowing users to reset their password.
- **Reset Password**:
  - Verifies the reset token and securely updates the password in the database.

---

### **API Integrations**
- **OpenAI API**:
  - Generates detailed travel plans tailored to user inputs.
- **Google Maps API**:
  - Provides geospatial data and interactive mapping for travel plans.
- **Google Places API**:
  - Offers dynamic location suggestions during trip creation.
- **Unsplash API**:
  - Supplies high-quality images for destinations to enhance visual appeal.
- **MongoDB**:
  - Serves as the primary database for storing user data, trips, blogs, and images.

---

### **Middleware and Utilities**
- **CORS Middleware**:
  - Enables cross-origin requests, allowing seamless frontend-backend communication.
- **JSON Parser**:
  - Parses incoming JSON payloads for API requests.
- **Error Handling**:
  - Implements robust error-handling mechanisms to ensure graceful degradation and detailed error reporting.

---

### **Deployment and Monitoring**
- **Port Configuration**:
  - The server runs on port `5038` by default.
- **Environment Variables**:
  - Manages sensitive credentials and configurations using `.env.local`.

## Steps to Run the Project

Follow the steps below to set up and run the WanderHub project locally:

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/)
- npm (Node Package Manager)

---

### Running the Frontend

1. Navigate to the Wanderhub directory:
   ```bash
   cd wanderhub
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

4. Access the frontend in your browser:
   ```bash
   http://localhost:5173
   ```
### Running the Backend


1. Start the backend server:
   ```bash
   node server/server.js
   ```

2. Backend server will be running at:
   ```bash
   http://localhost:5038
   ```

# Deployment

The deployment of **WanderHub** was meticulously planned and executed to ensure high availability, scalability, and optimal user experience. The platform employs modern cloud-based hosting services to deliver seamless functionality and accessibility to users worldwide.

## Frontend Deployment

The frontend of WanderHub, developed using the **Vite** framework and **React.js**, is hosted on **Vercel**. This deployment offers several advantages:

- **Content Delivery Network (CDN):** The frontend is distributed globally via a CDN, enabling fast load times and minimizing latency for users across various regions.
- **Automated Builds:** Whenever changes are pushed to the GitHub repository, automatic builds and deployments are triggered, ensuring that the latest updates are live without requiring manual intervention.
- **Secure HTTPS:** The frontend benefits from HTTPS encryption, ensuring secure communication between the user’s browser and the server, thereby enhancing trust and data security.

## Backend Deployment

The backend, built with **Node.js**, is hosted on **Render**, which provides a robust environment for scalable and reliable services:

- **Dockerized Deployment:** The backend is containerized using Docker, ensuring consistent and isolated runtime environments across development and production stages.
- **Autoscaling:** Render’s autoscaling capabilities allow the backend to handle traffic spikes during peak usage periods, ensuring uninterrupted performance.
- **Persistent Services:** Backend services, such as API endpoints and database connections, are deployed as long-running instances to maintain functionality without disruptions.

## Database Hosting

The WanderHub platform leverages a **MongoDB** database hosted on a managed cloud service, offering:

- **Automatic Backups:** Regular backups ensure the safety of critical data and provide the ability to restore data in case of unforeseen issues.
- **Data Redundancy:** High availability is achieved through data replication, protecting against potential data loss.
- **Security Compliance:** The database adheres to strict access controls and encryption protocols to safeguard sensitive user information.

## Continuous Integration and Deployment (CI/CD)

The deployment pipeline follows a **Continuous Integration and Continuous Deployment (CI/CD)** approach to automate the development lifecycle:

- **GitHub Actions:** Automated tests and builds are executed to ensure code quality and reduce manual errors.
- **Zero Downtime Deployments:** Updates are seamlessly rolled out to production without affecting user access, providing a smooth transition for all updates and new features.
- **Streamlined Workflow:** Automated deployment processes to **Vercel** (frontend) and **Render** (backend) ensure quick and reliable releases.

# **Declaration**

We, Group 15, hereby declare that all  implementations presented in this project have been independently developed and written by ourselves. The work has been completed entirely by the team members and represents our original efforts.

Date: *[2024.11.30]*

