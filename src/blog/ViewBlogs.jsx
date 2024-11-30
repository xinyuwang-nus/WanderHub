import React, { useState, useEffect, useRef } from "react";
import locationIcon from "./location.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AiOutlineDelete } from "react-icons/ai";
import { SlLike } from "react-icons/sl";
import { CiShare2 } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../BASE_URL";

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
} from "@/components/ui/alert-dialog";

const greyWhiteMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#e8e8e8" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#6b6b6b" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ color: "#c6c6c6" }],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [{ color: "#8b8b8b" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9b9b9b" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#d3d3d3" }],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [{ color: "#737373" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#bdbdbd" }],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [{ color: "#a0a0a0" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#d9d9d9" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
];

function ViewBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null); // State to store user info
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [showUserBlogs, setShowUserBlogs] = useState(false); // State to toggle user blog view
  const [error, setError] = useState("");
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [view, setView] = useState("blogs"); // "map" or "blogs"

  useEffect(() => {
    fetchBlogs();
    getUser();
  }, []);

  useEffect(() => {
    // Reload the map when switching back to the map view
    if (view === "map") {
      loadGoogleMapsAPI();
    }
  }, [view, showUserBlogs]);

  useEffect(() => {
    // Filter blogs by user email
    if (user && showUserBlogs) {
      const filtered = blogs.filter((blog) => blog.email === user.email);
      setFilteredBlogs(filtered);
    }
  }, [user, blogs, showUserBlogs]);

  const getUser = async () => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (user) setUser(user);
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs`);
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        setError("Failed to fetch blogs. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("An error occurred while fetching blogs.");
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/blogs/${blogId}?email=${user.email}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete blog");
      }

      // Update the state by filtering out the deleted blog
      setBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id.toString() !== blogId)
      );
    } catch (err) {
      console.error("Error deleting blog:", err.message);
    }
  };

  const loadGoogleMapsAPI = () => {
    if (window.google && window.google.maps) {
      initializeMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_PLACE_API_KEY
      }`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    }
  };

  const initializeMap = () => {
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 0, lng: 0 },
      zoom: 2,
      mapTypeId: "roadmap",
      styles: greyWhiteMapStyles,
    });

    setMap(mapInstance);
    setInfoWindow(new window.google.maps.InfoWindow());
  };

  const handleLike = async (blog) => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: blog.title }),
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        setBlogs((prevBlogs) =>
          prevBlogs.map((b) =>
            b.title === blog.title ? { ...b, likes: updatedBlog.likes } : b
          )
        );
      } else {
        console.error("Failed to update likes.");
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleShare = async (blog) => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/share`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: blog.title }),
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        setBlogs((prevBlogs) =>
          prevBlogs.map((b) =>
            b.title === blog.title ? { ...b, shares: updatedBlog.shares } : b
          )
        );

        // Generate a shareable link
        const shareLink = `${window.location.origin}/blogs/${encodeURIComponent(blog.title)}`;
        if (navigator.share) {
          try {
            await navigator.share({
              title: blog.title,
              text: `Check out this blog: ${blog.title}`,
              url: shareLink,
            });
          } catch (error) {
            console.error("Error sharing the page:", error);
          }
        } else {
          navigator.clipboard.writeText(shareLink);
          alert(`Share link copied to clipboard: ${shareLink}`);
        }
      } else {
        console.error("Failed to update shares.");
      }
    } catch (error) {
      console.error("Error updating shares:", error);
    }
  };

  useEffect(() => {
    if (map) {
      addMarkersToMap(showUserBlogs ? filteredBlogs : blogs);
    }
  }, [map, blogs, filteredBlogs, showUserBlogs]);

  const addMarkersToMap = (blogsToDisplay) => {
    blogsToDisplay.forEach((blog) => {
      const geocoder = new window.google.maps.Geocoder();
      if (blog.location) {
        geocoder.geocode({ address: blog.location }, (results, status) => {
          if (status === "OK" && results[0]) {
            const location = results[0].geometry.location;

            const marker = new window.google.maps.Marker({
              position: location,
              map,
              title: blog.title,
              icon: {
                url: locationIcon,
                scaledSize: new window.google.maps.Size(30, 30),
              },
            });

            // Add a click listener for the marker
            marker.addListener("click", () => {
              infoWindow.setContent(generateInfoWindowContent(blog));
              infoWindow.open(map, marker);
            });
          }
        });
      }
    });
  };

  const generateInfoWindowContent = (blog) => {
    return `
      <div style="font-family: 'Afacad Flux', sans-serif; max-width: 320px; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <div style="display: flex; gap: 10px; padding: 10px;">
          <div style="flex: 1;">
            <h2 style="margin: 0; font-size: 16px; font-weight: bold; color: #333;">${
              blog.title
            }</h2>
            <h3 style="margin: 5px 0 10px 0; font-size: 15px; font-weight: 500; color: #555;">${
              blog.author || "Unknown Author"
            }</h3>
            <p style="margin: 0; font-size: 14px; color: #777;">${
              blog.date || "Unknown Date"
            }</p>
          </div>
        </div>
        <div style="padding: 10px; border-top: 1px solid #eee;">
          <p style="margin: 0; font-size: 14px; color: #666; line-height: 1.5;">
            <strong>Mood:</strong> ${blog.mood || "N/A"}<br/>
            <strong>Location:</strong> ${
              blog.location || "Unknown Location"
            }<br/>
            <strong>Details:</strong> ${blog.content || "No details available"}
          </p>
        </div>
      </div>
    `;
  };

  const BlogActions = ({ blog, handleLike, handleShare }) => {
    return (
      <div className="flex items-center gap-4 mt-4">
        {/* Like Button */}
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => handleLike(blog)}>
          <SlLike />
          <span className="font-light">{blog.likes || 0}</span>
        </Button>

        {/* Share Button */}
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => handleShare(blog)}>
          <CiShare2 />
          <span className="font-light">{blog.shares || 0}</span>
        </Button>
      </div>
    );
  };

  const BlogList = ({ blogs }) => (
    <>
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="p-6 border rounded-lg hover:shadow-lg transition-all">
              <h3 className="text-2xl font-semibold mb-2">
                {blog.title || "Untitled"}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                By {blog.author || "Unknown"} on {blog.date || "Unknown Date"}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Mood: {blog.mood || "N/A"}
              </p>
              <p className="mt-3 text-gray-700">
                {blog.content || "No content available."}
              </p>
              <p className="text-sm text-gray-500 mt-3">
                Location: {blog.location || "No location specified"}
              </p>

              <BlogActions
                blog={blog}
                handleLike={handleLike}
                handleShare={handleShare}
              />

              {user && blog.email === user.email && (
                <div className="flex justify-end">
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <AiOutlineDelete />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure to delete?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the trip.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteBlog(blog._id.toString())}>
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          {showUserBlogs
            ? "No blogs found for your account."
            : "No blogs submitted yet. Be the first to share your story!"}
        </p>
      )}
    </>
  );

  return (
    <div className="relative min-h-screen">
      {/* Ensures a consistent height */}

      <div
        className={`absolute ${
          view === "blogs" ? "top-2" : "top-12"
        } left-1/2 transform -translate-x-1/2 z-10`}>
        <div className="flex justify-center items-center gap-4 mb-6">
          {/* View Selector */}
          <Select onValueChange={(value) => setView(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="map">Map View</SelectItem>
              <SelectItem value="blogs">Card View</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter Blogs Selector */}
          <Select onValueChange={(value) => setShowUserBlogs(value === "user")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Blogs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Blogs</SelectItem>
              <SelectItem value="user">My Blogs</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {view === "map" && (
        // Map View
        <div className="relative h-screen w-screen">
          {error && (
            <div className="absolute top-24 left-4 text-red-500 bg-white p-2 rounded-lg shadow-lg">
              {error}
            </div>
          )}
          <div ref={mapRef} className="absolute inset-0"></div>
        </div>
      )}
      {view === "blogs" && (
        <div className="sm:px-10 md:px-30 lg:px-60 xl:px-80 px-5 my-10 pt-20">
          {/* Blogs Section */}
          <div className="flex justify-left mb-6 gap-5">
            <h2 className="text-3xl font-medium">
              {showUserBlogs ? "My Blogs" : "All Blogs"}
            </h2>
            {user && (
              <Link to={"/create-blog"}>
                <Button variant="secondary" className="flex items-center">
                  <IoAdd />
                </Button>
              </Link>
            )}
          </div>

          {error && (
            <div className="text-red-500 bg-white p-4 rounded-lg shadow-md mb-4">
              {error}
            </div>
          )}
          <BlogList blogs={showUserBlogs ? filteredBlogs : blogs} />
        </div>
      )}
    </div>
  );
}

export default ViewBlogs;
