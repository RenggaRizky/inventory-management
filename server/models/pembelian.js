import mongoose from "mongoose";

const { Schema } = mongoose;

const schemaPembelian = new Schema(
    {
        tanggalPembelian: {
            type: Date,
            default: Date.now(),
            required: true,
        },
        noNota: {
            type: String,
            default: `NOTA#${mongoose.Types.ObjectId()}`,
            required: true,
        },
        jumlahBarang: {
            type: [Number],
            required: true,
        },
        jumlahHarga: {
            type: [Number],
            required: true,
        },
        totalHarga: {
            type: Number,
            required: true,
        },
        id_produk: {
            type: [Schema.Types.ObjectId],
            ref: "Produk",
            required: true,
        },
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

const Pembelian = mongoose.model("Pembelian", schemaPembelian);
export default Pembelian;
