import TempatPenyimpanan from "../models/tempatPenyimpanan.js";

export const getTempatPenyimpanan = async (req, res) => {
    try {
        const dataTempatPenyimpanan = await TempatPenyimpanan.find();
        res.status(202).json(dataTempatPenyimpanan);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const postTempatPenyimpanan = async (req, res) => {
    const tempatPenyimpanan = req.body;
    const tempatPenyimpananBaru = new TempatPenyimpanan(tempatPenyimpanan);

    try {
        await tempatPenyimpananBaru.save();
        const dataTempatPenyimpanan = await TempatPenyimpanan.find();
        res.status(201).json(dataTempatPenyimpanan);
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};
