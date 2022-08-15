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

schemaMerek.index({ nama: "text" });
const Merek = mongoose.model("Merek", schemaMerek);
export default Merek;
