import mongoose from "mongoose";

const { Schema } = mongoose;

const schemaSatuanBarang = new Schema(
    {
        nama: {
            type: String,
            required: true,
        },
    },
    {
        collection: "satuanbarang",
    }
);

const SatuanBarang = mongoose.model("SatuanBarang", schemaSatuanBarang);
export default SatuanBarang;
