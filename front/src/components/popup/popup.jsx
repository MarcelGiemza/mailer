import { useEffect, useState } from "react";
import axios from "axios";
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/scss/styles.scss";
import "./popup.scss"

const Popup = (props) => {
  const [avilibleEmails, setAvilibleEmails] = useState([]);

  const getAvilibleUsers = async () => {
    const response = await axios(`/api/emails?token=${sessionStorage.getItem("token")}`)
    if (response.data.success) {
      setAvilibleEmails(response.data.emails)
    };
  };

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
        props.setPopup(false)
        props.getSent()
      }
    } catch {

    }
  };

  useEffect(() => {
    getAvilibleUsers();
  }, [])
  return (
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
        <button type="button" className="cancel" onClick={() => props.setPopup(false)}>Cancel</button>
      </form>
    </div>
  )
};

export default Popup;
