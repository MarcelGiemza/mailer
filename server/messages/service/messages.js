const Message = require("../../models/message");
const User = require("../../models/users");
const jwt = require("jsonwebtoken");

const getReceived = async (req, res) => {
  try {
    const token = req.query.token;
    const decoded = jwt.verify(token, "mailer123");

    const messages = await Message.find({ receiver: { $eq: decoded.email } });
    return res.status(200).json({ success: true, messages: messages });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

const getSent = async (req, res) => {
  try {
    const token = req.query.token;
    const decoded = jwt.verify(token, "mailer123");

    const messages = await Message.find({ sender: { $eq: decoded.email } });
    return res.status(200).json({ success: true, messages: messages });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

const addMessage = async (req, res) => {
  const messageData = req.body;

  try {
    const token = req.query.token;
    const decoded = jwt.verify(token, "mailer123");

    const sender = decoded.email;
    const userReciever = await User.findOne({ email: messageData.receiver });
    if (userReciever) {
      const newMessage = await Message.create({
        receiver: messageData.receiver,
        sender: sender,
        title: messageData.title,
        content: messageData.content,
      })
      newMessage.save()
      return res.status(200).json({ success: true });
    } else {
      return res.status(200).json({ success: false });
    }
  } catch(err) {
    console.log(err)
    return res.status(500).json({ success: false });
  }
};

const deleteMessage = async (req, res) => {
  const id = req.body.id;
  try {
    const token = req.query.token;
    const decoded = jwt.verify(token, "mailer123");
    await Message.deleteOne({ _id: id })
    return res.status(200).json({ success: true })
  } catch(err) {
    return res.status(500).json({ success: false })
  }
};

const readMessage = async (req, res) => {
  const id = req.body.id;
  try {
    const token = req.query.token;
    const decoded = jwt.verify(token, "mailer123");
    await Message.updateOne({ _id: id }, {read: true})
    return res.status(200).json({ success: true })
  } catch(err) {
    return res.status(500).json({ success: false })
  }
};

module.exports = {
  getReceived,
  getSent,
  addMessage,
  deleteMessage,
  readMessage,
};
