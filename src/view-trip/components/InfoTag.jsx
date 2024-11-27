import React from "react";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { CiShare2 } from "react-icons/ci";

function InfoTag({ tripData }) {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleShare = async () => {
    const url = window.location.href; // Current page URL
    const title = "Check out this amazing Singapore trip plan!";

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (error) {
        console.error("Error sharing the page:", error);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  const fetchImagesFromDatabase = async () => {
    try {
      const response = await fetch(
        `http://localhost:5038/api/trip-images/${tripData?.id}`
      );

      if (response.ok) {
        const data = await response.json();
        setImages(data.images);
        console.log("Fetched images from database:", images);
        return true;
      } else if (response.status === 404) {
        console.log("No images found in database, will fetch from Unsplash and save to database"); 
        return false;
      }
    } catch (error) {
      console.error("Error fetching images from database:", error);
      return false;
    }
  };

  const fetchImagesFromUnsplash = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${
          tripData?.selection?.destination?.label
        }&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}&per_page=5`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const newImages = data.results.map((image) => image.urls.regular);
        setImages(newImages);

        // Save to the database
        await fetch("http://localhost:5038/api/trip-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tripId: tripData?.id, images: newImages }),
        });
      }
    } catch (error) {
      console.error("Error fetching images from Unsplash:", error);
    }
  };

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      const imagesFound = await fetchImagesFromDatabase();
      if (!imagesFound) {
        await fetchImagesFromUnsplash();
      }
      setLoading(false);
    };
    if (tripData?.id) {
      loadImages();
    }
  }, [tripData]);

  return (
    <div>
      {loading ? (
        <div className="w-full h-[400px] flex items-center justify-center bg-gray-200 rounded-xl">
          <p>Loading images...</p>
        </div>
      ) : (
        <div className="relative w-full h-[400px]">
          <img
            src={
              images[currentIndex] ? images[currentIndex] : "/placeholder.jpg"
            }
            className="w-full h-full object-cover rounded-xl"
            style={{ filter: "saturate(0.5)" }}
          />
          {/* Navigation Buttons */}
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-900"
            onClick={handlePrevious}>
            {"<"}
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-900"
            onClick={handleNext}>
            {">"}
          </button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="text-4xl font-medium">
            {tripData?.selection?.destination?.label}
          </h2>
          <div className="hidden sm:flex gap-5 mt-2 font-light">
            <h2 className="p-1 px-3 bg-gray-100 rounded-full text-gray-500">
              {tripData?.selection?.duration} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-100 rounded-full text-gray-500">
              {tripData?.selection?.traveler}
            </h2>
            <h2 className="p-1 px-3 bg-gray-100 rounded-full text-gray-500">
              Hotel: {tripData?.selection?.budget}
            </h2>
            <h2 className="p-1 px-3 bg-gray-100 rounded-full text-gray-500">
              {tripData?.selection?.activities}
            </h2>
          </div>
        </div>
        <Button variant="ghost" onClick={handleShare}>
          <CiShare2 />
        </Button>
      </div>
    </div>
  );
}

export default InfoTag;
