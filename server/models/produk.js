import mongoose from "mongoose";

const { Schema } = mongoose;

const schemaProduk = new Schema(
    {
        // _id: mongoose.Types.ObjectId(),
        nama: {
            type: String,
            required: true,
        },
        gambar: String,
        deskripsi: String,
        harga: {
            type: Number,
            required: true,
        },
        volume: {
            type: mongoose.Types.Decimal128,
            required: true,
        },
        id_jenisbarang: {
            type: Schema.Types.ObjectId,
            ref: "JenisBarang",
            required: true,
        },
        id_merek: {
            type: Schema.Types.ObjectId,
            ref: "Merek",
            required: true,
        },
        id_rak: {
            type: Schema.Types.ObjectId,
            ref: "Rak",
            required: true,
        },
        dimensiProduk: {
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
        stok: {
            total: { type: Number, required: true, default: 0 },
            status: { type: String, required: true },
        },
    },
    {
        collection: "produk",
    }
);

schemaProduk.index({ nama: "text" });
const Produk = mongoose.model("Produk", schemaProduk);
export default Produk;
