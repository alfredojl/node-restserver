/*======================
=========PUERTO=========
======================*/

process.env.PORT = process.env.PORT || 3000;

/*======================
=========Entorno========
======================*/

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


/*======================
==Expiración de token===
======================*/
// 60 segundos * 60 minutos etc.
process.env.TOKEN_EXP = 60 * 60 * 24 * 30;

/*======================
=====SEED del token=====
======================*/
process.env.TOKEN_SEED = process.env.TOKEN_SEED || 'development_seed';


/*======================
===========DB===========
======================*/

let urlDB;

if (process.env.NODE_ENV === 'dev')
    urlDB = 'mongodb://localhost:27017/cafe';
else
    urlDB = process.env.MONGO_URI;

process.env.URLDB = urlDB;