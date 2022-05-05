import Supplier from "../models/supplier.js";
import Produk from "../models/produk.js";

export const getSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.find();
        res.status(200).json(supplier);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const postSupplier = async (req, res) => {
    const supplier = req.body;
    const supplierBaru = new Supplier(supplier);

    try {
        await supplierBaru.save();
        res.status(201).json(supplierBaru);
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};
