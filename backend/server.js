require("dotenv").config();
const express = require("express");
const app = express();
const connectToDB = require("./db/db");
const userRouter = require("./routes/userRouter");
const noteRouter = require("./routes/notesRouter");
const cookieParser = require("cookie-parser");
const path = require("path");

connectToDB();

app.use(express.json()); // TO ACCEPT JSON REQUEST ON SERVER
app.use(cookieParser());

const cors = require("cors");
app.use(cors());

// EXPRESS ROUTING
app.use("/users", userRouter);

// defining notes routes for performing crud operations
app.use("/api/notes", noteRouter);

app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
});

// PORT LISTNER
const PORT = process.env.PORT;
app.use(
  (PORT,
  (req, res) => {
    res.send("Server is running on port: " + PORT);
  })
);
