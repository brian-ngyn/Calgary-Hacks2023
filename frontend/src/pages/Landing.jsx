import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../authentication/UserAuthContext";

import * as React from 'react';

import money from "../assets/money.svg"
import cooking from "../assets/cooking.svg"
import friends from "../assets/friends.svg"

const steps = ["Teach", "Learn", "Connect"];
const message = ["Earn money by sharing your skills with peers in your community", 
                "Pick up a hobby and learn a new skill at an affordable price",
                "Learn directly from like-minded peers in your community and foster new friendships"];

function Landing() {
  const [error, setError] = useState("");
  const { user, docSnap, googleSignIn, makeUserDB, getUserDB } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user != null) {
      makeUserDB().then(() => {
        getUserDB();
      });
    }
  }, [user, makeUserDB])

  useEffect(() => {
    if (docSnap != null) {
      if (docSnap.new_sign_up) {
        navigate("/register");
      } else {
        navigate("/home");
      }
    }
  }, [docSnap, navigate]);

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeStep === 2) {
        setActiveStep(0);
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [activeStep]);

  return (
    <>
      <div className="bg-white text-black font-body min-h-screen">
        {
          !user && (
            <div className="bg-white text-black min-h-screen">
              <div className="grid grid-cols-2 pt-[2%] items-center space-y-10 pr-[15%] pl-[10%]">
                <div className="flex flex-col items-end justify-center font-semibold space-y-10">
                  <div className="space-y-5 p-[20%]">
                    <div className="text-5xl font-header">
                      Discover a new passion
                    </div>
                    <div className="font-light text-2xl">
                      Share your skills with peers and build lifelong friendships
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <img src="/images/splash.png" width="800" />
                  </div>
                </div>
              </div>
              <div>
                {error && <Alert variant="danger">{error}</Alert>}
              </div>
              <div className="flex flex-col pt-[5%] px-[15%] space-y-12">
                <div className="text-5xl font-semibold font-header">
                  <div>
                    How it Works
                  </div>
                  <div className="text-center text-2xl font-body flex mt-10 gap-y-10 flex-col items-center justify-center">
                    <img src={money} width="35%"></img>
                    <div className="w-[75%]">
                      Earn money by sharing your skills with peers in your community
                    </div>
                    <img src={cooking} width="35%"></img>
                    <div className="w-[75%]">
                      Pick up a hobby and learn a new skill at an affordable price
                    </div>
                    <img src={friends} width="35%"></img>
                    <div className="w-[75%]">
                      Learn directly from like-minded peers in your community and foster new friendships
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-semibold font-header">
                    Testimonials
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <div>
                      <img src="/images/testimonial.png" width="800" />
                    </div>
                    <div className="font-light text-2xl pl-[5%] pr-[17%]">
                      Join your community in sharing skills while making new friends.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </>
  )
}

export default Landing;