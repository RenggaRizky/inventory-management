import jwt from "jsonwebtoken";

const secret = "test";

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, secret);
            req.userId = decodedData?.id;
            req.userRole = decodedData?.peran;
        } else {
            res.status(401).json({
                message: "Unauthorized",
            });
        }

        next();
    } catch (error) {
        console.log(error);
    }
};
