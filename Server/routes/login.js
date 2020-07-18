const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../modelos/usuario');

const app = express();


app.post('/login', (req, res) => {


    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "(email) y/o password incorrecto"
                }
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.passwd)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "email y/o (password) incorrecto"
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.TOKEN_SEED, { expiresIn: process.env.TOKEN_EXP });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });


    })

})






module.exports = app;