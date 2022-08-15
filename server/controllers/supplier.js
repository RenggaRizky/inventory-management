import Supplier from "../models/supplier.js";
import Produk from "../models/produk.js";
import mongoose from "mongoose";
import Pembelian from "../models/pembelian.js";
import BarangRetur from "../models/barangRetur.js";

export const getSupplier = async (req, res) => {
    try {
        const dataSupplier = await Supplier.find().sort({ nama: 1 });
        res.status(200).json(dataSupplier);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const getInfoSupplier = async (req, res) => {
    const { id: _id } = req.params;

    try {
        const idSupplier = await Supplier.findById(_id);
        res.status(200).json(idSupplier);
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

    // INFO PEMBELIAN
    let findPembelian = await Pembelian.find({ id_supplier: _id }, { id_supplier: 1, _id: 0 });

    // INFO BARANG RETUR
    let findBarangRetur = await BarangRetur.find({ id_supplier: _id }, { id_supplier: 1, _id: 0 });

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            if (findPembelian.length !== 0 || findBarangRetur.length !== 0) {
                throw new Error("Tidak bisa menghapus");
            } else {
                await Supplier.findByIdAndRemove(_id);
                const dataSupplier = await Supplier.find().sort({ nama: 1 });
                res.status(200).json({
                    item: dataSupplier,
                    message: "Berhasil menghapus",
                });
            }
        } else {
            res.status(404).send("ID tidak ditemukan");
        }
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const postFilterSupplier = async (req, res) => {
    const { text } = req.body;

    try {
        let supplier;

        supplier = await Supplier.find({ $text: { $search: text } }).sort({ nama: 1 });

        if (!supplier.length > 0) {
            supplier = await Supplier.find().sort({ nama: 1 });
        }
        res.status(200).json(supplier);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};
