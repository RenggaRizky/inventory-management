import mongoose from "mongoose";

const { Schema } = mongoose;

const schemaProduk = new Schema(
    {
        nama: {
            type: "String",
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
        harga: {
            hargaSatuan: {
                type: Number,
                required: true,
            },
            hargaPerLusin: {
                type: Number,
                required: true,
            },
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
        volume: {
            type: mongoose.Types.Decimal128,
            required: true,
        },
    },
    {
        collection: "produk",
    }
);

const Produk = mongoose.model("Produk", schemaProduk);
export default Produk;
