import UserTripItem from "./UserTripItem";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function UserTrip() {

  const [user, setUser] = useState(null);
  const [userTrips, setUserTrips] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: null }); 
  const navigate = useNavigate();

  useEffect(()=>{
    GetUserTrips();
  },[])

  /**
   * Fetch all trips for the logged-in user
   */
  const GetUserTrips = async () => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
  
    if (!user || !user.email) {
      navigate("/"); // Redirect if invalid or not logged in
      return;
    }
    setUser(user);
  
    try {
      const response = await fetch(
        `http://localhost:5038/api/user-trips?email=${user.email}`
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch user trips");
      }
  
      const trips = await response.json();
      setUserTrips(trips);
    } catch (err) {
      setStatus({ loading: false, error: err.message });
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const deleteTrip = async (tripId) => {
    try {
      const response = await fetch(
        `http://localhost:5038/api/user-trips/${tripId}?email=${user.email}`,
        { method: "DELETE" }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete trip");
      }
      setUserTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
    } catch (err) {
      console.error("Error deleting trip:", err.message);
    }
  };
  
  if (status.loading) return <p className="text-center text-2xl font-light text-gray-500 col-span-full mt-10">Loading user trip history...</p>;
  if (status.error) return <p className="text-center text-2xl font-light text-gray-500 col-span-full mt-10">Error: {status.error}</p>;

  return (
    <div className="sm:px-20 md:px-30 lg:px-60 xl:px-80 px-10 my-10">
      <h2 className="font-medium text-4xl">Trips History</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 my-10 gap-8">
        {userTrips?.length > 0 ? (
          userTrips.map((trip, index) => (
            <UserTripItem tripData={trip} key={index} onDelete={() => deleteTrip(trip.id)}/>
          ))
        ) : (
          <p className="text-center text-2xl font-light text-gray-500 col-span-full">
            You have no trips yet. Start by adding a new trip!
          </p>
        )}
      </div>
    </div>
  );
}
export default UserTrip;
