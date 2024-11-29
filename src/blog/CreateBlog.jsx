import React, { useState, useEffect, useRef } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { API_BASE_URL } from "../../BASE_URL";

const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#eeeeee" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#c9c9c9" }],
  },
];

function CreateBlog() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    email: "",
    location: "",
    mood: "",
    latitude: 0,
    longitude: 0,
  });
  const [successMessage, setSuccessMessage] = useState("");
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);
  const navigate = useNavigate();

  const displayRecentBlogs = 6;

  const moods = [
    { label: "Happy", value: "Happy" },
    { label: "Adventurous", value: "Adventurous" },
    { label: "Relaxed", value: "Relaxed" },
    { label: "Romantic", value: "Romantic" },
    { label: "Curious", value: "Curious" },
  ];

  useEffect(() => {
    getUser();
    fetchBlogs(); // Fetch blogs when the component mounts
    loadGoogleMapsAPI();
  }, []);

  const getUser = async () => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    if (!user || !user.email) {
      navigate("/"); // Redirect if invalid or not logged in
      return;
    }

    setForm((prevForm) => ({
      ...prevForm,
      author: user.name || "Anonymous",
      email: user.email,
    }));
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs`);
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        console.error("Failed to fetch blogs.");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const loadGoogleMapsAPI = () => {
    if (window.google && window.google.maps) {
      initializeMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_PLACE_API_KEY
      }&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    }
  };

  const initializeMap = () => {
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 1.3521, lng: 103.8198 },
      zoom: 12,
      styles: mapStyles,
    });

    const searchBox = new window.google.maps.places.SearchBox(
      document.getElementById("location-search")
    );
    mapInstance.controls[window.google.maps.ControlPosition.TOP_LEFT].push(
      document.getElementById("location-search")
    );

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) return;

      const place = places[0];
      const { lat, lng } = place.geometry.location;

      mapInstance.setCenter({ lat: lat(), lng: lng() });

      const newMarker = new window.google.maps.Marker({
        position: { lat: lat(), lng: lng() },
        map: mapInstance,
      });

      setMarker(newMarker);
      setForm((prev) => ({
        ...prev,
        location: place.formatted_address,
        latitude: lat(),
        longitude: lng(),
      }));
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          mapInstance.setCenter({ lat: latitude, lng: longitude });

          const newMarker = new window.google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: mapInstance,
          });

          setMarker(newMarker);
          setForm((prev) => ({
            ...prev,
            location: "Current Location",
            latitude,
            longitude,
          }));
        },
        () => console.error("Unable to retrieve location")
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.content ||
      !form.author ||
      !form.location ||
      !form.mood
    ) {
      toast("Please fill all details");
      return;
    }

    const newBlog = {
      ...form,
      date: new Date().toLocaleString(),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlog),
      });

      if (response.ok) {
        fetchBlogs(); // Refresh the list of blogs after submission
        setForm({ title: "", content: "", author: "", location: "", mood: "" });
        setSuccessMessage("Thank you for sharing your blog!");
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        console.error("Failed to submit blog.");
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  return (
    <div className="sm:px-10 md:px-30 lg:px-60 xl:px-80 px-5 my-10">
      {/* Blog Submission Form */}
      <h2 className="text-5xl mt-20">Share Your Blog</h2>
      <p className="mt-3 text-gray-500 text-xl font-light">
        Let the world know about your travel experiences!
      </p>

      <div className="mt-20 flex flex-col gap-5">
        {/* <form onSubmit={handleSubmit} className="space-y-6"> */}
        <div>
          <h2 className="text-xl my-3">Title</h2>
          <Input
            placeholder="Enter blog title"
            type="text"
            value={form.title}
            onChange={(e) => handleChange(e)}
            name="title"
            required
          />
        </div>

        <div>
          <h2 className="text-xl my-3">Content</h2>
          <Textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Write your travel story"
            className="w-full border rounded-lg px-4 py-2"
            rows="5"
            required
          />
        </div>

        <div>
          <h2 className="text-xl my-3">Author</h2>
          <p className="font-light">{form.author || ""}</p>
        </div>

        <div>
          <h2 className="text-xl my-3">Location Selector</h2>
          <Input
            id="location-search"
            placeholder="Search location"
            type="text"
            value={form.location}
            onChange={(e) => handleChange(e)}
            name="location"
            className="w-1/2 mt-3"
          />
          <p className="text-gray-500 my-2">
            {form.location || "Searching for your location..."}
          </p>
          <div
            ref={mapRef}
            className="w-full h-[350px] border rounded-lg"></div>
        </div>

        <div>
          <h2 className="text-xl my-3">Mood</h2>
          <div className="grid grid-cols-5 gap-3 mt-2">
            {moods.map((mood) => (
              <div
                key={mood.value}
                className={`p-4 border rounded-lg hover:scale-105 transition-all ${
                  form.mood === mood.value && "border-black"
                }`}
                onClick={() =>
                  setForm((prev) => ({ ...prev, mood: mood.value }))
                }>
                <h2 className="font-light">{mood.label}</h2>
              </div>
            ))}
          </div>
        </div>
        {successMessage && (
          <div className="text-green-600">{successMessage}</div>
        )}
        <div className="flex justify-center mt-10">
          <Button
            onClick={handleSubmit}
            type="submit"
            className="text-lg w-1/3">
            Submit Blog
          </Button>
        </div>

        {/* </form> */}
      </div>

      {/* Display Blogs */}
      <div className="mt-20">
        <h2 className="text-3xl font-medium mb-6">Latest Blogs</h2>
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.slice(-displayRecentBlogs).map((blog, index) => (
              <div
                key={index}
                className="p-6 border rounded-lg hover:shadow-lg transition-all">
                <h3 className="text-2xl mb-2">{blog.title}</h3>
                <p className="text-sm text-gray-500 mb-1">
                  By {blog.author} on {blog.date}
                </p>
                <p className="text-sm text-gray-500 mb-1">Mood: {blog.mood}</p>
                <p className="mt-3 text-gray-700">{blog.content}</p>
                <p className="text-sm text-gray-500 mt-3">
                  Location: {blog.location}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            No blogs submitted yet. Be the first to share your story!
          </p>
        )}

<div className="mt-8 flex justify-center">
    <Link
      to="/view-blogs"
      className="flex items-center px-6 py-3 text-black bg-white rounded-md text-lg">
      View All Blogs
      <FiChevronRight className="ml-2" />
    </Link>
  </div>
      </div>


    </div>
  );
}

export default CreateBlog;
