const {db} = require('./koneksi');

var getallServices = (request,response)=>{
    db.query('SELECT * FROM jeniskendaraan ORDER BY berat::int ASC',(err,res)=>{
        
        if (err) {
            console.log(err.stack)
        } else {
            response.status(200).json({
                status:'success',
                data:res.rows,
                code: 1
            });
        }
    });
}

module.exports = {
    getallServices
}