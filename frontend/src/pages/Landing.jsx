import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../authentication/UserAuthContext";

import * as React from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
      <div className="bg-white text-black font-Varela min-h-screen">
        {
          !user && (
            <div className="bg-white text-black min-h-screen">
              <div className="grid grid-cols-2 pt-[2%] items-center space-y-10 pr-[15%] pl-[10%]">
                <div className="flex flex-col items-end justify-center font-semibold space-y-10">
                  <div className="space-y-5 p-[20%]">
                    <div className="text-5xl">
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
                <div className="text-5xl font-semibold">
                  <div>
                    How it Works
                  </div>
                  <div className="pt-[5%]">
                    <Stepper alternativeLabel nonLinear activeStep={activeStep} sx={{ iconColor: "#BE2A2C" }}>
                      {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                          <StepButton color="inherit" onClick={handleStep(index)}>
                            {label}
                          </StepButton>
                        </Step>
                      ))}
                    </Stepper>
                    <div className="mx-10 mt-16">
                      <React.Fragment>
                        <div className="flex justify-center font-light text-xl pl-[10%] pr-[10%] min-h-[6rem]">
                          {message[activeStep]}
                        </div>
                      </React.Fragment>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-semibold">
                    Testimonials
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <div>
                      <img src="/images/testimonial.png" width="800" />
                    </div>
                    <div className="font-light text-2xl pl-[5%] pr-[17%]">
                      Join your community in teaching and learning new skills while making new friends.
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