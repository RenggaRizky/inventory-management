import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import routesProduk from "./routes/produk.js";
import routesMerek from "./routes/merek.js";
import routesJenisBarang from "./routes/jenisBarang.js";
import routesSupplier from "./routes/supplier.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/produk", routesProduk);
app.use("/merek", routesMerek);
app.use("/jenis-barang", routesJenisBarang);
app.use("/supplier", routesSupplier);

const CONNECTION_URL = "mongodb+srv://alyjayaciomas:alyjaya40@cluster0.lecwu.mongodb.net/manajemenInventoryDB?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

main()
    .then(() => app.listen(PORT, () => console.log(`server running on port: ${PORT}`)))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect(CONNECTION_URL);
}
