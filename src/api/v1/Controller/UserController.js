const {genSaltSync, hashSync} = require('bcrypt');
const { getAll, create, deleteOne } = require('./../Model/User');

module.exports = {
    createUser: (req, res)=>{
        data = req.body;
        if(data.name != undefined && data.username != undefined && data.email != undefined && data.password !=undefined){
            const salt = genSaltSync(10);
            data.password = hashSync(data.password, salt);

            create(data, (err, results)=>{
                if (err) {
                    return res.status(500).json({
                        error: {
                            success: false,
                            message: "Database connection error"
                        }
                    });
                }else if (results.affectedRows===0) {
                    res.status(500).json({
                        results: {
                            success: false,
                            message: "Add user failed",
                        }
                    });
                }
                return res.status(201).json({
                    results: {
                        success: true,
                        data: data,
                    }
                })
            });
        } else{
            return res.status(500).json({
                error: {
                    success: false,
                    message: "All the fields are required",
                }
            });
        }
    },

    allUsers: (req, res)=> {
        getAll((err, results)=>{
            if (err) {
                return res.status(500).json({
                    error: {
                        success: false,
                        message: "Database connection error"
                    }
                });
            }else if(!results){
                return res.status(200).json({
                    results: {
                        success: true,
                        message: "Not user found"
                    }
                });
            }
            return res.status(200).json({
                results: {
                    success: true,
                    data: results
                }
            });
        });
    },
    deleteUser: (req, res)=>{
        const id = req.params.id;
        if (id !=undefined) {
            // call user Model => deleteOne
            deleteOne(id, (err, results)=>{
                if (err) {
                    return res.status(500).json({
                        error: {
                            success: false,
                            message: "Database connection error",
                        }
                    });
                }
                else if (results.fieldCount === 0) {
                    return res.status(200).json({
                        results: {
                            success: false,
                            message: "User that you want to delete doesn't exist"
                        }
                    });
                }
                else if(results.affectedRows === 0){
                    return res.status(500).json({
                        error: {
                            success: false,
                            message: "Delete user failed"
                        }
                    });
                } 
                return res.status(200).json({
                    error: {
                        success: false,
                        message: "Delete user successfully"
                    }
                });
            });

        }else {
            return res.status(500).json({
                error:{
                    success: false,
                    message: "Id is required",
                }
            });
        }
    },
    updateUser: (req, res) => {
        const data = req.body;
        updateOne(data, (err, results)=>{
            const salt = genSaltSync(10);
            data.password = hashSync(data.password, salt);
            if (err) {
                return res.status(500).json({
                    error:{
                        success: false,
                        message: "Database connection error",
                    }
                });
            }
            return res.status(200).json({
                results:{
                    success: true,
                    message: data,
                }
            });
        });
    }


}





