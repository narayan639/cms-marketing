import mongoose from "mongoose";

export async function connect(){
    try {
      await mongoose.connect(process.env.MONGO_URL!)
        const connection=mongoose.connection

        connection.on('connected',()=>{
            console.log("MongoDD Connected!")
        })
        connection.on('error',(error)=>{
            console.log("MongoDB connection error!", error)
            process.exit()
        })
    } catch (error: any) {
        console.log("Something went wrong!")
        throw new Error(error)
    }
}