const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    try {
        const authHeader = req.header('authorization');
        if (!authHeader) {
            throw new Error('Authorization header missing');
        }

        const token = authHeader.replace('Bearer ', '');
        const decodedToken = jwt.verify(token, process.env.jwt_secret);
        req.body.userId = decodedToken.userId;
        next();
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: error.message
        });
    }
};
