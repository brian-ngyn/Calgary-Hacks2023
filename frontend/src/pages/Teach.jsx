import { useUserAuth } from "../authentication/UserAuthContext";
import { Avatar, IconButton, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { TextField } from "@mui/material";
import Select from '@mui/material/Select';
import { borderRadius } from "@mui/system";
import { storage } from "../authentication/firebaseConfig.js"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

function Teach() {
  const { docSnap } = useUserAuth();
  const [open, setOpen] = useState(false);
  const [skillList, setSkillList] = useState([]);
  const [skill, setSkill] = useState("");
  const [description, setDescription] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [media, setMedia] = useState([]);
  const [mediaURLs, setMediaURLs] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setDescription("");
    setHourlyRate("");
    setHourlyRate("");
    setSkill("");
    setMedia([]);
    setMediaURLs([]);
    setOpen(false);
  };

  const handleChange = (event) => {
    console.log("change")
    console.log(event);
    if (event.target.name === "skill") {
      console.log(event.target.value);
      setSkill(event.target.value);
    }
    if (event.target.name === "description") {
      console.log(event.target.value);
      setDescription(event.target.value);
    }
    if (event.target.name === "hourlyRate") {
      console.log(event.target.value);
      setHourlyRate(event.target.value);
    }
  }

  const submit = () => {
    const data = {
      skill: skill,
      description: description,
      hourlyRate: hourlyRate,
      media: mediaURLs,
      udid: docSnap.id
    }
    setDescription("");
    setHourlyRate("");
    setHourlyRate("");
    setSkill("");
    setMedia([]);
    setMediaURLs([]);
    setOpen(false);
    // axios.get("https://jos6ylumd75az7s4a5ajqyaqoi0iafmd.lambda-url.us-west-2.on.aws/createPortfolio", {
    //   params: {
    //     skill: skill,
    //     description: description,
    //     hourlyRate: hourlyRate,
    //     media: mediaURLs,
    //     udid: docSnap.id
    //   }
    // }).then((res) => {
    //   console.log("res", res);
    // })
    axios.put("http://localhost:3001/createPortfolio", data).then((res) => {
      console.log("res", res);
    });
    // const request = {
    //   data: data,
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json',
    //   },
    // }
    // axios.put("https://jos6ylumd75az7s4a5ajqyaqoi0iafmd.lambda-url.us-west-2.on.aws/createPortfolio", request).then((res) => {
    //   console.log("res", res);
    // });
    console.log(data);
  }

  useEffect(() => {
    axios.get("https://jos6ylumd75az7s4a5ajqyaqoi0iafmd.lambda-url.us-west-2.on.aws/skills").then((res) => {
      setSkillList(res.data);
      console.log("skillList", res.data);
    })
  }, []);

  const handleFileUpload = (event) => {
    if (!event.target.files) {
      return;
    }
    const files = event.target.files;
    console.log("files", files)
    for (const file of files) {
      console.log(file);
      setMedia(media => [...media, file]);
      const storageRef = ref(storage, `/profilephotos/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // update progress
          console.log("percent", percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log("url", url);
            setMediaURLs(mediaURLs => [...mediaURLs, url]);
          });
        }
      );
    };
  }

  return (
    <>
      <div className="min-h-screen px-[18%] py-[5%] bg-white">
        <div className="flex flex-col space-y-10">
          <div className="grid grid-cols-3 grid-rows-2">
            <div className="col-span-1 row-span-2">
              <Avatar src={docSnap.photoUrl} sx={{ width: 250, height: 250 }} />
            </div>
            <div className="flex flex-col pt-10 col-span-2 row-span-2 text-4xl">
              <h2 className="mb-5 w-full font-header">Welcome Back, {docSnap.fName}</h2>
              <p className="font-body font-thin text-2xl w-11/12">
                Want to teach a skill? Create a portfolio to showcase your background and
                connect with peers in your community who would like to learn from you!
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="col-span-3 text-5xl pt-[4%]">
              Portfolios
            </div>
            <div className="pt-5">
              <IconButton onClick={handleClickOpen} style={{ backgroundColor: 'transparent' }}>
                <img src="/images/addportfolio.svg" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div>
            <div className="flex flex-col font-Varela gap-y-5">
              <div className="text-3xl font font-semibold">
                Create a new portfolio
              </div>
              <InputLabel htmlFor="Skill">Select a skill</InputLabel>
              <Select
                value={skill}
                id="Skill"
                label=""
                name="skill"
                onChange={(e) => handleChange(e)}
                displayEmpty
              >
                {skillList.map((s) =>
                  <MenuItem value={s.name}>{s.name}</MenuItem>
                )}
              </Select>
              <div className="grid grid-cols-2 gap-5">
                <div className="text-xl col-span-3">
                  <InputLabel htmlFor="outlined-adornment-desc">Description</InputLabel>
                  <OutlinedInput
                    value={description}
                    onChange={(e) => { handleChange(e) }}
                    fullWidth
                    name="description"
                    id="outlined-adornment-desc"
                  />
                </div>
                <div className="text-xl col-span-3">
                  <InputLabel htmlFor="outlined-adornment-amount">Hourly Rate</InputLabel>
                  <OutlinedInput
                    value={hourlyRate}
                    onChange={(e) => { handleChange(e) }}
                    name="hourlyRate"
                    fullWidth
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  />
                </div>
                <div className="text-xl col-span-3">
                  <Button
                    component="label"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => handleFileUpload(e)}
                  >
                    Upload Media
                    <input multiple type="file" accept=".png, .jpg, .jpeg, .mp4" hidden />
                  </Button>
                </div>
                <div className="flex text-sm flex-col">
                  {media.map((m) =>
                    <div>
                      Media: {m.name}
                    </div>
                  )}
                </div>
                <div className="text-md justify-center w-[100%] col-span-3">
                  <Button
                    variant="contained"
                    onClick={submit}
                    fullWidth
                    sx={{ color: "#ffffff", borderRadius: "0px", backgroundColor: "#BE2A2C", boxShadow: "none", "&:hover": { color: "#ffffff", borderRadius: "0px", backgroundColor: "#BE2A2C", boxShadow: "none" } }}
                    disabled={description === "" || hourlyRate === ""}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Teach;