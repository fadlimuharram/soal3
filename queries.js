const {db} = require('./koneksi');

var $getallMahasiswa = (request,response)=>{
    db.any('SELECT * FROM mahasiswa').then((data)=>{
        response.status(200).json({
            status:'success',
            data:data,
            message:'retrived all mahasiswa'
        });
    });
}

var $createMahasiswa = (request,response,next)=>{
    
    db.none('INSERT INTO mahasiswa(nama,npm,email) VALUES(${nama},${npm},${email})',request.body).then(()=>{
        response.status(200).json({
            status:'success',
            message:'inserted mahasiswa'
        });
    }).catch((err)=>{
        return next(err);
    })
}

var $editMahasiswa = (request,response,next)=>{
    db.none('UPDATE mahasiswa SET nama=$1, npm=$2, email=$3 WHERE id=$4',
        [request.body.nama, request.body.npm, request.body.email, request.body.id]
    ).then(()=>{
        response.status(200).json({
            status:'success',
            message:'updated mahasiswa'
        });
    }).catch((err)=>{
        return next(err);
    })
}

var $deleteMahasiswa = (request,response,next)=>{
    var id = parseInt(request.params.id);
    db.result('DELETE FROM mahasiswa WHERE id=$1',id).then((result)=>{
        response.status(200).json({
            status:'success',
            message:`Removed ${result.rowCount} Mahasiswa`
        });
    }).catch((err)=>{
        return next(err);
    })
}


module.exports = {
    getallMahasiswa:$getallMahasiswa,
    createMahasiswa:$createMahasiswa,
    editMahasiswa:$editMahasiswa,
    deleteMahasiswa:$deleteMahasiswa
}