import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import routesProduk from "./routes/produk.js";

const app = express();

app.use("/produk", routesProduk);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL = "mongodb+srv://alyjayaciomas:alyjaya40@cluster0.lecwu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

main()
    .then(() => app.listen(PORT, () => console.log(`server running on port: ${PORT}`)))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect(CONNECTION_URL);
}
