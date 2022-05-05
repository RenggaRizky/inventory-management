import JenisBarang from "../models/jenisBarang.js";
import Merek from "../models/merek.js";

export const getJenisBarang = async (req, res) => {
    try {
        const jenisBarang = await JenisBarang.find();
        res.status(200).json(jenisBarang);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const postJenisBarang = async (req, res) => {
    const jenisBarang = req.body;
    const jenisBarangBaru = new JenisBarang(jenisBarang);

    // const merekBarang = new Merek(req.body.merek);

    // jenisBarangBaru.nama = req.body.nama;
    // jenisBarangBaru.merek = merekBarang.id;
    // jenisBarangBaru.ukuran = req.body.ukuran;

    // const jenisBarangBaru = new JenisBarang({jenisBarangBaru.nama, jenisBarangBaru.merek, jenisBarangBaru.ukuran});

    try {
        await jenisBarangBaru.save();
        res.status(201).json(jenisBarangBaru);
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};
