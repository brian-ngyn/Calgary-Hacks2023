import { firebaseAuth } from "../authentication/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import "../App.css";
import ChatBox from "../components/ChatBox";


function Message() {
  const [user] = useAuthState(firebaseAuth);

  return (
    <div className="App">
          <ChatBox />
    </div>
  );
}

export default Message;