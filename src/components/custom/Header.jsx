import React from 'react'
import { Button } from '../ui/button'

function Header() {
    return (
      <div className="p-3 shadow-sm flex items-center px-5">
        {/* Left Section (Spacer) */}
        <div className="flex-none w-1/3"></div>
  
        {/* Center Section (Logo) */}
        <div className="flex-grow flex justify-center w-1/3">
          <img src="/logo.svg" alt="Logo" />
        </div>
  
        {/* Right Section (Sign In Button) */}
        <div className="flex-none w-1/3 flex justify-end">
          <Button variant="secondary">Sign In</Button>
        </div>
      </div>
    );
  }
  
  export default Header;
  