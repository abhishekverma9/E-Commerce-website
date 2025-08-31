import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{ type: String, required: true},
    email:{ type: String, required: true, unique: true},
    image:{type:String,default:""},
    password: {type: String,required: function () {
        return this.providers.includes("email")}
    },   
    providers:{ type: [String], enum: ["google", "email"], default: [] },
    cartData:{ type: Object, default: {}},
},{minimize: false})

const userModel = mongoose.models.user || mongoose.model("user",userSchema)

export default userModel