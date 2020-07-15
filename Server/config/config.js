/*======================
=========PUERTO=========
======================*/

process.env.PORT = process.env.PORT || 3000;

/*======================
=========Entorno========
======================*/

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/*======================
===========DB===========
======================*/

let urlDB;

if (process.env.NODE_ENV === 'dev')
    urlDB = 'mongodb://localhost:27017/cafe';
else
    urlDB = 'mongodb+srv://alima:MongoDB31.@cafedb-udemy.rf46u.mongodb.net/cafe.usuarios?retryWrites=true&w=majority';

process.env.URLDB = urlDB;