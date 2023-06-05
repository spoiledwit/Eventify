import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const isCustomAuth = token && token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {      
            decodedData = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }    

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
};

export default verifyToken;
