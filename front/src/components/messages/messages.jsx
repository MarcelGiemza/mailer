import { useEffect, useState } from "react";
import Message from "../message/message.jsx";
import axios from "axios";
import "./messages.scss";
import { useNavigate } from "react-router-dom";
import Popup from "../popup/popup.jsx"

const Messages = () => {
  const naviagte = useNavigate();
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [popup, setPopup] = useState(false);
  const [msg, setMsg] = useState("");   

  const getReceived = async () => {
    const response = await axios.get(`/api/messages/received?token=${sessionStorage.getItem("token")}`);
    const data = response.data;

    if (data.success) {
      setReceivedMessages(data.messages);
    }
  };
  const getSent = async () => {
    const response = await axios.get(`/api/messages/sent?token=${sessionStorage.getItem("token")}`);
    const data = response.data;

    if (data.success) {
      setSentMessages(data.messages);
    }
  };

  useEffect(() => {
    getReceived();
    getSent();
  }, []);

  const logout = () => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("email")
    naviagte("/")
  }

  return (
    <div className="Messages">
      {popup && <Popup getSent={getSent} setPopup={setPopup} setMsg={setMsg}/>}
      {msg && <div className="msg">{msg}</div>}
      <div className="account">
        Logged in as: <b>{sessionStorage.getItem("email")}</b>
        <button type="button" className="logout cancel" onClick={logout}>Logout</button>
      </div>
      <div className="buttons">
        <button type="button" className="refresh" onClick={getReceived}>Refresh</button>
        <button type="button" className="new-message confirm" onClick={() => setPopup(true)}>Send New</button>
      </div>
      <div className="messages-wrapper">
        <section className="recieved">
          <h1>Recieved</h1>
          <div className="messages-box">
            {receivedMessages.map((message) => (
              <Message message={message} sent="false" getReceived={getReceived}/>
            ))}
          </div>
        </section>
        <section className="sent">
          <h1>Sent</h1>
          <div className="messages-box">
            {sentMessages.map((message) => (
              <Message message={message} sent="true" getSent={getSent} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
export default Messages;
