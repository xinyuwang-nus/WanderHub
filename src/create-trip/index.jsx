// rfce
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "../components/ui/input";
import {
  SelectBudgetOptions,
  SelectTravelerOptions,
  // SelectAccommodationOptions,
  SelectActivityOptions,
  AI_PROMPT,
} from "../constants/options";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/Gemini";
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
import axios from "axios";

function CreateTrip() {
  const [destination, setDestination] = useState("");
  const [formData, setFormData] = useState({});
  const [showSignInWindow, setShowSignInWindow] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:5038";

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  //   useEffect(() => {
  //     console.log("form data: ", formData);
  //   }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      getProfile(codeResponse);
    },
    onError: (error) => console.log(error),
  });

  const createTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      // require sign in and show sign in window
      setShowSignInWindow(true);
      return;
    }

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
    setLoading(true);
    toast("Generating trip...");
    const PROMPT = AI_PROMPT.replace(
      "{destination}",
      formData?.destination?.label
    )
      .replace("{duration}", formData?.duration)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{activities}", formData?.activities);

    console.log("form data: ", formData);
    console.log("PROMPT: ", PROMPT);

    // generate trip by sending message to LLM API
    const result = await chatSession.sendMessage(PROMPT);

    console.log("--", result?.response?.text());
    saveTrip(result?.response?.text());
  };

  // const getProfile = (tokenInfo) => {
  //   axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
  //     headers: {
  //       Authorization: `Bearer ${tokenInfo?.access_token}`,
  //       Accept: 'Application/json'
  //     }
  //   }).then((response) => {
  //     console.log(response);
  //     localStorage.setItem('user', JSON.stringify(response.data));
  //     setShowSignInWindow(false);
  //     createTrip();
  //   })
  // }

  const getProfile = (tokenInfo) => {
    fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "Application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        setShowSignInWindow(false);
        createTrip();
      })
      .catch((error) => console.log(error));
  };

  const saveTrip = async (trip) => {
    toast("Saving your trip...");

    const user = JSON.parse(localStorage.getItem("user"));

    const tripData = {
      selection: formData,
      trip: JSON.parse(trip),
      email: user?.email,
      id: Date.now().toString(),
    };

    try {
      const response = await fetch(API_URL + "/api/trips", {
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
    }
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
            placeholder="Days (> 0 and <= 7 days)"
            type="number"
            onChange={(e) => handleInputChange("duration", e.target.value)}
          />
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
          <Button onClick={createTrip} disabled={loading} className="text-lg w-1/2">
            {loading ? <AiOutlineLoading className='animate-spin'/> : "Create Your Trip"} 
          </Button>
        </div>
      </div>

      <Dialog open={showSignInWindow}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="text-2xl mt-5 text-black">Sign In</h2>
              <p className="font-light">Sign in to get your customized trip</p>

              <div className="mt-5 flex justify-center">
                <Button
                  variant="secondary"
                  onClick={login}
                  className="w-1/2 items-center">
                  <FaGoogle />
                  Sign In With Google
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
