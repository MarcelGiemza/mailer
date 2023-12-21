import axios from "axios";

const Message = (props) => {
  const message = props.message;
  const sent = JSON.parse(props.sent);
  const getSent = props.getSent;
  const deleteMessage = async () => {
    try {
      const response = await axios.post(`/api/messages/delete?token=${sessionStorage.getItem("token")}`, {id: message._id});
      if (response.data.success) {
        getSent();
      }
    } catch {}
  };
  const date = new Date(message.time)

  return (
  <div className="message">
    <div className="email">{sent ? `To: ${message.receiver}` : `From: ${message.sender}`}</div>
    <div className="title">{message.title}</div>
    <div className="content">{message.content}</div>
    <div className="content">{`${date.getHours()}:${date.getMinutes()} of ${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}`}</div>
    <button className="read" type="button">Read: {`${message.read}`}</button>
    {sent ? (
      <button className="delete" type="button" onClick={deleteMessage}>Delete</button>
    ): ""}
  </div>
  )
};
export default Message;
