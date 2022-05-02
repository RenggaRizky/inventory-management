import mongoose from "mongoose";
import Merek from "./merek.js";

const { Schema } = mongoose;

const schemaJenisBarang = new Schema({
    _id: Schema.Types.ObjectId,
    nama: String,
    merek: {
        type: Schema.Types.ObjectId,
        ref: "MerekBarang",
    },
    ukuran: String,
});

const JenisBarang = mongoose.model("JenisBarang", schemaJenisBarang);
export default JenisBarang;
