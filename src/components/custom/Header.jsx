import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";

function Header() {
  // Fetch user info if exists
  const [user, setUser] = useState(null);
  const [googleUser, setGoogleUser] = useState(null);
  const token = localStorage.getItem("token");

  // Fetch user info if token exists
  useEffect(() => {
    if (token) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [token]);

  useEffect(() => {
    if (localStorage.getItem("google-user")) {
      setGoogleUser(JSON.parse(localStorage.getItem("google-user")));
    }
  }, []); // will only be triggered when the component is mounted

  // Google login logic
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      //   console.log(codeResponse);
      getGoogleProfile(codeResponse);
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
      setGoogleUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("google-user", JSON.stringify(data)); // need to save google avatar
    } catch (error) {
      console.error(error);
    }
  };

  // Logout logic
  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("google-user");
    setUser(null);
    window.location.reload();
  };

  return (
    <div className="p-3 shadow-sm flex items-center px-5">
      {/* Left Section (Spacer) */}
      <div className="flex-none w-1/3"></div>

      {/* Center Section (Logo) */}
      <div className="flex-grow flex justify-center w-1/3">
        <a href="/">
          <img src="/logo.svg" alt="Logo" />
        </a>
      </div>

      {/* Right Section (User) */}
      <div className="flex-none w-1/3 flex justify-end">
        {googleUser || user ? (
          <div>
            <Popover>
              <PopoverTrigger>
                <div className="h-[30px] w-[30px] rounded-full bg-gray-200 flex items-center justify-center">
                  {googleUser?.picture ? (
                    <img
                      src={googleUser.picture}
                      alt="User Avatar"
                      className="h-full w-full rounded-full"
                    />
                  ) : (
                    <IoPersonOutline className="h-[20px] w-[20px] text-gray-500" />
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="flex items-center gap-2">
                <a href="/create-trip">
                  <Button variant="outline" className="text-black">
                    New Trip
                  </Button>
                </a>
                <a href="/user-trip">
                  <Button variant="outline" className="text-black">
                    History
                  </Button>
                </a>
                <Button
                  variant="outline"
                  className="text-black"
                  onClick={handleLogout}>
                  Sign Out
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Sign In</Button>
            </DialogTrigger>
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
                <a href="/sign-in" className="w-1/2 items-center">
                  <Button variant="secondary" className="w-full">
                    Sign In with WanderHub
                  </Button>
                </a>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default Header;
