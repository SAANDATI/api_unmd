const mysql = require('mysql');

let connexion = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
});

connexion.connect((err)=>{
    if (err){
        throw err;
    }  
        
    console.log('Database connected');
});

module.exports = connexion;

