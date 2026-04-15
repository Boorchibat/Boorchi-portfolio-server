const Message = require("../../schema/Message");
const User = require("../../schema/user");

const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ error: "Sender or receiver not found." });
    }

    const newMessage = new Message({
      sender: sender._id,
      receiver: receiver._id,
      message,
 
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Server error while sending message." });
  }
};

module.exports = { sendMessage };