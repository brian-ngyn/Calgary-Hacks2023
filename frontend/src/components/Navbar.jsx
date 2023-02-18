import React from "react";
import { Avatar, IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useUserAuth } from "../authentication/UserAuthContext";

function Navbar() {
  const location = useLocation();
  const { user, docSnap } = useUserAuth();

  return (
    <>
      {docSnap && !docSnap.new_sign_up && (
        <div className="bg-white text-black m-w-full">
          <div className="font-light text-s flex justify-around pt-1">
            <IconButton component={Link} to="/home">
              <Avatar src="/vite.svg" />
            </IconButton>
            <div className="group flex space-x-5 self-end pb-4 transition-all duration-300 ease-in-out">
              <Link
                className={location.pathname == "/page1" ?
                  "underline underline-offset-[4px] decoration-2 " :
                  `hover:before:scale-x-100 hover:before:origin-left relative before:w-full before:h-0.5 before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-[#545454] before:absolute before:left-0 before:bottom-0`}
                to="/page1"
              >
                Page 1
              </Link>
              <Link
                className={location.pathname == "/page2" ?
                  "underline underline-offset-[4px] decoration-2 " :
                  "hover:before:scale-x-100 hover:before:origin-left relative before:w-full before:h-0.5 before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-[#545454] before:absolute before:left-0 before:bottom-0 "}
                to="/page2"
              >
                Page 2
              </Link>
            </div>
          </div>
        </div>)}
    </>
  );
}
export default Navbar;
