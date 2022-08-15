import mongoose from "mongoose";

const { Schema } = mongoose;

const schemaNotifikasi = new Schema(
    {
        // _id: mongoose.Types.ObjectId()
        pesan: String,
        status: String,
        tanggalPemberitahuan: {
            type: Date,
            default: Date.now,
        },
    },
    { collection: "notifikasi" }
);

const Notifikasi = mongoose.model("Notifikasi", schemaNotifikasi);
export default Notifikasi;
