// services/socketService.js

const User = require("../user/model");
const Message = require("./messageModel");
const Room = require("./roomModel");
const isChatUser = require("../../middlewares/isChatUser");
const WebSocket = require("ws");
const ObjectId = require("mongoose").Types.ObjectId;
const socketConnection = (wss) => {
  wss.on("connection", (ws, req) => {
    console.log("New client connected");

    // Use auth middleware to verify the token
    try {
      isChatUser(req, ws, async (user) => {
        ws.user = user;
        console.log(user);

        ws.on("message", async (message) => {
          const msgObj = JSON.parse(message);

          // Determine message type and process accordingly
          if (msgObj.type === "private") {
            await handlePrivateMessage(user, msgObj);
          } else if (msgObj.type === "group") {
            await handleGroupMessage(user, msgObj);
          }
        });

        ws.on("close", () => {
          console.log("Client disconnected");
        });
      });
    } catch (error) {
      console.error(error);
    }
  });

  // Handle private message
  const handlePrivateMessage = async (sender, msgObj) => {
    try {
      console.log(sender, msgObj);
      const { content, receiverId } = msgObj;

      const receiver = await User.findById(receiverId);
      if (!receiver) {
        console.error("Receiver not found");
        return;
      }

      const newMessage = new Message({
        sender: sender.user._id,
        content,
        type: "private",
        receivers: [receiver._id],
      });

      await newMessage.save();
      console.log();
      // Send message to receiver if connected
      wss.clients.forEach((client) => {
        console.log("clients", client.user.user._id);
        console.log("receiver id", receiver._id);
        if (
          client.readyState === WebSocket.OPEN &&
          client.user &&
          new ObjectId(client.user.user._id).equals(receiver._id)
        ) {
          client.send(JSON.stringify(newMessage));
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Handle group message
  const handleGroupMessage = async (sender, msgObj) => {
    try {
      const { content, roomId } = msgObj;

      const room = await Room.findById(roomId).populate("members");
      if (!room) {
        console.error("Room not found");
        return;
      }

      const newMessage = new Message({
        sender: sender._id,
        content,
        type: "group",
        room: room._id,
      });

      await newMessage.save();

      // Send message to all room members if connected
      room.members.forEach((member) => {
        wss.clients.forEach((client) => {
          if (
            client.readyState === WebSocket.OPEN &&
            client.user &&
            client.user._id.equals(member._id)
          ) {
            client.send(JSON.stringify(newMessage));
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  };
};
module.exports = socketConnection;
