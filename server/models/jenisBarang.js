import mongoose from "mongoose";

const { Schema } = mongoose;

const schemaJenisBarang = new Schema({
    nama: {
        type: String,
        required: true,
    },
});

const JenisBarang = mongoose.model("JenisBarang", schemaJenisBarang);
export default JenisBarang;
