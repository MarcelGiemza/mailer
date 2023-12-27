import { useEffect, useState } from "react";
import Message from "../message/message.jsx";
import axios from "axios";
import "./messages.scss";
import { useNavigate } from "react-router-dom";
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/scss/styles.scss";

const Messages = () => {
  const naviagte = useNavigate();
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [popup, setPopup] = useState(false);
  const [avilibleEmails, setAvilibleEmails] = useState([]);

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
    getAvilibleUsers();
  }, []);

  const sendMessage = async (e) => {
    const form = e.target.parentNode;
    const recv = form[0].value;
    const title = form[2].value;
    const content = form[3].value;
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
    if (response.data.success) {
      setAvilibleEmails(response.data.emails)
    };
  }

  return (
    <div className="Messages">
      {popup && (
        <div className="popup-wrapper">
          <form className="Popup">
            <h2>Send Message</h2>
            <label htmlFor="reciever">Reciever</label>
            <DropdownList data={avilibleEmails} id="reciever" name="reciever" placeholder="email" />
            <label htmlFor="title">Title</label>
            <input name="title" placeholder="title" type="text" id="title" />
            <label htmlFor="content">Content</label>
            <input name="content" placeholder="content" type="text" id="content" />
            <button type="button" className="confirm" onClick={sendMessage}>Send</button>
            <button type="button" className="cancle" onClick={() => setPopup(false)}>Cancel</button>
          </form>
        </div>
      )}
      <div className="account">
        {`Logged in as: ${sessionStorage.getItem("email")}`}
        <button type="button" className="logout" onClick={logout}>Logout</button>
      </div>
      <div className="buttons">
        <button type="button" className="refresh" onClick={getReceived}>Refresh</button>
        <button type="button" className="new-message" onClick={() => setPopup(true)}>Send New</button>
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
