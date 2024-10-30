## WanderHub
![WanderHub](https://github.com/user-attachments/assets/d4f57e32-5a97-404d-83c2-f1e32f53125c)
For the changes of the webpage and related documentation, we create a new github https://github.com/xinyuwang-nus/WanderHub for us to colleborate. 
**Developed by WANG Xinyu & YANG Yuebo

## Description

**Website which dashboard display as a map with different types of icons for users to write and share travel posts, create or join travel proposals, and provides a platform for travel agencies to promote their products. The user can select whatever they want form the webpage.**

- **Additional features requiring external api integration:**
    1. **Virtual Tours:** Allow users to explore dqestinations through immersive videos. Users can take virtual tours of cities, attractions, or hotels.
        - youtube api
    2. **Trip Planner:** Based on users’ selected destinations, WanderHub could generate an optimized travel itinerary 
        - google map (landing page?) instead of input text box, drop pins
        - open pins, show youtube videos
        - use gpt to connect pins to have itinerary
        - extendable navigation bar
    3. **Carbon Footprint Calculator:** Calculate the carbon footprint of their trips
        - gpt
    4. **Learn Basic Phrases**: Include a language tool that explains users basic travel-related phrases in the local language of their chosen destination.
        - gpt or google translate

## Accounts

- Regular account:
    - write and edit posts
    - create or join proposals
    - create personal wishlist of posts, proposals and products
    - comments for posts, proposals and products
- Business account
    - promote products
- Admin
    - account management
    - posts, proposals, products management

## APIs

### User API

**`POST /api/users`**

Register a new user.

**`POST /api/users/login`**

Log in a user.

**`GET /api/users/{userId}/profile`**

Retrieve a user profile.

**`PUT /api/users/{userId}/profile`**

Update a user profile.

**`GET /api/users/{userId}/posts`**

Retrieve all posts by a user.

**`GET /api/users/{userId}/proposals`**

Retrieve all proposals by a user.

**`GET /api/users/{userId}/wishlist`**

Retrieve user’s wishlist.

type (user|post | proposal | product) as query parameter

**`GET /api/users/{userId}/bookings`**

Retrieve a user’s product booking history.

### Post API

**`POST /api/posts`**

Create a new post.

**`GET /api/posts`**

Retrieve all posts.

**`GET /api/posts/{postId}`**

Retrieve details of a post.

**`PUT /api/posts/{postId}`**

Update a post.

**`DELETE /api/posts/{postId}`**

Delete a post.

### Proposal API

**`POST /api/proposals`**

Create a new proposal.

**`GET /api/proposals`**

Retrieve all proposals.

**`GET /api/posts/{proposalId}`**

Retrieve details of a proposal.

**`DELETE /api/proposals/{proposalId}`**

Delete a proposal.

**`PUT /api/proposals/{proposalId}`**

Update a proposal.

### Product API

> The above 5 CRUD methods also apply to Product.
> 

**`POST /api/products/{productId}/book`**

For users to book a travel product.

**`POST /api/products/{productId}/wishlist`**

For users to add a product to wishlist.

Since the user is authenticated, can retrieve the user id from the authentication token and do not need to pass it in the request body.

### **Comment API**

**`POST /api/comments`**

Add a comment.

"type": "post | proposal | product” in request body

**`GET /api/comments`**

Retrieve all comments on a post | proposal | product.

type and id as query parameters

**`DELETE /api/comments/{commentId}`**

Delete a comment.

### **Search API**

**`GET /api/search`**

Search across objects using a query string.

query string(search term) and type (user|post | proposal | product) as query parameter

### **Wishlist API**

**`POST/api/wishlist`**

Add posts, proposals and products to wishlist.

"type": "post | proposal | product” in request body

**`DELETE /api/wishlist/{listItemId}`**

Remove an item from the wishlist.

## Consideration

1. **Product Promotion**
    
    manage revenue sharing or commissions
    
2. **Notifications for Travel Proposals**:
    
    Notification Types: When someone joins a travel proposal, the proposal creator should receive a notification. We can implement:
    
    **Email notifications** for immediate updates.
    
    **In-app notifications** (real-time or batched).
    
3. **Communication Facilitation**: 
    
    Add group chat or direct messaging options for users in the same proposal to facilitate coordination.
    

## Figma

[https://www.notion.so/WanderHub-0ff6a651c265803896f2f128b6c81aba?pvs=4#c77f0a3b75544b949e9a633cf745e8b9](https://www.figma.com/design/qfcya4I7Vaa6q03qwsKzM5/WanderHub?node-id=31-122&node-type=canvas&t=2toFc9fgVecqZ0Bf-0)

