const todoRoutes=require("./routes/todoRoutes");
require("dotenv").config();
const cors=require("cors");


const express =require("express");
const app =express();
const connectDb=require("./config/db")

connectDb();
app.use(express.json());
app.use(cors());
app.use("/api/todos",todoRoutes);


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);

})