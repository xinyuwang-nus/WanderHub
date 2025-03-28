import React from "react";
import { useEffect, useState } from "react";
import Accommodation from "../components/Accommodation";
import InfoTag from "../components/InfoTag";
import Plan from "../components/Plan";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../BASE_URL";

function ViewTrip() {
  const { tripId } = useParams(); // Get tripId from the URL
  const [tripData, setTripData] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: null }); 

  useEffect(() => {
    fetchTripData();
  }, [tripId]);

  const fetchTripData = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/trips/${tripId}`
      );
      if (!response.ok) throw new Error("Failed to fetch trip data");
      const data = await response.json();
      setTripData(data);
      console.log("fetched data, ",  data);
    } catch (err) {
      setStatus({ loading: false, error: err.message });
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  if (status.loading) return <p className="text-center text-2xl font-light text-gray-500 col-span-full mt-10">Loading trip data...</p>;
  if (status.error) return <p className="text-center text-2xl font-light text-gray-500 col-span-full mt-10">Error: {status.error}</p>;

  return (
    <div className="sm:px-20 md:px-30 lg:px-60 xl:px-80 px-10 my-10">
      <InfoTag tripData={tripData} />
      <Accommodation tripData={tripData}/>
      <Plan tripData={tripData}/>
    </div>
  );
}

export default ViewTrip;
