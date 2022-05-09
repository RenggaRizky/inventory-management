import mongoose from "mongoose";

const { Schema } = mongoose;

const schemaMerek = new Schema(
    {
        nama: {
            type: String,
            required: true,
        },
    },
    {
        collection: "merek",
    }
);

const Merek = mongoose.model("Merek", schemaMerek);
export default Merek;
