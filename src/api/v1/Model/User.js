const connexion = require('./../../../../Config/db');

module.exports = {
    create: (data, callback) =>{
        let sql = `INSERT INTO users(name, username, email, password)
                    VALUES(?,?,?,?)`;
        connexion.query(sql,
            [
                data.name,
                data.username,
                data.email,
                data.password,
            ],
            (err, results, fields)=>{
                if (err) 
                    return callback(err);
                    return callback(null, results);
                
            });
    },

    getAll: (callback) =>{
        let sql = `SELECT * FROM users`;
        connexion.query(sql, [], (err, results, fields)=>{
            if (err) return callback(err);
            return callback(null, results);
        });
    },
    deleteOne: (id, callback)=>{
        let sql = `DELETE FROM users WHERE id=?`;
        connexion.query(sql, [id], (err, results, fields)=>{
            if(err) return callback(err);
            return callback(null, results);
        });
    },
    updateOne: (data, callback) =>{
        let sql = `UPDATE users SET (name=?, username=?, email=?, password=?)`;
        connexion.query(sql, 
            [
                data.name,
                data.username,
                data.email,
                data.password,
                data.id,
            ], (err, results, fields)=>{
                if(err) return callback(err);
                return callback(null, results);
            });
    }
}




