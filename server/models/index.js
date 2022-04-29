import mongoose from "mongoose";

const { Schema } = mongoose;

// Collection Merek Barang
const schemaMerekBarang = new Schema({
    _id: Schema.Types.ObjectId,
    nama: String,
});

// Collection Jenis Barang
const schemaJenisBarang = new Schema({
    _id: Schema.Types.ObjectId,
    nama: String,
    merek: [
        {
            type: Schema.Types.ObjectId,
            ref: "MerekBarang",
        },
    ],
    ukuran: [String],
});

// Collection Produk
const schemaProduk = new Schema({
    _id: Schema.Types.ObjectId,
    jenis: [
        {
            type: Schema.Types.ObjectId,
            ref: "JenisBarang",
        },
    ],
    volume: mongoose.Types.Decimal128,
    harga: {
        hargaSatuan: Number,
        hargaPerLusin: Number,
    },
    jumlahStok: Number,
});

const MerekBarang = mongoose.model("MerekBarang", schemaMerekBarang);
const JenisBarang = mongoose.model("JenisBarang", schemaJenisBarang);
const Produk = mongoose.model("Produk", schemaProduk);

// prettier-ignore
export { 
    MerekBarang, 
    JenisBarang, 
    Produk 
};
