import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function UserTripItem({ tripData, onDelete }) {
  const [image, setImage] = useState("/placeholder-image.jpeg");

  useEffect(() => {
    const fetchImageFromDatabase = async () => {
      try {
        const response = await fetch(
          `http://localhost:5038/api/trip-images/${tripData?.id}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.images && data.images.length > 0) {
            setImage(data.images[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching trip image:", error);
      }
    };

    if (tripData?.id) {
      fetchImageFromDatabase();
    }
  }, [tripData]);

  return (
    <div className="hover:scale-105 transition-all rounded-lg overflow-hidden border">
      <Link to={`/view-trip/${tripData?.id}`}>
        <img
          src={image}
          className="h-[200px] w-full object-cover"
          style={{ filter: "saturate(0.5)" }}
        />
      </Link>
  
      <div className="p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg text-black">
            {tripData?.selection?.destination?.label}
          </h2>
          <h2 className="text-sm font-light text-gray-500">
            {tripData?.selection?.duration} Days, {tripData?.selection?.traveler},{" "}
            {tripData?.selection?.activities}
          </h2>
        </div>
  

        <AlertDialog>
          <AlertDialogTrigger>
          <AiOutlineDelete />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure to delete?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the trip.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                  Cancel
              </AlertDialogCancel> 
              <AlertDialogAction onClick={() => onDelete(tripData.id)}>
                  Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
  
  
}

export default UserTripItem;
