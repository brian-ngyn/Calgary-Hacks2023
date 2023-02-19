import * as React from "react";
import dayjs from 'dayjs';
import { TextField, FormControl } from "@mui/material";
import { useUserAuth } from "../authentication/UserAuthContext";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import {storage} from "../authentication/firebaseConfig.js"
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"

function Register() {
  const { user, updateDB } = useUserAuth();
  const navigate = useNavigate();
  const interestSelections = [
    'Interest A',
    'Interest B',
    'Interest C',
    'Interest D',
    'Interest E',
    'Interest F',
    'Interest G',
  ]

  const [year, setYear] = useState("1");
  const [major, setMajor] = useState("");
  const [birthday, setBirthday] = React.useState(dayjs());
  const [funFact, setFunFact] = useState("");
  const [interests, setInterests] = useState([]);
  const [photo, setPhoto] = useState("");
  const [photoUrl, setPhotoUrl] = useState("https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg");
  const [portfolio, setPortfolio] = useState([]);

  const submitRegistration = () => {
    updateDB({
      new_sign_up: false,
      id: user.uid,
      fName: user.displayName.split(" ")[0],
      lName: user.displayName.split(" ")[1],
      email: user.email,
      year: year,
      major: major,
      birthday: dayjs(birthday).format('MM/DD/YYYY'),
      funFact: funFact,
      interests: interests,
      photoUrl: photoUrl,
      portfolio: portfolio
    }).then(() => {
      navigate("/home");
    });
  };

  const handleFileUpload = (event) => {
    if (!event.target.files){
      return;
    }
    const file = event.target.files[0];
    console.log(file);
    setPhoto(event.target.files[0]);
    const storageRef = ref(storage, `/profilephotos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
              "state_changed",
              (snapshot) => {
                  const percent = Math.round(
                      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                  // update progress
                  console.log("percent",percent);
              },
              (err) => console.log(err),
              () => {
                  // download url
                  getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                      console.log("url",url);
                      setPhotoUrl(url);
                  });
              }
          ); 
  }

  const handleInterestChange = (event) => {
    const {
      target: { value },
    } = event;
    setInterests(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  function getStyles(name, interestName, theme) {
    return {
      fontWeight:
        interestName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const theme = useTheme();

  return (
    <>
      <div>
        <div className="bg-white text-black min-h-screen">
          <div className="flex flex-col justify-center items-center h-screen">
            <div className="bg-white grid grid-cols-1 p-[2%] border gap-y-10 relative">
              <div className="bg-red absolute top-0 min-w-full border-2 border-red" />
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
                    id="outlined"
                    label="Year"
                    value={year}
                    style={{ width: 250 }}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
                <div className="col-span-1">
                  <TextField
                    required
                    id="outlined"
                    label="Major"
                    value={major}
                    style={{ width: 250 }}
                    onChange={(e) => setMajor(e.target.value)}
                  />
                </div>
                <div className="col-span-1">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disableFuture
                      label="Birthday"
                      openTo="year"
                      views={['year', 'month', 'day']}
                      value={birthday}
                      onChange={(newValue) => {
                        setBirthday(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
                <div className="col-span-1">
                  <FormControl>
                    <InputLabel id="demo-multiple-name-label">Interests</InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={interests}
                      onChange={handleInterestChange}
                      input={<OutlinedInput label="Name" />}
                      style={{ width: 250 }}
                    >
                      {interestSelections.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, interests, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-span-1">
                  <TextField
                    required
                    id="outlined"
                    label="Fun fact about yourself"
                    value={funFact}
                    style={{ width: 250 }}
                    onChange={(e) => setFunFact(e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Button
                    component="label"
                    variant="outlined"
                    onChange={(e)=>handleFileUpload(e)}
                  >
                    Upload Profile Photo
                    <input type="file" accept=".png, .jpg, .jpeg" hidden />
                  </Button>
                </div>
                {photo ? <div className="col-span-1">
                    Photo: {photo.name}
                </div> : null}
                <div className="flex justify-center col-span-2">
                  {major != "" && funFact != "" ? (
                    <Button
                      variant="contained"
                      onClick={submitRegistration}
                      style={{ backgroundColor: "#BE2A2C", color: "#FFFFFF" }}
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