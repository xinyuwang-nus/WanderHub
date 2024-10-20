import React from "react";

function Footer() {
    return (
      <footer className="bg-gray-100 text-gray-400 py-2">
        <div className="container mx-auto flex justify-center items-center px-5">
          
          <div className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Logo" className="h-4 opacity-50" /> 
            <span className="text-sm">© {new Date().getFullYear()} NUS. All rights reserved.</span>
          </div>
  
        </div>
      </footer>
    );
  }
  
  export default Footer;
  