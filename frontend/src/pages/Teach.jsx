import { useUserAuth } from "../authentication/UserAuthContext";
import { Avatar, IconButton, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { TextField } from "@mui/material";

function Teach() {
  const { docSnap } = useUserAuth();
  const [open, setOpen] = useState(false);
  const [skillList, setSkillList] = useState([]);
  const [description, setDescription] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get("https://jos6ylumd75az7s4a5ajqyaqoi0iafmd.lambda-url.us-west-2.on.aws/skills").then((res) => {
      setSkillList(res.data);
      console.log(res.data);
    })
  }, []);

  return (
    <>
      <div className="min-h-screen px-[18%] py-[5%] bg-white font-Varela">
        <div className="flex flex-col space-y-16">
          <div className="grid grid-cols-1">
            <div className="text-5xl text-bold pb-[5%]">
              My Portfolios
            </div>
          </div>
          <div className="grid grid-cols-3 grid-rows-2">
            <div className="col-span-1 row-span-2">
              <Avatar src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2022%2F06%2F03%2Fdachshund-two-pups-in-lap-1298367873-2000.jpg" sx={{ width: 250, height: 250 }} />
            </div>
            <div className="flex flex-col pt-10 col-span-1 row-span-2 text-4xl font-semibold">
              <div>
                {docSnap.fname} {docSnap.lname}
              </div>
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
              <div className="grid grid-cols-2 gap-5">
                <div className="text-xl col-span-3">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                    Description
                  </label>
                  <textarea rows="10" class="font-thin border w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="Description"></textarea>
                </div>
                <div className="text-xl col-span-3">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="hourly-rate">
                    Hourly Rate
                  </label>
                  <input class="border w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="hourly-rate" type="number" placeholder="Hourly Rate"></input>
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