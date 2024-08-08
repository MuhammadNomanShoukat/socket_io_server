const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

// Enable CORS for all routes with more restrictive options
app.use(cors({
  origin: "*", // Change to match your frontend origin
  methods: ["GET", "POST"],
  allowedHeaders: ["my-custom-header"],
  credentials: false
}));

// Create the HTTP server
const httpServer = createServer(app);

// Configure Socket.io with CORS
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Ensure this matches the origin in Express CORS
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: false
  }
});

io.on("connection", (socket) => {
  console.log("Client connected!");

  socket.on("disconnect", () => {
    console.log("Client Disconnected!");
  });


  socket.on("client-greetings", (data)=>{
    console.log(data)
  })

  socket.emit("server-greetings", "yes i'm alive how may i help you")  

});

// Use environment variable for port
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
