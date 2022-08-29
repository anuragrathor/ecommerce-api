const express = require("express");
const app = express();

const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();


const mongoose = require("mongoose");

const userRoute = require("./routes/user");   
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");


mongoose.connect(
    process.env.MONGO_URL
    ).then(()=> console.log("DB Connection Succesful"))
    .catch((err) => {
        console.log(err);
    });

app.use(cors());            //Useful for cross side request from angular and anywhere it allow
app.use(express.json()); 


app.use("/api/users", userRoute);    
app.use("/api/auth", authRoute);    
app.use("/api/product", productRoute);    

    

app.listen(process.env.PORT || 5000 , ()=>{
    console.log("Backend server is running");
});