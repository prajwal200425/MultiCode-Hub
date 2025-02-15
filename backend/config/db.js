const mongoose = require("mongoose");

const connectDB = async () => {
  

    await mongoose.connect("mongodb+srv://prajwalmajgaonkar90:svsMpBoFiPpMzWtK@cluster0.xhu9v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>console.log("MongoDB connected successfully "))
    .catch((e)=> console.log(e)) 

};

module.exports = connectDB;