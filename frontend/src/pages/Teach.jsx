import { useUserAuth } from "../authentication/UserAuthContext";
import { Avatar } from "@mui/material";

function Teach() {
  const { docSnap } = useUserAuth();
  return (
    <>
      <div className="min-h-screen px-[18%] py-[5%] bg-white font-Varela">
        <div className="flex flex-col">
          <div className="grid grid-cols-1">
            <div className="text-4xl text-semibold pb-[7%]">
              My Portfolios
            </div>
          </div>
          <div className="grid grid-cols-3 grid-rows-2">
            <div className="col-span-1 row-span-2">
              <Avatar src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2022%2F06%2F03%2Fdachshund-two-pups-in-lap-1298367873-2000.jpg" sx={{ width: 250, height: 250 }} />
            </div>
            <div className="flex items-center col-span-2 row-span-1 text-5xl font-semibold">
              <div>
                {docSnap.fname} {docSnap.lname}
              </div>
            </div>
            <div className="text-xl pt-[5%]">
              Fun fact about myself: "{docSnap.funFact}"
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Teach;