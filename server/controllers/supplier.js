import Supplier from "../models/supplier.js";
import Produk from "../models/produk.js";
import mongoose from "mongoose";

export const getSupplier = async (req, res) => {
    try {
        const dataSupplier = await Supplier.find();
        res.status(200).json(dataSupplier);
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
        const dataSupplier = await Supplier.find();
        res.status(201).json(dataSupplier);
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const patchSupplier = async (req, res) => {
    const { id: _id } = req.params;
    const supplier = req.body;

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            const supplierDiperbarui = await Supplier.findByIdAndUpdate(_id, supplier, { new: true });
            res.status(200).json(supplierDiperbarui);
        } else {
            res.status(404).send("ID tidak ditemukan");
        }
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const deleteSupplier = async (req, res) => {
    const { id: _id } = req.params;

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            await Supplier.findByIdAndRemove(_id);
            const dataSupplier = await Supplier.find();
            res.status(200).json(dataSupplier);
        } else {
            res.status(404).send("ID tidak ditemukan");
        }
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};
