const jwt = require('jsonwebtoken');

/*===================
Verificar Token
===================*/
let verToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.usuario = decoded.usuario;

        next();
    })

}

module.exports = {
    verToken
}