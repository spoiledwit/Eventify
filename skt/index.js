const app = require("express");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  const found = users.find((user) => user.userId === userId);
  return found;
};

io.on("connection", (Socket) => {
  //when connected
  Socket.on("addUser", (userId) => {
    console.log("user connected");
    addUser(userId, Socket.id);
    io.emit("getUsers", users);
  });

  Socket.on("removeUser", (userId) => {
    console.log("user removed");
    removeUser(userId);
    io.emit("getUsers", users);
  });

  //Send Wishlist notification
  Socket.on("sendWishlist", ({ senderId, receiverId }) => {
    console.log("wishlist sending");
    let receiver = getUser(receiverId);
    if (!receiver) {
      return;
    }
    // send a notification to the receiver
    io.to(receiver.socketId).emit("getNotification", {
      type: "wishlist",
    });
    console.log("wishlist sent");
  });

  //Send and get message
  Socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    
    const body = JSON.stringify({
      message,
      recipientId: receiverId,
    })
    console.log(body)
    
    fetch("http://localhost:4000/notification", {
      method: "POST",
      body,
    })
      .then((res) => {
        console.log('mongodb: ', res);

        let receiver = getUser(receiverId);
        if (!receiver) {
          return;
        }
        // send a notification to the 
        receiver
        io.to(receiver.socketId).emit("getNotification");

        // send message to receiver
        io.to(receiver.socketId).emit("getMessage", {
          senderId,
          text,
        });
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  });

  //When disconnected

  Socket.on("disconnect", () => {
    console.log("user disconnected");
    removeUser(Socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log(5000);
});
