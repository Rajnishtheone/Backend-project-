import mongoose from "mongoose"

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI, {
           
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit the process with failure
    }
}


export default connectDB;


// This code connects to a MongoDB database using Mongoose.
// It exports a function `connectDB` that attempts to connect to the database using the URI specified in the environment variable `MONGO_URI`.
// If the connection is successful, it logs a success message; if it fails, it logs the error and exits the process with a failure status.      
