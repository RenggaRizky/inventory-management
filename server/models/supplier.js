import mongoose from "mongoose";

const { Schema } = mongoose;

const schemaSupplier = new Schema(
    {
        nama: {
            type: String,
            required: true,
        },
        alamat: {
            type: String,
            required: true,
        },
        kontak: {
            type: String,
            required: true,
        },
    },
    {
        collection: "supplier",
    }
);

const Supplier = mongoose.model("Supplier", schemaSupplier);
export default Supplier;
