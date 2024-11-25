import UserTripItem from "./UserTripItem";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function UserTrip() {

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
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user);

    if (!user) {
      navigate("/"); // Redirect if user is not logged in
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5038/api/user-trips?email=${user.email}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user trips");
      }

      const trips = await response.json();
      setUserTrips(trips);
      // console.log("fetched data, ",  trips);
    } catch (err) {
      setStatus({ loading: false, error: err.message });
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
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
            <UserTripItem trip={trip} key={index} />
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
