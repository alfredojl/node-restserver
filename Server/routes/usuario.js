const express = require('express');



const app = express();

app.get('/usuario', function(req, res) {
    res.json('get Usuario')
});

app.post('/usuario', function(req, res) {

    let body = req.body;

    if (body.name === undefined)
        res.status(400).json({
            ok: false,
            mensaje: "Nombre requerido."
        })
    else
        res.json({
            body
        })
});

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;

    res.json({
        id
    });
});

app.delete('/usuario', function(req, res) {
    res.json('delete Usuario')
});

module.exports = app;