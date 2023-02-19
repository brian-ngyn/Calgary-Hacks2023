import { useLocation } from "react-router-dom";
import { Avatar, Button } from "@mui/material";

function Portfolio() {
  const location = useLocation();
  const data = location.state;

  const displayMedia = (url) => {
    console.log(url)
    if(url.includes(".mp4")){
      console.log("video");
      return (
      <div className="bg-gray-500 lg:col-span-2 col-span-4">
        <video width="100%" height="100%" controls>
          <source src={url} type="video/mp4"></source>
          Your browser does not support the video tag.
        </video>
      </div>
      )
    }
    console.log("image")
    return (
      <div className="bg-gray-500 lg:col-span-2 col-span-4">
        <img src={url} className="object-cover" width="100%" height="100%"></img>
      </div>
    )
    
  }

  return (
    <>
			<div className="min-h-screen px-[18%] py-[5%] bg-white font-body">
        <div className="flex flex-col">
          <div className="grid grid-cols-3 grid-rows-2">
            <div className="col-span-1 row-span-2">
              <Avatar src={data.photoUrl} sx={{ width: 250, height: 250 }}/>
            </div>
            <div className="flex items-center col-span-2 row-span-1 text-5xl font-header">
              <div>
                {data.fName} {data.lName}
              </div>
            </div>
            <div className="col-span-1 row-span-1 text-2xl font-semibold">
              <button onClick={() => {console.log("button clicked")}} className="bg-red text-white font-semibold py-3 px-10 rounded">
                Connect
              </button>
            </div>
          </div>
          <div>
            <div className="text-xl pt-[5%]">
              {data.funFact}
            </div>
          </div>
          <div className="text-3xl font-header pt-[5%]">
            Portfolio
          </div>
          <div className="grid grid-cols-4 gap-5 px-[1%] pt-5">
            {data.portfolio[0].media.map((med) => displayMedia(med))}
          </div>
        </div>
			</div>
    </>
  )
}

export default Portfolio;