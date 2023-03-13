import mongoose from "mongoose";
import Produk from "../models/produk.js";
import Rak from "../models/rak.js";

export const getRak = async (req, res) => {
    try {
        const dataRak = await Rak.find().sort({ nama: 1 });
        res.status(202).json(dataRak);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const getInfoRak = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const idRak = await Rak.findById(_id);
        res.status(200).json(idRak);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const postRak = async (req, res) => {
    const rak = req.body;
    const rakBaru = new Rak(rak);

    try {
        await rakBaru.save();
        const dataRak = await Rak.find();
        res.status(201).json(dataRak);
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const patchRak = async (req, res) => {
    const { id: _id } = req.params;
    const { nama, lokasi } = req.body;

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            const memperbaruiRak = await Rak.findOneAndUpdate(
                {
                    _id: mongoose.Types.ObjectId(_id),
                },
                {
                    $set: {
                        nama: nama,
                        lokasi: lokasi,
                    },
                }
            );

            const rakDiperbarui = await Rak.findById(_id);
            res.status(200).json(rakDiperbarui);
        }
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const patchKapasitasTerpakai = async (req, res) => {
    const { id: _id } = req.params;
    const { terpakai } = req.body;

    try {
        const memperbaruiRak = await Rak.findOneAndUpdate(
            {
                "susun._id": mongoose.Types.ObjectId(_id),
            },
            {
                $set: {
                    "susun.$.terpakai": terpakai,
                },
            }
        );
        res.status(200).json(memperbaruiRak);
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const deleteRak = async (req, res) => {
    const { id: _id } = req.params;

    // INFO RAK
    let getIdSusun = await Rak.find({ _id: _id }, { susun: 1, _id: 0 });
    let idSusun1 = getIdSusun[0].susun[0]._id;
    let idSusun2 = getIdSusun[0].susun[1]._id;
    let idSusun3 = getIdSusun[0].susun[2]._id;
    let idSusun4 = getIdSusun[0].susun[3]._id;

    // INFO PRODUK
    let findIdSusun1 = await Produk.find({ id_rak: idSusun1 }, { id_rak: 1, _id: 0 });
    let findIdSusun2 = await Produk.find({ id_rak: idSusun2 }, { id_rak: 1, _id: 0 });
    let findIdSusun3 = await Produk.find({ id_rak: idSusun3 }, { id_rak: 1, _id: 0 });
    let findIdSusun4 = await Produk.find({ id_rak: idSusun4 }, { id_rak: 1, _id: 0 });

    try {
        if (mongoose.Types.ObjectId.isValid(_id)) {
            if (findIdSusun1.length !== 0 || findIdSusun2.length !== 0 || findIdSusun3.length !== 0 || findIdSusun4.length !== 0) {
                throw new Error("Tidak bisa menghapus");
            } else {
                await Rak.findByIdAndRemove(_id);
                const dataRak = await Rak.find();
                res.status(200).json({
                    item: dataRak,
                    message: "Berhasil menghapus",
                });
            }
        } else {
            res.status(404).send("ID tidak ditemukan");
        }
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};

export const postFilterRak = async (req, res) => {
    const { text } = req.body;

    try {
        let rak;

        rak = await Rak.find({ $text: { $search: text } }).sort({ nama: 1 });

        if (!rak.length > 0) {
            rak = await Rak.find().sort({ nama: 1 });
        }
        res.status(200).json(rak);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};
