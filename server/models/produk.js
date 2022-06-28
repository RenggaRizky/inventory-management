import mongoose from "mongoose";

const { Schema } = mongoose;

const schemaProduk = new Schema(
    {
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
        notifikasi: [String],
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
        id_satuanbarang: {
            type: Schema.Types.ObjectId,
            ref: "SatuanBarang",
            required: true,
        },
        id_tempatpenyimpanan: {
            type: Schema.Types.ObjectId,
            ref: "TempatPenyimpanan",
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
        stok: {
            batasMinimum: {
                type: Number,
                required: true,
            },
            total: {
                type: Number,
                required: true,
            },
        },
    },
    {
        collection: "produk",
    }
);

const Produk = mongoose.model("Produk", schemaProduk);
export default Produk;
