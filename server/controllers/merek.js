import Merek from "../models/merek.js";

export const getMerek = async (req, res) => {
    try {
        const merek = await Merek.find();
        res.status(200).json(merek);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const postMerek = async (req, res) => {
    const merek = req.body;
    const merekBaru = new Merek(merek);

    try {
        await merekBaru.save();
        res.status(201).json(merekBaru);
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }
};
