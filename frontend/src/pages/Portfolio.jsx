import { useLocation } from "react-router-dom";
import { Avatar, Button } from "@mui/material";

function Portfolio() {
  const location = useLocation();
  const data = location.state;
  console.log(data);

  return (
    <>
			<div className="min-h-screen px-[18%] py-[5%] bg-white font-Varela">
        <div className="flex flex-col">
          <div className="grid grid-cols-3 grid-rows-2">
            <div className="col-span-1 row-span-2">
              <Avatar src={data.imageUrl} sx={{ width: 250, height: 250 }}/>
            </div>
            <div className="flex items-center col-span-2 row-span-1 text-5xl font-semibold">
              <div>
                {data.firstName} {data.lastName}
              </div>
            </div>
            <div className="col-span-1 row-span-1 text-2xl font-semibold">
              <button onClick={() => {console.log("button clicked")}}class="bg-red text-white font-semibold py-3 px-10 rounded">
                Connect
              </button>
            </div>
          </div>
          <div>
            <div className="text-xl pt-[5%]">
              {data.description}
            </div>
          </div>
          <div className="text-3xl font-semibold pt-[5%]">
            Portfolio
          </div>
          <div className="grid grid-cols-3 grid-rows-3 gap-5 min-h-[36rem] px-[1%] pt-5">
            <div className="bg-gray-500 col-span-1 row-span-1 min-h">
              Test1
            </div>
            <div className="bg-gray-500 col-span-1 row-span-2">
              Test2
            </div>
            <div className="bg-gray-500">
              Test3
            </div>
            <div className="bg-gray-500 col-span-1 row-span-2">
              Test4
            </div>
            <div className="bg-gray-500">
              Test5
            </div>
            <div className="bg-gray-500 col-span-2 row-span-1">
              Test6
            </div>
          </div>
        </div>
			</div>
    </>
  )
}

export default Portfolio;