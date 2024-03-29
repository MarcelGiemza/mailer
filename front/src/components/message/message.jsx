import axios from "axios";
import "./message.scss"

const Message = (props) => {
  const message = props.message;
  const sent = JSON.parse(props.sent);
  const getSent = props.getSent;
  const getReceived = props.getReceived;
  const deleteMessage = async () => {
    try {
      const response = await axios.post(`/api/messages/delete?token=${sessionStorage.getItem("token")}`, {id: message._id});
      if (response.data.success) {
        getSent();
      }
    } catch {}
  };
  const readMessage = async () => {
    try {
      const response = await axios.post(`/api/messages/read?token=${sessionStorage.getItem("token")}`, {id: message._id});
      if (response.data.success) {
        getReceived();
      }
    } catch {}
  };
  const date = new Date(message.time)

  return (
  <div className="message">
    <div className="email">{sent ? `To: ${message.receiver}` : `From: ${message.sender}`}</div>
    <div className="title">{message.title}</div>
    <div className="content">{message.content}</div>
    <div className="time">{`${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`} of ${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}`}</div>
    {sent ? (
      <>
        <span className="read">Read: {`${message.read ? "Yes" : "No"}`}</span>
        <button className="delete cancel" type="button" onClick={deleteMessage}>Delete</button>
      </>
    ): (<button className="read" type="button" onClick={readMessage}>Read: {`${message.read ? "Yes" : "No"}`}</button>)}
  </div>
  )
};
export default Message;
