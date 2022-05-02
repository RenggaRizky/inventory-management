import mongoose from "mongoose";

const { Schema } = mongoose;

const schemaProduk = new Schema({
    _id: Schema.Types.ObjectId,
    jenis: {
        type: Schema.Types.ObjectId,
        ref: "JenisBarang",
    },
    volume: mongoose.Types.Decimal128,
    harga: {
        hargaSatuan: Number,
        hargaPerLusin: Number,
    },
    jumlahStok: Number,
});

const Produk = mongoose.model("Produk", schemaProduk);
export default Produk;
