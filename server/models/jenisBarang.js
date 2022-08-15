import mongoose from "mongoose";

const { Schema } = mongoose;

const schemaJenisBarang = new Schema(
    {
        // _id: mongoose.Types.ObjectId(),
        nama: {
            type: String,
            required: true,
        },
    },
    {
        collection: "jenisbarang",
    }
);

schemaJenisBarang.index({ nama: "text" });
const JenisBarang = mongoose.model("JenisBarang", schemaJenisBarang);
export default JenisBarang;
