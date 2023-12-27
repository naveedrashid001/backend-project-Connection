const express=require("express");
const userRouter=require("./Routes/userssRoutes")
const courseRoutes=require('./Routes/coursesRoutes')
const lectureRoutes=require('./Routes/lecturesRouter')
const playlistRouter=require('./Routes/playlistRouts')
port=4000;
const app= express();

app.use(express.urlencoded({
    extended:true,
}));
app.use(express.json())

  /////////  products all api's are conected
app.use("/api",userRouter);
app.use("/api",courseRoutes);
app.use("/api",lectureRoutes); 
app.use("/api",playlistRouter);

app.listen(port,()=>console.log(`port number is: ${port}`));