import mongoose from 'mongoose'



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dateAdded: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    }
})





const User = mongoose.model("users", UserSchema);

export default User