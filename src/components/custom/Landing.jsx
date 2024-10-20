import React from "react";
import { Button } from "../ui/button";
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="flex items-center justify-center h-screen text-center font-afacad">
      <div>
        <h1 className="font-light">
          <span className="text-[50px] text-gray-500">
            Discover Your Next Destination with
          </span>
          <br />
          <span className="text-[80px] font-medium">WanderHub</span>
        </h1>
        <p className="text-xl text-gray-500 font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="mt-8">
          <Link to={"/create-trip"}>
            <Button variant="secondary" className="text-lg">Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
