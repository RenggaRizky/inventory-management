import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import routesProduk from "./routes/produk.js";
import routesMerek from "./routes/merek.js";
import routesJenisBarang from "./routes/jenisBarang.js";
import routesSupplier from "./routes/supplier.js";
import routesRak from "./routes/rak.js";
import routesBarangRetur from "./routes/barangRetur.js";
import routesStokBarang from "./routes/stok.js";
import routesPembelian from "./routes/pembelian.js";
import routesPenjualan from "./routes/penjualan.js";
import routesBarangMasuk from "./routes/barangMasuk.js";
import routesBarangKeluar from "./routes/barangKeluar.js";
import routesUser from "./routes/user.js";
import routesNotifikasi from "./routes/notifikasi.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/produk", routesProduk);
app.use("/merek", routesMerek);
app.use("/jenis-barang", routesJenisBarang);
app.use("/supplier", routesSupplier);
app.use("/stok-barang", routesStokBarang);
app.use("/rak", routesRak);
app.use("/barang-retur", routesBarangRetur);
app.use("/penjualan", routesPenjualan);
app.use("/pembelian", routesPembelian);
app.use("/barang-masuk", routesBarangMasuk);
app.use("/barang-keluar", routesBarangKeluar);
app.use("/user", routesUser);
app.use("/notifikasi", routesNotifikasi);

app.get("/", (req, res) => {
    res.send("Hallo");
});

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

main()
    .then(() => app.listen(PORT, () => console.log(`server running on port: ${PORT}`)))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect(CONNECTION_URL);
}
