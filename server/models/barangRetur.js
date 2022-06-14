import mongoose from "mongoose";

const { Schema } = mongoose;

const schemaBarangRetur = new Schema(
    {
        jumlah: {
            type: Number,
            required: true,
        },
        tanggalPengembalian: {
            type: Date,
            default: new Date(),
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        alasan: {
            type: String,
            required: true,
        },
        catatan: String,
        id_produk: {
            type: Schema.Types.ObjectId,
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
        collection: "barangretur",
    }
);

const BarangRetur = mongoose.model("BarangRetur", schemaBarangRetur);
export default BarangRetur;
