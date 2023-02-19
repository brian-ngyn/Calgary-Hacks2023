import React from "react";
import { Avatar, IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useUserAuth } from "../authentication/UserAuthContext";

function Navbar() {
  const location = useLocation();
  const { user, docSnap, googleSignIn, logout } = useUserAuth();

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignOut = async (e) => {
    try {
      await logout();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <div className="sticky top-0 bg-white m-w-full font-Varela border-b-2 border-black/5 pb-3 z-10">
        <div className="font-light text-s flex justify-between px-[9%] pt-6">
          <IconButton disableRipple component={Link} to="/home" style={{ backgroundColor: 'transparent' }}>
            <div className="text-2xl font-bold text-black">
              UpSkill
            </div>
          </IconButton>
          {(docSnap && !docSnap.new_sign_up) ? (
            <div className="group flex space-x-5 self-end pb-4 transition-all duration-300 ease-in-out">
              <Link
                className="text-l text-black hover:cursor-pointer hover:before:scale-x-100 hover:before:origin-left relative before:w-full before:h-0.5 before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-[#545454] before:absolute before:left-0 before:bottom-0"
                to="/teach"
              >
                Teach
              </Link>
              <div
                className="text-l text-black hover:cursor-pointer hover:before:scale-x-100 hover:before:origin-left relative before:w-full before:h-0.5 before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-[#545454] before:absolute before:left-0 before:bottom-0"
                onClick={(e) => logout(e)}
              >
                Sign Out
              </div>
            </div>
          ) : (<div className="group flex space-x-5 self-end pb-4 transition-all duration-300 ease-in-out">
            <div
              className="text-l text-black hover:cursor-pointer hover:before:scale-x-100 hover:before:origin-left relative before:w-full before:h-0.5 before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-[#545454] before:absolute before:left-0 before:bottom-0"
              onClick={(e) => handleGoogleSignIn(e)}
            >
              Get Started
            </div>
          </div>)}
        </div>
      </div>
    </>
  );
}
export default Navbar;
