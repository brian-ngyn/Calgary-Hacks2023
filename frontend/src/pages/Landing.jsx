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

const steps = ["Step 1", "Step 2", "Step 3"];
const message = ["Step 1 Message", "Step 2 Message", "Step 3 Message"];

function Landing() {
  const [error, setError] = useState("");
  const { user, docSnap, googleSignIn, makeUserDB, getUserDB } = useUserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
    } catch (error) {
      setError(error.message);
    }
  };

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
      <div className="bg-white text-black min-h-screen">
        {
          !user && (
            <div className="bg-white text-black min-h-screen">
              <div className="flex flex-col pt-[10%] items-center space-y-5">
                <div className="text-7xl font-semibold">
                  UpSkill
                </div>
                <div className="text-lg">
                  "Punchline"
                </div>
                <div>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <GoogleButton type="light" onClick={handleGoogleSignIn} />
                </div>
              </div>
              <div className="flex flex-col pt-[15%] px-[15%] space-y-16">
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
                    <div className="mx-10 mt-20">
                      <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                          {message[activeStep]}
                        </Typography>
                      </React.Fragment>
                    </div>
                  </div>
                </div>
                <div className="text-5xl font-semibold">
                  Testimonials
                </div>
                <div className="text-5xl font-semibold">
                  Get Started
                </div>
              </div>
            </div>
          )}
      </div>
    </>
  )
}

export default Landing;