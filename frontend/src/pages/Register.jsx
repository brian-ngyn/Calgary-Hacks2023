import { TextField } from "@mui/material";
import { useUserAuth } from "../authentication/UserAuthContext";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Register() {
  const { user, updateDB } = useUserAuth();
  const navigate = useNavigate();
  const selections = [
    {
      label: "selectionA",
      value: "Selection A"
    },
    {
      label: "selectionB",
      value: "Selection B"
    },
    {
      label: "selectionC",
      value: "Selection C"
    },
    {
      label: "selectionD",
      value: "Selection D"
    },
  ]

  const [selectionfield, setSelectionField] = useState("Selection A");
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");

  const submitRegistration = () => {
    updateDB({
      new_sign_up: false,
      selectionfield: selectionfield,
      field1: field1,
      field2: field2,
    }).then(() => {
      navigate("/home");
    });
  };

  return (
    <>
      <div>
        <div className="bg-white text-black min-h-screen">
          <div className="flex flex-col justify-center items-center h-screen">
            <div className="bg-white grid grid-cols-1 p-[2%] border gap-y-10 relative">
              <div className="bg-yellow-300 absolute top-0 min-w-full border-2 border-yellow-300" />
              <div className="text-xl col-span-1 place-self-center">
                Finish Your Signup
              </div>
              <div className="grid grid-cols-2 gap-x-5 gap-y-8 place-content-center">
                <div className="col-span-1">
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="First Name"
                    defaultValue={user.displayName.split(" ")[0]}
                    style={{ width: 250 }}
                  />
                </div>
                <div className="col-span-1">
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Last Name"
                    defaultValue={user.displayName.split(" ")[1]}
                    style={{ width: 250 }}
                  />
                </div>
                <div className="col-span-1">
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Email"
                    defaultValue={user.email}
                    style={{ width: 250 }}
                  />
                </div>
                <div className="col-span-1">
                  <TextField
                    required
                    id="outlined-select"
                    select
                    label="Select"
                    value={selectionfield} onChange={(e) => setSelectionField(e.target.value)}
                    defaultValue="Selection A"
                    style={{ width: 250 }}
                  >
                    {selections.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="col-span-1">
                  <TextField
                    required
                    id="outlined"
                    label="Field 1"
                    value={field1}
                    style={{ width: 250 }}
                    onChange={(e) => setField1(e.target.value)}
                  />
                </div>
                <div className="col-span-1">
                  <TextField
                    required
                    id="outlined"
                    label="Field 2"
                    value={field2}
                    style={{ width: 250 }}
                    onChange={(e) => setField2(e.target.value)}
                  />
                </div>
                <div className="flex justify-center col-span-2">
                  {field1 != "" && field2 != "" ? (
                    <Button
                      variant="contained"
                      onClick={submitRegistration}
                      style={{ backgroundColor: "#FDE047", color: "#000000" }}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      disabled
                      variant="contained"
                      onClick={submitRegistration}
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Register;