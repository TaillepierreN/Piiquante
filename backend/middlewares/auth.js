//Vérification que l'utilisateur est identifié avant d'autoriser ses requêtes

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'PIIQUANTE_TOKEN_IS_SECRET_SHHH');
        const userId = decodedToken.userId;
        req.auth = userId;
        if (req.body.userId && req.body.userId !== userId) {
            res.status(403).json({
                message: '403: unauthorized request'
            })
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            message: 'invalid request'
        });
    }
};