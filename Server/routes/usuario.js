const express = require('express');
const Usuario = require('../modelos/usuario');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const { verToken, verRole } = require('../middlewares/autenticacion');


const app = express();

app.get('/usuario', verToken, (req, res) => {

    return res.json({
        name: req.usuario.name,
        email: req.usuario.email,
        id: req.usuario._id
    })

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 3;
    limite = Number(limite);

    Usuario.find({ status: true })
        .skip(desde)
        .limit(limite)
        .exec((err, listado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.countDocuments({ status: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    listado,
                    conteo
                });

            })

        });

});

app.post('/usuario', [verToken, verRole], function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        name: body.name,
        email: body.email,
        passwd: bcrypt.hashSync(body.passwd, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
});

app.put('/usuario/:id', [verToken, verRole], function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role']);

    Usuario.findByIdAndUpdate(id, body, { new: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });


});

app.delete('/usuario/:id', [verToken, verRole], function(req, res) {

    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, { "status": false }, (err, borrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!borrado || borrado.status === false) {
            return res.json({
                ok: false,
                err: {
                    message: "Usuario no encontrado."
                }
            })
        }

        res.json({
            ok: true,
            usuario: borrado
        });
    });

    // Usuario.findByIdAndRemove(id, (err, borrado) => {

    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }

    //     if (!borrado) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: "Usuario no encontrado."
    //             }
    //         });
    //     }

    //     res.json({
    //         ok: true,
    //         usuario: borrado
    //     });
    // })

});

module.exports = app;