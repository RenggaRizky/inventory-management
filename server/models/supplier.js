import mongoose from "mongoose";

const { Schema } = mongoose;

const schemaSupplier = new Schema(
    {
        // _id: mongoose.Types.ObjectId(),
        nama: {
            type: String,
            required: true,
        },
        namaPerusahaan: {
            type: String,
            required: true,
        },
        alamat: {
            type: String,
            required: true,
        },
        noHandphone: {
            type: String,
            required: true,
        },
    },
    {
        collection: "supplier",
    }
);

schemaSupplier.index({ nama: "text" });
const Supplier = mongoose.model("Supplier", schemaSupplier);
export default Supplier;
