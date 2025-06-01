import app from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path:"./.env"
})


const PORT = process.env.PORT||8000;
connectDB()
         .then(()=>{
            app.listen(PORT,()=> console.log(`server is running on the port: ${PORT}`));
         })
             
         .catch((err)=>{
                console.error("Database connection error:", err);
                process.exit(1); // Exit the process with failure
         })


