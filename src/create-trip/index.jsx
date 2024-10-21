// rfce
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "../components/ui/input";
import {
  SelectBudgetOptions,
  SelectTravelerOptions,
    SelectAccommodationOptions,
    SelectActivityOptions,
} from "../constants/options";
import { Button } from "../components/ui/button";

function CreateTrip() {
  const [destination, setDestination] = useState("");
  const [formData, setFormData] = useState({});

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  //   useEffect(() => {
  //     console.log("form data: ", formData);
  //   }, [formData]);

  const createTrip = () => {
    if (formData?.duration <= 0) {
      console.log("Please enter valid duration, longer than 0 days");
      return;
    }
    console.log("form data: ", formData);
  };

  return (
    <div className="sm:px-10 md:px-30 lg:px-60 xl:px-80 px-5 my-10">
      <h2 className="text-5xl mt-20">Tell us about your information</h2>
      <p className="mt-3 text-gray-500 text-xl font-light">
        Get customized trip based on your information!
      </p>

      <div className="mt-20 flex flex-col gap-5">
        <div>
          <h2 className="text-xl my-3">Destination</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              destination,
              onChange: (value) => {
                setDestination(value);
                handleInputChange("destination", value);
                console.log("fetched from google places api: ", value);
              },
              placeholder: "Search",
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3">Duration</h2>
          <Input
            placeholder="Days"
            type="number"
            onChange={(e) => handleInputChange("duration", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3">Traveler</h2>
          <div className="grid grid-cols-4 gap-3 mt-2">
            {SelectTravelerOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", option.people)}
                className={`p-4 border rounded-lg hover:scale-105 transition-all
                    ${formData?.traveler == option.people && "border-black"}`}>
                {/* <h2 className="text-2xl">{option.icon}</h2> */}
                <h2 className="font-light">{option.title}</h2>
                <h2 className="text-sm text-gray-500">{option.people}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3">Budget</h2>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {SelectBudgetOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", option.title)}
                className={`p-4 border rounded-lg hover:scale-105 transition-all
                    ${formData?.budget == option.title && "border-black"}`}>
                {/* <h2 className="text-2xl">{option.icon}</h2> */}
                <h2 className="font-light">{option.title}</h2>
                {/* <h2 className="text-sm text-gray-500">{option.desc}</h2> */}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3">Accommodation</h2>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {SelectAccommodationOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("accommodation", option.title)}
                className={`p-4 border rounded-lg hover:scale-105 transition-all
          ${formData?.accommodation === option.title && "border-black"}`}>
                <h2 className="font-light">{option.title}</h2>
                <h2 className="text-sm text-gray-500">{option.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3">Activity</h2>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {SelectActivityOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("activities", option.title)}
                className={`p-4 border rounded-lg hover:scale-105 transition-all
          ${formData?.activities === option.title && "border-black"}`}>
                <h2 className="font-light">{option.title}</h2>
                <h2 className="text-sm text-gray-500">{option.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10 flex justify-center">
          <Button onClick={createTrip} className="text-lg w-1/2">
            Create Your Trip
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
