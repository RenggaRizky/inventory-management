import mongoose from "mongoose";

const { Schema } = mongoose;

const schemaRak = new Schema(
    {
        nama: {
            type: String,
            required: true,
        },
        lokasi: {
            type: String,
            required: true,
        },
        dimensiSusun: {
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
        susun1: {
            kapasitas: mongoose.Types.Decimal128,
            terpakai: mongoose.Types.Decimal128,
            status: Number,
        },
        susun2: {
            kapasitas: mongoose.Types.Decimal128,
            terpakai: mongoose.Types.Decimal128,
            status: Number,
        },
        susun3: {
            kapasitas: mongoose.Types.Decimal128,
            terpakai: mongoose.Types.Decimal128,
            status: Number,
        },
        susun4: {
            kapasitas: mongoose.Types.Decimal128,
            terpakai: mongoose.Types.Decimal128,
            status: Number,
        },
    },
    {
        collection: "rak",
    }
);

const Rak = mongoose.model("Rak", schemaRak);
export default Rak;
