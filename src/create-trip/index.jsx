// rfce
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "../components/ui/input";
import {
  SelectBudgetOptions,
  SelectTravelerOptions,
  // SelectAccommodationOptions,
  SelectActivityOptions,
} from "./options";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { FaGoogle } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { AiOutlineLoading } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { API_BASE_URL } from "../../BASE_URL";

function CreateTrip() {
  const [destination, setDestination] = useState("");
  const [formData, setFormData] = useState({});
  const [showSignInWindow, setShowSignInWindow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  //   useEffect(() => {
  //     console.log("form data: ", formData);
  //   }, [formData]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        window.location.reload();
      }
    }, 1000); 
    return () => clearTimeout(timeout);
  }, []);

  const createTrip = async () => {
    if (
      !formData?.destination ||
      !formData?.duration ||
      !formData?.budget ||
      !formData?.traveler ||
      !formData?.activities
    ) {
      // || !formData?.accommodation
      toast("Please fill all details");
      return;
    }
    if (formData?.duration <= 0 || formData?.duration > 7) {
      toast("Duration should > 0 and <= 7 days");
      return;
    }

    const user = localStorage.getItem("user");
    if (!user) {
      // require sign in and show sign in window
      setShowSignInWindow(true);
      return;
    }

    setLoading(true);
    toast("Generating trip...");

    const requestBody = {
      destination: formData?.destination?.label,
      duration: formData?.duration,
      traveler: formData?.traveler,
      budget: formData?.budget,
      activities: formData?.activities,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/create-trip`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch travel plan: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Generated trip: ", result);

      saveTrip(result);
    } catch (error) {
      console.error("Error generating trip:", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      getGoogleProfile(codeResponse).then(() => {
        setShowSignInWindow(false);
        createTrip();
      });
    },
    onError: (error) => console.log(error),
  });

  const getGoogleProfile = async (tokenInfo) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      );
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("google-user", JSON.stringify(data)); // need to save google avatar
    } catch (error) {
      console.error(error);
    }
  };

  const saveTrip = async (trip) => {
    // toast("Saving your trip...");

    const user = JSON.parse(localStorage.getItem("user"));

    const tripData = {
      selection: formData,
      trip: trip,
      email: user?.email,
      id: Date.now().toString(),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/trips`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripData),
      });

      const result = await response.json();
      console.log("Trip saved:", result);
      toast("Trip saved successfully!");
    } catch (error) {
      console.error("Error saving trip:", error);
      toast("Failed to save trip");
    } finally {
      setLoading(false);
      navigate("/view-trip/" + tripData.id);
      window.location.reload();
    }
  };

  return (
    <div className="sm:px-10 md:px-30 lg:px-60 xl:px-80 px-5 my-10">
      <h2 className="text-5xl mt-20">Tell us about your new trip</h2>
      <p className="mt-3 text-gray-500 text-xl font-light">
        Get customized trip based on your information!
      </p>

      <div className="mt-20 flex flex-col gap-5">
        <div className="flex flex-wrap gap-5">
          <div className="flex-1 min-w-[250px]">
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
          <div className="flex-1 min-w-[250px]">
            <h2 className="text-xl my-3">Duration</h2>
            <Input
              placeholder="Days (> 0 and <= 7 days)"
              type="number"
              onChange={(e) => handleInputChange("duration", e.target.value)}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3">Traveler</h2>
          <div className="grid grid-cols-5 gap-3 mt-2">
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
          <h2 className="text-xl my-3">Hotel Budget</h2>
          <div className="grid grid-cols-5 gap-3 mt-2">
            {SelectBudgetOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", option.desc)}
                className={`p-4 border rounded-lg hover:scale-105 transition-all
                    ${formData?.budget == option.desc && "border-black"}`}>
                {/* <h2 className="text-2xl">{option.icon}</h2> */}
                <h2 className="font-light">{option.title}</h2>
                <h2 className="text-sm text-gray-500">{option.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* <div>
          <h2 className="text-xl my-3">Accommodation</h2>
          <div className="grid grid-cols-4 gap-3 mt-2">
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
        </div> */}

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
          <Button
            onClick={createTrip}
            disabled={loading}
            className="text-lg w-1/2">
            {loading ? (
              <AiOutlineLoading className="animate-spin" />
            ) : (
              "Create Your Trip"
            )}
          </Button>
        </div>
      </div>

      <Dialog open={showSignInWindow}>
        <DialogContent>
          <img src="/logo.svg" alt="Logo" />
          <h2 className="text-2xl text-black">Sign In</h2>
          <p className="font-light">Sign in to get your customized trip</p>
          <div className="flex justify-center gap-2">
            <Button
              variant="secondary"
              onClick={login}
              className="w-1/2 items-center">
              <FaGoogle />
              Sign In with Google
            </Button>
            <Link
              to="/sign-in"
              state={{ from: location }}
              className="w-1/2 items-center">
              <Button variant="secondary" className="w-full">
                Sign In with WanderHub
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
