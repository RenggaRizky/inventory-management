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
                default: 0,
            },
            status: {
                type: String,
                default: function () {
                    if (this.stok.total <= 0 || this.stok.total === 0) {
                        return "Habis";
                    } else if (this.stok.total >= this.stok.batasMinimum) {
                        return "Tersedia";
                    } else {
                        return "Hampir habis";
                    }
                },
            },
        },
    },
    {
        collection: "produk",
    }
);

const Produk = mongoose.model("Produk", schemaProduk);
export default Produk;
