import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import authrouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.route.js";
import connectionRouter from "./routes/connection.route.js";
import http from 'http';
import { Server } from "socket.io";
import notificationRouter from "./routes/notification.route.js";
dotenv.config();
const app = express();
const server = http.createServer(app)

const allowedOrigins = ['http://localhost:5173', 'https://linked-in-clone-q8fk.vercel.app']

export const io = new Server(server,{
  cors:({
    origin: function (origin, callback) {
      if(!origin) return callback(null, true);
      if(!allowedOrigins.includes(origin)){
        var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
     return callback(null, true);
    },
    credentials: true
  })
})
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
      if(!origin) return callback(null, true);
      if(!allowedOrigins.includes(origin)){
        var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
     return callback(null, true);
    },
  credentials: true
}));


const port = process.env.PORT || 3000;

app.use("/api/auth", authrouter);
app.use('/api/user',userRouter)
app.use('/api/post',postRouter)
app.use('/api/connection',connectionRouter)
app.use('/api/notification',notificationRouter)

app.get("/", (req, res) => {
  res.send("Server is live");
});
export const userSocketMap = new Map()
io.on("connection",(socket)=>{
  // console.log('user connected',socket.id)
  socket.on('register',(userId)=>{
    socket.userId = userId;
    userSocketMap.set(userId,socket.id)
  })
  socket.on("disconnect",(reason)=>{
    if(socket.userId) userSocketMap.delete(socket.userId);
        // console.log('user disconnect',socket.id)
        console.log('reason',reason)
  })
})

await connectdb();
 
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


export default server;
