import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../authentication/UserAuthContext";

function Login() {
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
  }, [docSnap, navigate])

  return (
    <>
      <div className="bg-white text-black min-h-screen">
        {
          !user && (
            <div className="bg-white text-black min-h-screen">
              <div className="flex flex-col justify-center items-center h-screen">
                <div className="">
                  Register
                </div>
                <div>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <GoogleButton type="light" onClick={handleGoogleSignIn} />
                </div>
              </div>
            </div>
          )}
      </div>
    </>
  )
}

export default Login;