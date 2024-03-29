import mongoose from "mongoose";

const { Schema } = mongoose;

const schemaPenjualan = new Schema(
    {
        // _id: mongoose.Types.ObjectId(),
        tanggalPenjualan: {
            type: Date,
            default: Date.now,
            required: true,
        },
        noNota: {
            type: String,
            required: true,
        },
        totalHarga: {
            type: Number,
            required: true,
        },
        barangKeluar: [
            {
                tanggalKeluar: {
                    type: Date,
                    default: Date.now,
                    required: true,
                },
                id_produk: {
                    type: Schema.Types.ObjectId,
                    ref: "Produk",
                    required: true,
                },
                jumlahKeluar: {
                    type: Number,
                    min: 1,
                    required: true,
                },
            },
        ],
    },
    {
        collection: "penjualan",
    }
);

schemaPenjualan.index({ noNota: "text" });
const Penjualan = mongoose.model("Penjualan", schemaPenjualan);
export default Penjualan;
