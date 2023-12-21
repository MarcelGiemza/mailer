import { useEffect, useState } from "react";
import Message from "../message/message.jsx";
import axios from "axios";
import "./messages.scss";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const naviagte = useNavigate();
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [popup, setPopup] = useState(false);

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

  const sendMessage = async (e) => {
    const form = e.target.parentNode;
    const recv = form[0].value;
    const title = form[1].value;
    const content = form[2].value;
    // TODO: check is valid

    const messageData = {receiver: recv, title: title, content: content}

    try {
      const response = await axios.post(`/api/messages/sendNew?token=${sessionStorage.getItem("token")}`, messageData)
      if (response.data.success === true) {
        setPopup(false)
        getSent()
      }
    } catch {

    }
  };

  const logout = () => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("email")
    naviagte("/")
  }

  const getAvilibleUsers = async () => {
    const response = await axios(`/api/emails?token=${sessionStorage.getItem("token")}`)
    console.log(response)
  }

  return (
    <div className="Messages">
      {popup && (
        <div className="popup-wrapper">
          <form className="Popup">
            <h2>Send Message</h2>
            <label htmlFor="reciever">Reciever</label>
            <input name="reciever" placeholder="example@email.com" type="email" id="reciever" />
            <label htmlFor="title">Title</label>
            <input name="title" placeholder="title" type="text" id="title" />
            <label htmlFor="content">Content</label>
            <input name="content" placeholder="content" type="text" id="content" />
            <button type="button" onClick={sendMessage}>Send</button>
            <button type="button" onClick={() => setPopup(false)}>Cancel</button>
          </form>
        </div>
      )}
      <div className="account">
        {`Logged in as: ${sessionStorage.getItem("email")}`}
        <button type="button" className="logout" onClick={logout}>Logout</button>

      </div>
      <div className="buttons">
        <button type="button" className="refresh" onClick={getReceived}>Refresh</button>
        <button type="button" className="new-message" onClick={() => {setPopup(true); getAvilibleUsers()}}>Send New</button>
      </div>
      <div className="messages-wrapper">
        <section className="recieved">
          <h1>Recieved</h1>
          <div className="messages-box">
            {receivedMessages.map((message) => (
              <Message message={message} sent="false" />
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
