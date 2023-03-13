import mongoose from "mongoose";

const { Schema } = mongoose;

const schemaPembelian = new Schema(
    {
        // _id: mongoose.Types.ObjectId(),
        tanggalPembelian: {
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
        barangMasuk: [
            {
                tanggalMasuk: {
                    type: Date,
                    default: Date.now,
                    required: true,
                },
                id_produk: {
                    type: Schema.Types.ObjectId,
                    ref: "Produk",
                    required: true,
                },
                jumlahMasuk: {
                    type: Number,
                    min: 1,
                    required: true,
                },
            },
        ],
        id_supplier: {
            type: Schema.Types.ObjectId,
            ref: "Supplier",
            required: true,
        },
    },
    {
        collection: "pembelian",
    }
);

schemaPembelian.index({ noNota: "text" });
const Pembelian = mongoose.model("Pembelian", schemaPembelian);
export default Pembelian;
