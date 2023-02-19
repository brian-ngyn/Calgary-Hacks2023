import Chats from "../components/Chats";
import Sidebar from "../components/Sidebar";


function Message() {
  return (
    <>
      <div>
        <div className="bg-white text-black min-h-screen">
          <div className="flex flex-col justify-center items-center h-screen">
            <Sidebar />
            <Chats />
          </div>
        </div>
      </div>
    </>
  )
}

export default Message;