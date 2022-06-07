import mongoose from "mongoose";

const { Schema } = mongoose;

const schemaTempatPenyimpanan = new Schema(
    {
        nama: {
            type: String,
            required: true,
        },
        lokasi: {
            type: String,
            required: true,
        },
        jenis: {
            type: String,
            required: true,
        },
        jumlahSusun: {
            type: Number,
            required: true,
        },
        dimensi: {
            panjang: {
                type: mongoose.Types.Decimal128,
                required: true,
            },
            lebar: {
                type: mongoose.Types.Decimal128,
                required: true,
            },
            tinggi: {
                type: mongoose.Types.Decimal128,
                required: true,
            },
        },
        kapasitas: {
            type: mongoose.Types.Decimal128,
            required: true,
        },
    },
    {
        collection: "tempatpenyimpanan",
    }
);

const TempatPenyimpanan = mongoose.model("TempatPenyimpananan", schemaTempatPenyimpanan);
export default TempatPenyimpanan;
