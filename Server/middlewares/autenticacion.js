const jwt = require('jsonwebtoken');

/*=============================================
                Verificar Token
=============================================*/

let verToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;

        next();
    })

}

/*=============================================
        Verificación de rol de usuario.
=============================================*/

let verRole = (req, res, next) => {
    let role = req.usuario.role;

    if (role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'No tiene los permisos necesarios.'
            }
        })
    }
}

module.exports = {
    verToken,
    verRole
}