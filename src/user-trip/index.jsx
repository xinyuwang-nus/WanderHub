import UserTripItem from "./UserTripItem";

function UserTrip() {
  var userTrips = [
    {
      userSelection: {
        destination: "Tokyo, Japan",
        duration: 5,
        budget: "$1500",
      },
    },
    {
      userSelection: {
        destination: "Paris, France",
        duration: 7,
        budget: "$2000",
      },
    },
    {
      userSelection: {
        destination: "Sydney, Australia",
        duration: 10,
        budget: "$3000",
      },
    },
    {
      userSelection: {
        destination: "New York, USA",
        duration: 4,
        budget: "$1200",
      },
    },
    {
      userSelection: {
        destination: "Singapore",
        duration: 3,
        budget: "$1000",
      },
    },
  ];

  // userTrips = [];

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-medium text-4xl">My Trips</h2>

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
