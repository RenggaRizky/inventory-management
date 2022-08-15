import mongoose from "mongoose";

const { Schema } = mongoose;

const schemaRak = new Schema(
    {
        // _id: mongoose.Types.ObjectId(),
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
        susun: [
            {
                nama: String,
                kapasitas: mongoose.Types.Decimal128,
                terpakai: mongoose.Types.Decimal128,
                status: Number,
            },
        ],
    },
    {
        collection: "rak",
    }
);

schemaRak.index({ nama: "text" });
const Rak = mongoose.model("Rak", schemaRak);
export default Rak;
