import mongoose from "mongoose";

const { Schema } = mongoose;

const schemaUser = new Schema(
    {
        // _id: mongoose.Types.ObjectId(),
        nama: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        peran: {
            type: String,
            required: true,
        },
    },
    {
        collection: "user",
    }
);

const User = mongoose.model("User", schemaUser);
export default User;
